<template>
  <a :class="computedClass"><slot></slot></a>
</template>

<script setup lang="ts">
const variants = {
  default: "text-primary hover:underline focus:underline",
  navigation: ` text-T3TextColor dark:text-darkT3TextColor 
  hover:text-T2TextColor hover:dark:text-darkT2TextColor 
  focus:text-T2TextColor focus:dark:text-darkT2TextColor   `,
};
const props = defineProps({
  variant: { type: String as PropType<keyof typeof variants>, default: "default" },
  error: { type: Boolean, default: false },
});

const computedClass = computed(() => {
  return [variants[props.variant as keyof typeof variants], props.error ? "text-red-500 font-bold uppercase" : ""].join(" ");
});
</script>
