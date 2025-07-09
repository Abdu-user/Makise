<template>
  <div
    class="flex gap-3"
    :class="{
      'justify-end': isMyMessage,
      'justify-start': !isMyMessage,
    }"
  >
    <button
      class="max-w-[75%] m p-3 pr-2 rounded-lg text-sm relative z-0"
      :class="[
        isSmallMessage(message.text) ? '' : 'pb-5',
        isMyMessage ? 'bg-attached-gradient text-text' : 'bg-bg-light text-text',
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
          v-if="isMyMessage"
          :state="message.status"
          class="font-bold inline-block -mb-[2px]"
        />
      </span>
    </button>
  </div>
</template>

<script setup lang="ts">
import dayjs from "dayjs";
import type { PropType } from "vue";
import type { MessageType } from "~/types/type";

const isSmallMessage = (text: string) => text.length <= 8;
defineProps({ message: { type: {} as PropType<MessageType>, required: true }, isMyMessage: { type: Boolean, Required: true } });
</script>

<style scoped></style>
