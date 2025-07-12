<template>
  <CustomContainer
    :variant="'mainContainer'"
    :class="`min-h-screen max-h-screen overflow-auto
     md:grid max-md:flex max-md:flex-col  md:grid-cols-2  items-center 
      p-4 gap-8 `"
  >
    <SignInAdditionalInfo class="max-md:order-2" />
    <SignInForm class="" />
  </CustomContainer>
</template>

<script setup lang="ts">
import { bigNames } from "~/constants";

useHead({
  title: "Sign in to " + bigNames.appName,
});

definePageMeta({
  middleware: "is-logged-in",
});
</script>

<style scoped></style>
