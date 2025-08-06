<template>
  <div class="px-6">
    <CustomHeads
      :variant="'h1'"
      :heads="'h1'"
      class="capitalize"
      >tutorials</CustomHeads
    >

    <CustomHeads
      heads="h2"
      :variant="'h2'"
    >
      Continue the this (Makise) project
    </CustomHeads>
    <main>
      <p class="dark:text-darkT3TextColor">
        to resume the project, please uncomment this line in <strong> "middleware/auth.ts": </strong>
        <i>"// return navigateTo("/sign-up");"" </i>
      </p>
    </main>
  </div>
</template>

<script setup lang="ts">
import { SCREENS } from "~/constants";
import { useGlobalSettingStore } from "~/store/globalSetting";

const state = useGlobalSettingStore();
useHead({
  title: "Tutorials on Makise",
});
definePageMeta({
  layout: "documentation",
});
onMounted(() => {
  if (window.innerWidth > SCREENS.md) {
    state.isNavOpen = true;
  } else {
    state.isNavOpen = false;
  }
});
</script>

<style scoped></style>
