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
        />
      </NuxtLink>

      CustomLabel
    </CustomHeads>

    <CustomLabelEndProduct :id="navLinks[0].href.slice(1)" />

    <CustomLabelHowToUse
      :id="navLinks[1].href.slice(1)"
      class=""
    />
    <CustomLabelAllVariants :id="navLinks[2].href.slice(1)" />
    <CustomLabelExplanation :id="navLinks[3].href.slice(1)" />
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
  { href: "#explanation", label: "explanation" },
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
