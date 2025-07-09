<template>
  <div
    ref="messagesContainerRef"
    class="flex-1 justify-end relative background w-full max-h-[100%] overflow-y-auto"
    style="scrollbar-width: thin; scrollbar-color: #83a8ff transparent; scrollbar-track-color: #000"
  >
    <div class="flex flex-col gap-4 p-4 justify-end min-h-full">
      <div
        v-for="(message, i) in messagingState.messages"
        :key="message.$id"
        :id="message.$id"
        class="flex gap-3"
        :class="{
          'justify-end': isMyMessage(message.senderId),
          'justify-start': !isMyMessage(message.senderId),
        }"
        :data-last-message="i === messagingState.messages.length - 1 ? true : undefined"
        :aria-label="`message status:${message.status}`"
        :data-unread="!isMyMessage(message.senderId) && message.status === 'sent' ? true : undefined"
      >
        <button
          class="max-w-[70%] m p-3 pr-2 rounded-lg text-sm relative z-0"
          :class="[
            isSmallMessage(message.text) ? '' : 'pb-5',
            isMyMessage(message.senderId) ? 'bg-attached-gradient text-text' : 'bg-bg-light text-text',
            message.status === 'failed' ? 'text-danger' : '',
          ]"
          @click="inDevelopment"
        >
          <span class="mr-3">
            {{ message.text }}
          </span>

          <!-- Timestamp -->
          <span
            class="mt-1 whitespace-nowrap relative z-10 text-xs text-text"
            :class="isSmallMessage(message.text) ? '-bottom-2' : 'absolute -bottom-3 right-0'"
          >
            {{ dayjs(message.timestamp).format("HH:mm") }}
            <contacts-message-state-icon
              v-if="isMyMessage(message.senderId)"
              :state="message.status"
              class="font-bold inline-block -mb-[2px]"
            />
          </span>
        </button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch, nextTick } from "vue";
import { useRoute, useRouter } from "vue-router";
import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
dayjs.extend(isSameOrBefore);

import { useGlobalSettingStore } from "~/store/globalSetting";
import { useMessagingStore } from "~/store/messaging";
import type { MessageType } from "~/types/type";

import { useRealtimeMessages } from "@/composables/useRealtimeMessaging";
let realtime: ReturnType<typeof useRealtimeMessages> | null = null;

// Stores
const state = useGlobalSettingStore();
const messagingState = useMessagingStore();

// Routing
const route = useRoute();
const router = useRouter();

// Helpers
const isSmallMessage = (text: string) => text.length <= 8;
const isMyMessage = (senderId: string) => state.user?.$id === senderId;

// Fetch messages
async function getMessages() {
  try {
    const res = await fetch(`/api/get-messages?contactUsername=${route.params.username}&messageLimit=40`, {
      cache: "reload",
    });

    const fetchedMessages = (await res.json()).messages as MessageType[];
    messagingState.messages = [...fetchedMessages.reverse()];

    const unread = fetchedMessages.filter((msg) => !isMyMessage(msg.senderId) && msg.status === "sent");

    messagingState.setUnreadMessages({
      number: unread.length,
      isThere: unread.length > 0,
    });
  } catch (error) {
    console.error(error);
    router.replace("/contacts/no");
  }
}

// Lifecycle
onMounted(() => {
  getMessages();
});

async function getChatId() {
  try {
    const res = await fetch("/api/get-contact/" + route.params.username);
    const contact = await res.json();
    return makeChatId(state.user?.$id!, contact.contact.id);
  } catch (error) {
    console.error(error);
    return error;
  }
}

onMounted(async () => {
  const chatId = await getChatId();
  if (typeof chatId === "string" && chatId.length > 39) {
    realtime = useRealtimeMessages(chatId, (newMessage) => {
      const isMeMessageVar = isMyMessage(newMessage.senderId);
      const doesMessageAlreadyExists = messagingState.messages.some((msg) => msg.$id === newMessage.$id);

      if (newMessage.status === "read" && isMeMessageVar) {
        // ^ Mark messages as read

        messagingState.messages = messagingState.messages.map((message) => {
          const isSentStatus = message.status !== "read";
          const isSameOrBefore = dayjs(message.timestamp).isSameOrBefore(newMessage.timestamp);
          if (isSentStatus && isSameOrBefore) {
            return {
              ...message,
              status: newMessage.status,
            };
          }
          return message;
        });
      } else if (!doesMessageAlreadyExists && !isMeMessageVar) {
        // ^ Add a new message in realtime
        messagingState.addNewMessage(newMessage);
        messagingState.unreadMessages.isThere = true;
        messagingState.unreadMessages.number++;
      } else {
        console.log("🟡 Message already exists in state, or it is my message, ignoring", newMessage);
      }

      if (messagingState.isUserAtBottom) {
        nextTick(() => scrollToBottom(true));
      }
    });

    realtime.subscribe();
  } else {
    console.error("No chatId", chatId);
  }
});

