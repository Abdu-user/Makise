<template>
  <section
    :class="computedClass"
    v-if="variant === 'section'"
    ref="sectionRef"
  >
    <slot></slot>
  </section>
  <section
    :class="computedClass"
    v-else-if="variant === 'sectionWithLines'"
    ref="sectionRef"
  >
    <div class="flex flex-col">
      <CustomContainer
        :variant="'numbered'"
        class="mx-auto"
      >
        {{ sectionNumber }}
      </CustomContainer>
      <CustomContainer :variant="'line'" />
    </div>

    <slot></slot>
  </section>
  <div
    ref="sectionRef"
    v-else
    :class="computedClass"
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from "vue";
import { useGlobalSettingStore } from "~/store/globalSetting";
const state = useGlobalSettingStore();

const sectionRef = ref<HTMLElement | null>(null);

defineExpose({
  sectionRef,
});

const variants = {
  section: `grid grid-cols-[2.5rem,1fr]`,
  sectionWithLines: `grid grid-cols-[2.5rem,1fr]`,
  numbered: `border border-1 border-primary/40 rounded-md w-7 h-7 flex items-center justify-center
  text-T3TextColor dark:text-darkT3TextColor `,
  line: `w-[1px] bg-T4TextColor/50 dark:bg-darkT4TextColor/50 h-full max-h-full mx-auto`,
  UIContainer: state.newColors
    ? "bg-bg text-text-muted border border-b-border-muted border-border border-t-highlight rounded-lg"
    : `bg-mainT2Bg dark:bg-darkMainT2Bg  rounded-lg text-T3TextColor dark:text-darkT3TextColor border border-1 border-gray-500/30`,
  ReverseUIContainer: state.newColors
    ? "bg-bg-dark text-text-muted border border-b-border-muted border-border border-t-highlight rounded-lg"
    : `bg-mainBg dark:bg-darkMainBg  rounded-lg text-T3TextColor dark:text-darkT3TextColor border border-1 border-gray-500/10`,
  mainContainer: state.newColors
    ? "bg-bg-dark text-text-muted"
    : `bg-mainBg dark:bg-darkMainBg  text-T3TextColor dark:text-darkT3TextColor `,
};
const props = defineProps({
  variant: { type: String as PropType<keyof typeof variants>, required: true },
  sectionNumber: { type: [String, Number], default: "null" },
});
const computedClass = computed(() => {
  return [variants[props.variant]].join(" ");
});
</script>

<style scoped></style>
