<template>
  <p :class="paragraphClass">
    <slot></slot>
  </p>
</template>

<script setup lang="ts">
const variants = {
  default: "text-T3TextColor dark:text-darkT3TextColor my-4 mx-6",
  edit: "text-T3TextColor dark:text-darkT3TextColor font-semibold text-xl",
};
const props = defineProps({
  variant: { type: String as PropType<keyof typeof variants>, default: "default" },
});

const paragraphClass = computed(() => {
  return [variants[props.variant]].join(" ");
});
</script>

<style scoped></style>
