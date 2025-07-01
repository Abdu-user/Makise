<template>
  <CustomTransitions :variant="'drop-down'">
    <div
      v-if="globalState.feedback.exists"
      class="fixed top-20 left-0 right-0 z-50"
    >
      <div
        class="p-4 w-fit mx-auto rounded-lg border border-1 border-gray-500/30"
        :class="`${state[globalState.feedback.state as keyof typeof state]}
        ${globalState.newColors ? 'text-text' : 'text-T1TextColor dark:text-darkT1TextColor'}`"
      >
        {{ globalState.feedback.message }}
      </div>
    </div>
  </CustomTransitions>
</template>
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { useGlobalSettingStore } from "~/store/globalSetting";
const globalState = useGlobalSettingStore();
const state = {
  success: ` bg-success `,
  error: `bg-danger `,
};
const timerId = ref<NodeJS.Timeout | null>(null);
watch(
  () => globalState.feedback,
  (newValue) => {
    if (timerId.value && newValue.message === globalState.feedback.message) {
      clearTimeout(timerId.value);
    }
    if (newValue) {
      timerId.value = setTimeout(() => {
        globalState.setFeedback("idle", "");
      }, globalState.feedback.duration || 6000);
    }
  },
  { deep: true }
);
</script>
