<template>
  <div class="grid md:grid-cols-[1fr,14rem]">
    <div class="p-6">
      <CustomHeads
        :heads="'h1'"
        :variant="'h1'"
        class="flex"
      >
        <NuxtLink
          to="/components"
          class="mr-1"
        >
          <CustomButton2
            name="material-symbols:arrow-back-ios-new"
            tabindex="-1"
            icon
            :variant="'text'"
            :is-primary-color="'theme'"
          />
        </NuxtLink>

        CustomButton2
      </CustomHeads>

      <CustomButtonLearnHowToUse />
    </div>
    <CustomButtonScrollLinks class="max-md:hidden" />
  </div>
</template>

<script setup lang="ts">
import { useGlobalSettingStore } from "~/store/globalSetting";
const state = useGlobalSettingStore();
onMounted(() => state.setIsScrollLinksExist(true));
onUnmounted(() => state.setIsScrollLinksExist(false));
const focusin = () => {
  document.activeElement;
};
onMounted(() => {
  document.addEventListener("focusin", focusin);
});
onUnmounted(() => {
  document.removeEventListener("focusin", focusin);
});

useHead({
  title: "Documentation on Custom component",
});
definePageMeta({
  layout: "documentation",
});
</script>

<style scoped></style>
