<template>
  <NuxtLink
    :class="linkClass"
    :active-class="activeClass"
    v-slot="slotProps: any"
    class="  "
  >
    <slot v-bind="slotProps" />
  </NuxtLink>
</template>

<script setup lang="ts">
const props = defineProps({
  variant: { type: String, default: "underline" },
});

const linkClass = computed(() => {
  const variants = {
    underline: ` inline-block py-3 md:relative z-10 max-md:px-5 max-md:shadow-lg  rounded-md `,
    full: "px-3 py-2 rounded flex items-center gap-2 text-textSecondary transition-colors duration-200 hover:bg-highlight/5",
  };
  return variants[props.variant as keyof typeof variants];
});

const activeClass = computed(() => {
  const variants = {
    underline: `text-primaryColor border-b-primary border-b-[2px] rounded-b-none`,
    full: "bg-activeWeak/90 !text-activeStrong",
  };
  return variants[props.variant as keyof typeof variants];
});
</script>
