<template>
  <NuxtLink
    :class="linkClass"
    :active-class="activeClass"
    v-slot="slotProps: any"
  >
    <slot v-bind="slotProps"> </slot>
  </NuxtLink>
</template>

<script setup lang="ts">
const props = defineProps({
  variant: { type: String, default: "undeline" },
});

const linkClass = computed(() => {
  const variants = {
    underline: "",
    full: "px-3 py-2 rounded flex items-center gap-2 text-textSecondary transition-colors duration-200 hover:bg-highlight/5",
  };
  return [variants[props.variant as keyof typeof variants]].join(" ");
});

const activeClass = computed(() => {
  const variants = {
    underline: "",
    full: "bg-activeWeak/90 !text-activeStrong",
  };
  return [variants[props.variant as keyof typeof variants]].join(" ");
});
</script>
