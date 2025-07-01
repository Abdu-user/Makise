<template>
  <div class="pb-10">
    <div class="p-6">
      <CustomHeads
        id="top"
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
            icon
            tabindex="-1"
            :variant="'text'"
            :is-primary-color="'theme'"
            class="w-10 h-10 p-2 rounded-full"
          >
          </CustomButton>
        </NuxtLink>

        CustomButton
      </CustomHeads>

      <CustomButtonEndProduct
        :id="navLinks[0].href.slice(1)"
        :section-number="1"
      />

      <CustomButtonLearnHowToUse
        class="mt-7"
        :id="navLinks[1].href.slice(1)"
        :section-number="2"
      />
      <CustomButtonAllVariants
        :id="navLinks[2].href.slice(1)"
        :section-number="3"
      />
      <CustomButtonExplanation
        :id="navLinks[3].href.slice(1)"
        :section-number="4"
      />
      />
    </div>
  </div>
  <ScrollLinks
    class="max-md:hidden"
    :nav-links="navLinks"
    :nav-links-title="'On this pages'"
  />
</template>

<script setup lang="ts">
import { useGlobalSettingStore } from "~/store/globalSetting";
const state = useGlobalSettingStore();

const navLinks = [
  { href: "#command", label: "command" },
  { href: "#default", label: "default" },
  { href: "#allVariants", label: "allVariants" },
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
