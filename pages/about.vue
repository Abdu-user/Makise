<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-gray-100">
    <h1 class="text-4xl font-bold text-gray-800 mb-4">About Us</h1>
    <p class="text-lg text-gray-600 max-w-xl text-center">
      Welcome to Authentifection! This is the about page. Here you can learn more about our project and team.
    </p>
  </div>
</template>

<script setup lang="ts">
import { useGlobalSettingStore } from "~/store/globalSetting";
const state = useGlobalSettingStore();
state.routeName = "About";
useHead({
  title: "About Makise ",
});
definePageMeta({
  layout: "main",
});
</script>
