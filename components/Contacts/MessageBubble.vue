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
        isOneLine ? '' : 'pb-5',
        isMyMessage ? 'bg-attached-gradient text-text' : 'bg-bg-light text-text',
        message.status === 'failed' ? 'text-danger' : '',
      ]"
      @click="inDevelopment"
    >
      <span
        class="mr-3 break-all"
        ref="textRef"
      >
        {{ message.text }}
      </span>

      <!-- Timestamp -->
      <span
        class="mt-1 whitespace-nowrap z-10 text-xs text-text"
        :class="isOneLine ? 'relative -bottom-2' : 'absolute bottom-2 right-2'"
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
import { ref, onMounted, watch, nextTick } from "vue";
import dayjs from "dayjs";
import type { PropType } from "vue";
import type { MessageType } from "~/types/type";

const props = defineProps({
  message: { type: Object as PropType<MessageType>, required: true },
  isMyMessage: { type: Boolean, required: true },
});

const textRef = ref<HTMLElement | null>(null);
const isOneLine = ref(true);

const checkIfOneLine = () => {
  if (textRef.value) {
    const el = textRef.value;
    isOneLine.value = el.offsetHeight <= parseFloat(getComputedStyle(el).lineHeight || "0");
  }
};

// Re-check when message changes
watch(
  () => props.message.text,
  async () => {
    await nextTick();
    checkIfOneLine();
  },
  { immediate: true }
);

onMounted(() => {
  checkIfOneLine();
});
</script>

<style scoped></style>
