<template>
  <button class="text-[var(--bg)] rounded-md bg-gradient w-fit px-6 py-4"><slot></slot></button>
</template>

<script setup lang="ts"></script>

<style scoped>
.bg-gradient {
  background: var(--button-color-gradient);
}
</style>
