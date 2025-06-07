<template>
  <div
    :class="`min-h-screen max-h-screen overflow-auto
     md:grid max-md:flex max-md:flex-col  md:grid-cols-2  items-center 
     bg-mainBg dark:bg-darkMainBg p-4 gap-8 `"
  >
    <SignInAdditionalInfo class="max-md:order-2" />
    <SignInForm class="" />
  </div>
</template>

<script setup lang="ts">
useHead({
  title: "Sign in to Makise",
});
</script>

<style scoped></style>
