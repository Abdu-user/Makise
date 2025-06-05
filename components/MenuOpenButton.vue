<template>
  <div class="rounded-full w-10 h-10">
    <button
      @click="toggle()"
      class="w-full h-full flex items-center justify-center"
    >
      <Icon
        :name="isMenuOpen ? 'heroicons-outline:x' : 'heroicons-outline:menu'"
        class="w-7 h-7 text-primary"
      />
    </button>
  </div>
</template>

<script setup lang="ts">
defineProps({
  isMenuOpen: { type: Boolean, required: true },
  toggle: { type: Function, required: true },
});
</script>

<style scoped></style>
