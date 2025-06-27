<template>
  <Icon
    :name="name"
    :class="classNames"
  />
</template>

<script setup lang="ts">
const variants = {
  default: "text-T3TextColor dark:text-darkT3TextColor",
};
const sizes = {
  sm: "w-4 h-4",
  md: "w-6 h-6",
  lg: "w-8 h-8",
  f: `w-full h-full`,
};
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  variant: {
    type: String as PropType<keyof typeof variants>,
    default: "default",
  },
  size: {
    type: String as PropType<keyof typeof sizes>,
    default: "sm",
  },
});
const classNames = computed(() => {
  return [variants[props.variant], sizes[props.size], "inline-block"].join(" ");
});
</script>

<style scoped></style>
