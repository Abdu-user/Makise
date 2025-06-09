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
          <CustomButton
            name="material-symbols:arrow-back-ios-new"
            tabindex="-1"
            icon
            :variant="'text'"
            :is-primary-color="'theme'"
          />
        </NuxtLink>

        CustomInput
      </CustomHeads>

      <CustomInputEndProduct />

      <!-- <CustomButtonLearnHowToUse class="mt-10" /> -->
    </div>
    <ScrollLinks
      class="max-md:hidden"
      :nav-links="navLinks"
      :nav-links-title="'on those pages1'"
    />
  </div>
</template>

<script setup lang="ts">
import { useGlobalSettingStore } from "~/store/globalSetting";
const state = useGlobalSettingStore();

const navLinks = [{ href: "command", label: "commando" }];

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
