<template>
  <p
    ref="paragraphRef"
    :class="paragraphClass"
  >
    <slot></slot>
  </p>
</template>

<script setup lang="ts">
import { useGlobalSettingStore } from "~/store/globalSetting";
const state = useGlobalSettingStore();
const variants = {
  default: `${state.newColors ? "text-text-muted" : "text-T3TextColor dark:text-darkT3TextColor"}  my-4 mx-6`,
  noMargin: `
${state.newColors ? "text-text-muted" : "text-T3TextColor dark:text-darkT3TextColor"}
  `,
  edit: `${state.newColors ? "text-text-muted" : "text-T3TextColor dark:text-darkT3TextColor "}font-semibold text-xl`,
  editSecondary: "text-text-muted font-semibold text-sm",
};
const props = defineProps({
  variant: { type: String as PropType<keyof typeof variants>, default: "default" },
});

const paragraphClass = computed(() => {
  return [variants[props.variant]].join(" ");
});

const paragraphRef = ref<HTMLParagraphElement | null>(null);

defineExpose({
  paragraphRef,
});
</script>

<style scoped></style>
