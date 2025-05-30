<template>
  <NuxtLink> </NuxtLink>
</template>

<script setup lang="ts">
const props = defineProps({
  icon: { type: Boolean, default: false },
  variant: { type: String, default: "default" },
  size: { type: String, default: "md" },
});

const LinkClass = computed(() => {
  // const name;
});
</script>
