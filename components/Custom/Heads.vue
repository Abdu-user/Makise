<template>
  <h1
    :class="computedClass"
    v-if="heads === 'h1'"
  >
    <slot></slot>
  </h1>
  <h2
    :class="computedClass"
    v-else-if="heads === 'h2'"
  >
    <slot></slot>
  </h2>
  <h3
    :class="computedClass"
    v-else-if="heads === 'h3'"
  >
    <slot></slot>
  </h3>
  <h4
    :class="computedClass"
    v-else-if="heads === 'h4'"
  >
    <slot></slot>
  </h4>
  <h5
    :class="computedClass"
    v-else-if="heads === 'h5'"
  >
    <slot></slot>
  </h5>
  <h6
    :class="computedClass"
    v-else-if="heads === 'h6'"
  >
    <slot></slot>
  </h6>
</template>

<script setup lang="ts">
const variants = {
  h1: `
  inline-block py-10 w-full text-4xl
  text-T2TextColor
  dark:text-darkT2TextColor border-b-[1px] border-b-darkT3TextColor/40 
  `,
  h2: `inline-block py-4 w-full text-sm uppercase
  text-T4TextColor
  dark:text-darkT4TextColor
     `,
};
const props = defineProps({
  heads: { type: String as PropType<"h1" | "h2" | "h3" | "h4" | "h5" | "h6">, required: true },
  variant: { type: String as PropType<keyof typeof variants>, required: true },
});
const computedClass = computed(() => {
  return [variants[props.variant]].join("");
});
</script>
