<template>
  <section
    :class="computedClass"
    v-if="variant === 'section'"
  >
    <slot></slot>
  </section>
  <div
    v-else
    :class="computedClass"
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from "vue";

const variants = {
  section: `grid grid-cols-[2.5rem,1fr]`,
  numbered: `border border-1 border-primary/40 rounded-md w-7 h-7 flex items-center justify-center
  text-T3TextColor dark:text-darkT3TextColor `,
  line: `w-[1px] bg-gray-400/80 h-full mx-auto`,
};
const props = defineProps({
  variant: { type: String as PropType<keyof typeof variants>, required: true },
});
const computedClass = computed(() => {
  return [variants[props.variant]].join(" ");
});
</script>

<style scoped></style>
