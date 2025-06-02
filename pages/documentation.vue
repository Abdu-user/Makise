<template>
  <div>
    to resume the project, please uncomment this line in <strong> "middleware/auth.ts": </strong>
    <i>"// return navigateTo("/sign-up");"" </i>
  </div>
</template>

<script setup lang="ts">
import { useGlobalSettingStore } from "~/store/globalSetting";
const state = useGlobalSettingStore();
state.routeName = "Documentation";
useHead({
  title: "Makise Documentation",
});
definePageMeta({
  layout: "main",
});
</script>

<style scoped></style>
