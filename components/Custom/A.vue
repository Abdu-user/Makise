<template>
  <a :class="computedClass"><slot></slot></a>
</template>

<script setup lang="ts">
const props = defineProps({
  variant: { type: String, default: "default" },
  error: { type: Boolean, default: false },
});

const computedClass = computed(() => {
  const variants = {
    default: "text-primary hover:underline",
  };

  return [variants[props.variant as keyof typeof variants], props.error ? "text-red-500 font-bold uppercase" : ""].join(" ");
});
</script>
