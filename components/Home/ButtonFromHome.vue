<template>
  <button class="text-[var(--bg)] rounded-md bg-gradient w-fit px-6 py-4"><slot></slot></button>
</template>

<script setup lang="ts"></script>

<style scoped>
.bg-gradient {
  background: linear-gradient(-52, #f56e99 0%, #c4416b 50%, #87304b 100%);
}
</style>
