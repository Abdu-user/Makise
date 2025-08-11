<template>
  <button
    @click="loginWithGoogle"
    class="mt-6 w-full flex items-center justify-center gap-2 bg-bg-light border border-secondary text-text hover:bg-bg-dark focus:outline-none focus:border-none focus:ring-2 focus:ring-primary rounded-lg px-4 py-2 transition-colors"
  >
    <Img
      src="/logos/google-logo.png"
      alt="Google Logo"
      width="24"
      height="24"
    />
    Google
  </button>
</template>

<script setup lang="ts"></script>

<style scoped></style>
