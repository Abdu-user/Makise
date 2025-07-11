<template>
  <SignUpConfirmCode class="order-1" />
</template>

<script setup lang="ts">
useHead({
  title: "Sign up to Makise",
});
definePageMeta({
  layout: "sign-up",
  middleware: ["is-logged-in", "does-already-added-s-sgn-up-form"],
});
</script>

<style scoped></style>
