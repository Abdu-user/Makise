<template>
  <div></div>
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
