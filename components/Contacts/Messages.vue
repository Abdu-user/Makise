<template>
  <div
    ref="messagesContainerRef"
    class="flex-1 justify-end relative background w-full max-h-[100%] overflow-y-auto"
    style="scrollbar-width: thin; scrollbar-color: #83a8ff transparent; scrollbar-track-color: #000"
  >
    <div class="flex flex-col gap-4 p-4 justify-end min-h-full">
      <div
        v-for="message in messagingState.messages"
        :key="message.$id"
        :id="message.$id"
        class="flex gap-3"
        :class="{
          'justify-end': isMyMessage(message.senderId),
          'justify-start': !isMyMessage(message.senderId),
        }"
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

import { useGlobalSettingStore } from "~/store/globalSetting";
import { useMessagingStore } from "~/store/messaging";
import type { MessageType } from "~/types/type";

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
    const res = await fetch(`/api/get-messages?contactUsername=${route.params.username}&messageLimit=400`, {
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

// Mark messages as read
async function postMsgDocStatusAsRead() {
  if (!messagingState.unreadMessages.number) return;

  try {
    const res = await fetch("/api/mark-messages-as-read", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contactUserName: route.params.username,
        unreadMessagesNumber: messagingState.unreadMessages.number,
      }),
    });

    const data = await res.json();
    console.log("Marked as read:", data);
  } catch (error) {
    console.error(error);
  }
}

async function markContactsMessagesAsRead() {
  if (!messagingState.isUserAtBottom || !messagingState.unreadMessages.isThere) return;

  await nextTick();
  await postMsgDocStatusAsRead();
  messagingState.setUnreadMessages({ isThere: false, number: 0 });
}

// Event Handlers
function handleFocus() {
  console.log("🟢 Window focused — refetching messages");
  getMessages();
}

function handleServiceWorkerMessage(event: MessageEvent) {
  if (event.data?.type === "MESSAGE_UPDATE") {
    console.log("🧠 SW -> MESSAGE_UPDATE received");
    getMessages().then(() => {
      if (typeof messagingState.scrollDownFunction === "function")
        //@ts-ignore
        messagingState.scrollDownFunction(false);
    });
  }
}

// Lifecycle
onMounted(() => {
  // Initial fetch
  getMessages();

  // Refetch on window focus
  window.addEventListener("focus", handleFocus);

  // Setup SW listener
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.addEventListener("message", handleServiceWorkerMessage);
    console.log("✅ SW message listener added");
  }
});

onBeforeUnmount(() => {
  window.removeEventListener("focus", handleFocus);
  navigator.serviceWorker.removeEventListener("message", handleServiceWorkerMessage);
});

// Watchers
watch(
  () => messagingState.unreadMessages.isThere,
  (isThere) => {
    if (isThere && messagingState.isUserAtBottom) {
      nextTick(() => {
        messagingState.scrollToBottom(true);
        markContactsMessagesAsRead();
      });
    }
  }
);

watch(
  () => messagingState.isUserAtBottom,
  (atBottom) => {
    if (atBottom && messagingState.unreadMessages.isThere) {
      nextTick(() => {
        markContactsMessagesAsRead();
      });
    }
  }
);

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
    { immediate: true } // ✅ trigger immediately in case messages are already there
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
