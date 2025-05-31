<template>
  <label :class="finalClass">
    <template v-if="error">
      {{ error }}
    </template>
    <slot v-else></slot>
  </label>
</template>

<script setup lang="ts">
const isAnimating = ref(true);
const props = defineProps({
  variant: { type: String, default: "default" },
  error: { type: String, default: false },
  isAnimatingN: { type: Number, default: 0 },
  animationTime: { type: Number, default: 500 },
});

const computedClass = computed(() => {
  const variants = {
    default: ` my-2 block hover:text-red-500 font-medium 
    ${props.error ? "" : "text-textSecondary"}`,
  };

  return [variants[props.variant as keyof typeof variants], props.error ? "text-red-500 font-bold uppercase " : "", ,].join(" ");
});
const finalClass = computed(() => {
  return (props.error && isAnimating.value ? "animate-shake" : "") + computedClass.value;
});
const timerId = ref<null | NodeJS.Timeout>();
watch(
  () => props.isAnimatingN,
  () => {
    if (isAnimating.value) {
      timerId.value && clearTimeout(timerId.value);
      timerId.value = setTimeout(() => (isAnimating.value = false), props.animationTime);
    } else {
      isAnimating.value = true;
      timerId.value = setTimeout(() => (isAnimating.value = false), props.animationTime);
    }
  },
  { immediate: true }
);
</script>
