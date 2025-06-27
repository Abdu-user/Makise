<template>
  <div>Contact page</div>
</template>

<script setup lang="ts">
import { useGlobalSettingStore } from "~/store/globalSetting";
const state = useGlobalSettingStore();
onMounted(() => state.setRouteName("Contact"));
useHead({
  title: "Make contact with Makise",
});
definePageMeta({
  layout: "main",
});
</script>
