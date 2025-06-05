<template>
  <Transition
    v-if="variant === 'drop-down'"
    enter-active-class="transition-all duration-300 ease-in-out"
    enter-from-class="opacity-0 -translate-y-10"
    enter-to-class="opacity-100 translate-y-0"
    leave-active-class="transition-all duration-300 ease-in-out"
    leave-from-class="opacity-100 translate-y-0"
    leave-to-class="opacity-0 -translate-y-10 pointer-events-none "
  >
    <slot> </slot>
  </Transition>
  <slot v-else-if="variant === 'none'"></slot>
</template>

<script setup lang="ts">
defineProps({
  variant: { type: String as PropType<"drop-down" | "none">, required: true },
});
</script>

<style scoped></style>
