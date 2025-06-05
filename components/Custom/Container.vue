<template>
  <div :class="computedClass">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
const variants = {};
const computedClass = computed(() => {
  return [].join(" ");
});
</script>

<style scoped></style>
