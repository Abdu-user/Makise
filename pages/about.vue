<template>
  <div class="min-h-screen w-full flex flex-col container mx-auto p-4 md:p-8 lg:p-12 bg-bg rounded-lg shadow-xl max-w-4xl mt-8">
    <AboutProjectFirstSection />
    <AboutProjectWhatCanYouDoHere />
    <AboutProjectFooter />
  </div>
</template>

<script setup lang="ts">
import { useGlobalSettingStore } from "~/store/globalSetting";
const state = useGlobalSettingStore();

onMounted(() => state.setRouteName("About"));
useHead({
  title: "About Makise ",
});
definePageMeta({
  layout: "main",
});
</script>

<style scoped>
/* .container {
  background-color: var(--bg-dark);
} */
</style>
