<template>
  <CustomContainer
    :variant="'mainContainer'"
    :class="`min-h-screen max-h-screen overflow-auto
       items-center 
      p-4 gap-8 `"
  >
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
