<template>
  <CustomContainer
    :variant="'mainContainer'"
    :class="`min-h-screen max-h-screen overflow-auto
     md:grid max-md:flex max-md:flex-col  md:grid-cols-2  items-center 
      p-4 gap-8 `"
  >
    <SignUpAdditionalInfo class="max-md:order-2" />
    <SignUpForm class="order-1" />
  </CustomContainer>
</template>

<script setup lang="ts">
useHead({
  title: "Sign up to Makise",
});

definePageMeta({
  middleware: "is-logged-in",
});
</script>

<style scoped></style>
