<template>
  <div class="flex flex-col gap-4 p-4 relative background max-w-2xl mx-auto w-full">
    <div
      v-for="message in messagingState.messages"
      :key="message.$id"
      class="flex items-start gap-3"
      :class="{
        'justify-end ': isMyMessage(message.senderId),
        'justify-start': isMyMessage(message.senderId),
      }"
      :id="message.$id"
    >
      <button
        class="max-w-xs p-3 pr-2 rounded-lg text-sm relative z-0 bg-bg-light"
        :class="`${isSmallMessage(message.text) ? '' : 'pb-5'} ${message.status === 'failed' ? ' text-danger' : 'text-text '}
        ${isMyMessage(message.senderId) ? 'bg-attached-gradient' : ''}
        `"
        @click="inDevelopment"
      >
        <span class="mr-3">
          {{ message.text }}
        </span>

        <!-- Timestamp -->
        <span
          class="mt-1 whitespace-nowrap relative z-10"
          :class="isSmallMessage(message.text) ? '-bottom-2' : 'absolute -bottom-3 right-0'"
        >
          <span class="text-xs text-text mr-1">
            {{ dayjs(message.timestamp).format("hh:mm") }}
          </span>
          <contacts-message-state-icon
            v-if="isMyMessage(message.senderId)"
            :state="message.status"
            class="font-bold text-sm inline-block -mb-[2px]"
          />
        </span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useGlobalSettingStore } from "~/store/globalSetting";
import type { MessageType } from "~/types/type";

const state = useGlobalSettingStore();
const messagingState = useMessagingStore();
const isSmallMessage = (text: string) => {
  return text.length <= 8;
};

const isMyMessage = (senderId: string) => {
  // return Math.random() > 0.5 ? "user" : "";
  if (state.user?.$id === senderId) return true;
};
import { ref } from "vue";
import dayjs from "dayjs";
import { useMessagingStore } from "~/store/messaging";

// const messages = ref<MessageType[]>([]);

const route = useRoute();
const router = useRouter();
onMounted(() => {
  if ("serviceWorker" in navigator) {
    console.log("Message updater event listener was added");
    navigator.serviceWorker.addEventListener("message", (event) => {
      if (event.data?.type === "MESSAGE_UPDATE") {
        console.log("🧠 Message update received from SW");
        getMessages(); // 🔁 your fetch logic
        messagingState.scrollToBottom(true);
      }
    });
  }
});

async function getMessages() {
  try {
    const res = await fetch(`/api/get-messages?contactUsername=${route.params.username}&messageLimit=400`, { cache: "reload" });
    const fetchedMessages = (await res.json()).messages as MessageType[];
    messagingState.messages = [...fetchedMessages];

    messagingState.setUnreadMessages({
      number: messagingState.messages
        .filter((message) => {
          return !isMyMessage(message.senderId);
        })
        .reduce((t, c) => {
          return t + 1;
        }, 0),
      isThere: true,
    });
  } catch (error) {
    console.error(error);

    router.replace("/contacts/no");
  }
}
getMessages();

// ^ scroll down if new message was received when User was at the bottom
watch(
  () => messagingState.unreadMessages.isThere,
  (newIsThere) => {
    if (newIsThere) {
      if (messagingState.isUserAtBottom) {
        nextTick(() => {
          messagingState.scrollToBottom(true);
          markContactsMessagesAsRead();
        });
        console.log("It is sending the ");
      }
    }
  }
);

watch(
  () => messagingState.isUserAtBottom,
  () => {
    markContactsMessagesAsRead();
  }
);
async function markContactsMessagesAsRead() {
  if (messagingState.isUserAtBottom) {
    if (messagingState.unreadMessages.isThere) {
      await postMsgDocStatusAsRead();
      messagingState.setUnreadMessages({
        isThere: false,
        number: 0,
      });
    }
  }
}

async function postMsgDocStatusAsRead() {
  const contactUsername = route.params.username as string;

  try {
    const res = await fetch("/api/mark-messages-as-read", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contactUserName: contactUsername, unreadMessagesNumber: messagingState.unreadMessages.number }),
    });
    const data = await res.json();
    // return data;
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}
</script>

<style>
.bg-attached-gradient {
  background: var(--message-bubble);
  background-attachment: fixed;
}
</style>
