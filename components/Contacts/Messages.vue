<template>
  <div class="flex flex-col gap-4 p-4">
    <div
      v-for="message in messages"
      :key="message.id"
      class="flex items-start gap-3"
      :class="{
        'justify-end': isSender(message.senderId) === 'user',
        'justify-start': isSender(message.senderId) !== 'user',
      }"
    >
      <button
        class="max-w-xs p-3 rounded-lg text-sm relative z-0"
        :class="` bg-bg-light
        ${isSmallMessage(message.text) ? '' : 'pb-5'}
        `"
      >
        <span class="mr-2">
          {{ message.text }}
        </span>
        <span
          class="text-xs text-text-muted mt-1 whitespace-nowrap"
          :class="isSmallMessage(message.text) ? 'relative -bottom-1' : 'absolute bottom-1 right-2'"
          >{{ getSmartTime(message.timestamp) }}</span
        >
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useGlobalSettingStore } from "~/store/globalSetting";
import type { MessageType } from "~/types/type";

const state = useGlobalSettingStore();
const isSmallMessage = (text: string) => {
  return text.length <= 8;
};

// const userId = useCookie("userId"); // Cookie name

const isSender = (senderId: string) => {
  if (state.user?.$id === senderId) return "user";
};

const messages = ref<MessageType[]>([]);

const route = useRoute();

async function getMessages() {
  try {
    const res = await fetch(`/api/get-messages?contactUsername=${route.params.username}&messageLimit=50`, { cache: "reload" });
    const fetchedMessages = (await res.json()).messages as MessageType[];
    messages.value = fetchedMessages;
    // console.log(messages.value);
    // console.log(userId.value);
  } catch (error) {
    console.error(error);
  }
}
getMessages();
</script>

<style scoped></style>
