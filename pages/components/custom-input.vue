<template>
  <div class="p-6">
    <CustomHeads
      :heads="'h1'"
      :variant="'h1'"
      class="flex"
      id="top"
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
          class="w-10 h-10 p-2 rounded-full"
        />
      </NuxtLink>

      CustomInput
    </CustomHeads>

    <CustomInputEndProduct
      :id="navLinks[0].href.slice(1)"
      :section-number="1"
    />

    <CustomInputHowToUse
      :id="navLinks[1].href.slice(1)"
      :section-number="2"
    />
    <CustomInputAllVariants
      :id="navLinks[2].href.slice(1)"
      :section-number="3"
    />
  </div>
  <ScrollLinks
    class="max-md:hidden"
    :nav-links="navLinks"
    :nav-links-title="'on those pages1'"
  />
</template>

<script setup lang="ts">
import { useGlobalSettingStore } from "~/store/globalSetting";
const state = useGlobalSettingStore();

const navLinks = [
  { href: "#command", label: "Command " },
  { href: "#howToUse", label: "How to use" },
  { href: "#allVariants", label: "All varints" },
];

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
