<template>
  <div class="px-6">
    <CustomHeads
      :variant="'h1'"
      :heads="'h1'"
      class="capitalize"
      >{{ $t("getStarted") }}! {{ $t("messaging") }}</CustomHeads
    >

    <TutorialsStepsCard
      :title="$t('signUp')"
      :description="$t('signUpDescription')"
    ></TutorialsStepsCard>
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
