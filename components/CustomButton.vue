<template>
  <button
    :class="`${buttonClass} ${sizeClass}`"
    @click="$emit('click', $event)"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
import { computed, defineProps } from "vue";

const props = defineProps<{
  variety: "primary" | "secondary" | "danger";
  type: "button" | "text" | "image";
  size?: "sm" | "md" | "lg";
}>();

const sizeClass = computed(() => {
  switch (props.size) {
    case "sm":
      return "text-sm px-2 py-1";
    case "lg":
      return "text-lg px-6 py-3";
    case "md":
    default:
      return "text-base px-4 py-2";
  }
});

const buttonClass = computed(() => {
  switch (props.variety) {
    case "primary":
      return "bg-primary text-white px-4 py-2 rounded hover:bg-highlight";
    case "secondary":
      return `hover:bg-gray-200  border border-1 border-primary text-gray-800
       px-6 py-2 rounded hover:bg-gray-300`;
    case "danger":
      return "bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700";
    default:
      return "bg-gray-100 text-black px-4 py-2 rounded hover:bg-gray-200";
  }
});

const type = props.type || "button";
</script>

<style scoped>
/* Add any additional custom styles here if needed */
</style>
