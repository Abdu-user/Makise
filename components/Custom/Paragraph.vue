<template>
  <p :class="paragraphClass">
    <slot></slot>
  </p>
</template>

<script setup lang="ts">
const variants = {
  default: "text-T3TextColor dark:text-darkT3TextColor my-4 mx-6",
  noMargin: `text-T3TextColor dark:text-darkT3TextColor`,
  edit: "text-T3TextColor dark:text-darkT3TextColor font-semibold text-xl",
  editSecondary: " text-textSecondary dark:text-darkT4TextColor/90 font-semibold text-base",
};
const props = defineProps({
  variant: { type: String as PropType<keyof typeof variants>, default: "default" },
});

const paragraphClass = computed(() => {
  return [variants[props.variant]].join(" ");
});
</script>

<style scoped></style>
