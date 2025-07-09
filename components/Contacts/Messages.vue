<template>
  <div
    ref="messagesContainerRef"
    class="flex-1 justify-end relative background w-full max-h-[100%] overflow-y-auto"
    style="scrollbar-width: thin; scrollbar-color: #83a8ff transparent; scrollbar-track-color: #000"
  >
    <div class="flex flex-col gap-4 p-4 justify-end min-h-full">
      <ContactsMessageBubble
        v-for="message in messagingState.messages"
        :message="message"
        :is-my-message="isMyMessage(message.senderId)"
        :key="message.$id"
        :aria-label="`message status:${message.status}`"
        :data-unread="!isMyMessage(message.senderId) && message.status === 'sent' ? true : undefined"
        :id="message.$id"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
dayjs.extend(isSameOrBefore);

import { useGlobalSettingStore } from "~/store/globalSetting";
import { useMessagingStore } from "~/store/messaging";
import { ContactsMessageBubble } from "#components";
import { useReadObserver } from "~/composables/(contacts)/useReadObserver";
import { useScrollBehavior } from "~/composables/(contacts)/useScrollBehavior";
import { useGetMessages } from "~/composables/(contacts)/useGetMessages";
import useRealtimeUpdateMessages from "~/composables/(contacts)/useRealtimeUpdateMessages";

// Helpers
const isMyMessage = (senderId: string) => state.user?.$id === senderId;

// Stores
const state = useGlobalSettingStore();
const messagingState = useMessagingStore();

// && GetMessages
const { getMessages } = useGetMessages(isMyMessage);
onMounted(() => {
  getMessages();
});
// && RealTimeDomUpdate
useRealtimeUpdateMessages(isMyMessage);

const messagesContainerRef = ref<HTMLElement | null>(null);
const { setupObserver } = useReadObserver(messagesContainerRef);

watch(
  () => messagingState.messages,
  () => {
    setupObserver();
  }
);

//  ~ Scroll down on mounded
const { setupScrollListeners } = useScrollBehavior(messagesContainerRef);

setupScrollListeners();
</script>

<style>
.bg-attached-gradient {
  background: var(--message-bubble);
  background-attachment: fixed;
}
</style>
