<template>
  <div class="px-6">
    <CustomHeads
      :variant="'h1'"
      :heads="'h1'"
      >Component</CustomHeads
    >

    <CustomHeads
      heads="h2"
      :variant="'h2'"
      >Custom
    </CustomHeads>
    <main class="mt-4 flex flex-wrap gap-4">
      <CustomNuxtLink
        :to="$route.fullPath + '/custom-button'"
        :variant="'ghostButton'"
      >
        Button2
      </CustomNuxtLink>
      <CustomNuxtLink
        :to="$route.fullPath + '/custom-heads'"
        :variant="'ghostButton'"
      >
        Heads
      </CustomNuxtLink>
    </main>
  </div>
</template>

<script setup lang="ts">
import { useGlobalSettingStore } from "~/store/globalSetting";
const state = useGlobalSettingStore();
onMounted(() => {
  state.setRouteName("Documentation");
  state.setIsScrollLinksExist(false);
});
// onUnmounted(() => state.setIsScrollLinksExist(true));
useHead({
  title: "Makise Documentation",
});
definePageMeta({
  layout: "documentation",
});
</script>

<style scoped></style>
