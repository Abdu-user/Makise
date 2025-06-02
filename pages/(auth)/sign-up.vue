<template>
  <div
    :class="`min-h-screen max-h-screen overflow-auto
     md:grid max-md:flex max-md:flex-col  md:grid-cols-2  items-center 
     bg-mainBg p-4 gap-8 `"
  >
    <SignUpAdditionalInfo class="max-md:order-2" />
    <SignUpForm class="order-1" />
  </div>
</template>

<script setup lang="ts">
useHead({
  title: "Sign up to Makise",
});
</script>

<style scoped></style>
