<template>work</template>
<script setup lang="ts">
import { useGlobalSettingStore } from "~/store/globalSetting";

definePageMeta({
  layout: "profile",
  middleware: "auth",
});
const state = useGlobalSettingStore();

onMounted(() => state.setRouteName("Profile"));
</script>
