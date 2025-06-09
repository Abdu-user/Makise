<template>
  <div class="px-6 pb-12">
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
    <main class="mt-4 grid md:grid-cols-4 gap-4">
      <CustomNuxtLink
        v-for="component in componentsLinks"
        :to="$route.fullPath + component.to"
        :variant="'ghostButton'"
        block
      >
        {{ component.name }}
      </CustomNuxtLink>
    </main>
  </div>
</template>

<script setup lang="ts">
import { componentsLinks } from "~/mainFrame";
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
