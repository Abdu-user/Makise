<template>
  <div
    class="sticky bottom-16 left-0 flex justify-center"
    aria-label="scroll down"
    v-if="!messagingState.isUserAtBottom"
  >
    <CustomButton
      :icon="true"
      name="tabler:arrow-down"
      :variant="'text'"
      class="w-10 h-10 !bg-bg"
      :rounded="true"
      @click="(messagingState.scrollToBottom(true), console.log('clicked', messagingState))"
    />
    <div
      aria-label="new messages"
      class="absolute -top-4 rounded-full bg-attached-gradient w-5 h-5 text-border flex place-items-center justify-center"
      style="background-attachment: fixed"
    >
      {{ messagingState.unreadMessages.number }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMessagingStore } from "~/store/messaging";

const messagingState = useMessagingStore();
</script>

<style scoped></style>
