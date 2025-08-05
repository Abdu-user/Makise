<template>
  <button
    class="text-[var(--bg)] rounded-xl bg-gradient w-fit px-6 py-3"
    @click="$router.push('/contacts')"
  >
    <slot></slot>
  </button>
</template>

<script setup lang="ts"></script>

<style scoped>
.bg-gradient {
  background: linear-gradient(-52deg, #f56e99 0%, #c4416b 100%, #87304b 200%);
}
</style>