onBeforeUnmount(() => {
  if (realtime) realtime.stop();
});

// ~ Watchers
watch(
  () => messagingState.messages,
  () => {
    setupReadObserver();
  }
);
let observer: IntersectionObserver | null = null;

function setupReadObserver() {
  nextTick(() => {
    disconnectPreviousObserver();
    observer = createObserver();

    observeUnreadMessages();
  });
}

function disconnectPreviousObserver() {
  if (observer) observer.disconnect();
}

function createObserver(): IntersectionObserver {
  return new IntersectionObserver(handleIntersections, {
    root: messagesContainerRef.value,
    threshold: 1.0, // Only when fully visible
  });
}

async function handleIntersections(entries: IntersectionObserverEntry[]) {
  const newlyReadIds: string[] = [];

  entries.forEach((entry) => {
    const messageId = entry.target.getAttribute("id");
    const isUnread = entry.target.hasAttribute("data-unread");

    if (entry.isIntersecting && messageId && isUnread) {
      const messageIndex = messagingState.messages.findIndex((msg) => msg.$id === messageId);
      const message = messagingState.messages[messageIndex];

      if (message && message.status === "sent") {
        messagingState.messages[messageIndex].status = "read";
        newlyReadIds.push(messageId);
      }
    }
  });

  if (newlyReadIds.length > 0) {
    updateUnreadState(newlyReadIds.length);
    await markMessagesAsReadOnBackend(newlyReadIds);
  }
}

function updateUnreadState(count: number) {
  messagingState.unreadMessages.number -= count;

  if (messagingState.unreadMessages.number <= 0) {
    messagingState.setUnreadMessages({ number: 0, isThere: false });
  }
}

async function markMessagesAsReadOnBackend(readIds: string[]) {
  try {
    const res = await fetch("/api/mark-messages-as-read", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contactUserName: route.params.username,
        readMessageIds: readIds,
        unreadMessagesNumber: readIds.length,
      }),
    });
    console.log(await res.json());
  } catch (error) {
    console.error("❌ Failed to mark messages as read:", error);
  }
}

function observeUnreadMessages() {
  const unreadElements = document.querySelectorAll("[data-unread]");
  unreadElements.forEach((el) => {
    observer?.observe(el);
  });
}

const messagesContainerRef = ref<HTMLElement | null>(null);

//  ~ Scroll down on mounded

onMounted(() => {
  messagingState.scrollToBottom(scrollToBottom);
  messagesContainerRef.value?.addEventListener("scroll", detectScroll);

  scrollWatch();
});
onBeforeMount(() => {
  messagingState.messages = [];
});
onBeforeUnmount(() => {
  messagesContainerRef.value?.removeEventListener("scroll", detectScroll);
});

function detectScroll(e: Event) {
  const el = messagesContainerRef.value;
  if (!el) return;

  const isAtBottom = el.scrollHeight - el.scrollTop <= el.clientHeight + 65;
  // console.log(el.scrollHeight, el.scrollTop, el.clientHeight, 65);
  messagingState.isUserAtBottom = isAtBottom;
}

function scrollWatch() {
  const stop = watch(
    () => messagingState.messages, // ✅ Track the actual array for proper reactivity
    async (messages) => {
      if (messages.length === 0) return;
      await nextTick();
      scrollToBottom(false);
      stop(); // ✅ stop watching after first scroll
    },
    { immediate: true }
  );
}

function scrollToBottom(smooth = true) {
  const container = messagesContainerRef.value;
  if (container) {
    container.scrollTo({
      top: container.scrollHeight,
      behavior: smooth ? "smooth" : "auto", // 🔁 toggle animation
    });
  }
}
</script>

<style>
.bg-attached-gradient {
  background: var(--message-bubble);
  background-attachment: fixed;
}
</style>
