<template>
  <label :class="computedClass"><slot></slot></label>
</template>

<script setup lang="ts">
const props = defineProps({
  variant: { type: String, default: "default" },
  error: { type: Boolean, default: false },
});

const computedClass = computed(() => {
  const variants = {
    default: "block text-primary hover:text-highlight font-medium ",
  };

  return [variants[props.variant as keyof typeof variants], props.error ? "text-red-500 font-bold uppercase" : ""].join(" ");
});
</script>
