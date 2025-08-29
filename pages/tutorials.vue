<template>
  <div class="px-6 pb-20">
    <CustomHeads
      :variant="'h1'"
      :heads="'h1'"
      class="capitalize"
      >{{ $t("getStarted") }}! {{ $t("messaging") }}</CustomHeads
    >

    <TutorialsStepsCard
      :title="$t('projectDetails.authorizeHowTo')"
      :description="$t('signUpDescription')"
      :number="1"
    >
      <p class="font-bold text-text-muted text-lg mb-2">{{ $t("tutorial.howToSignUpDesc") }}</p>
      <p class="text-text-muted">
        <span class="font-bold text-xl">1. </span>
        <span>{{ $t("tutorial.howtoSignUpWithEmail") }}</span>
      </p>
      <span class="font-bold text-xl mt-2 inline-block">{{ $t("common.step") }} 1. </span>
      <img
        src="/images/tutorial-images/sign-up-form-example.png"
        alt=""
      />

      <span class="font-bold text-xl mb-2 inline-block">{{ $t("common.step") }} 2. </span>
      <img
        src="/images/tutorial-images/confirm-password-example.png"
        alt=""
      />
      <p class="text-text-muted my-2">
        <span class="font-bold text-xl">2. </span>
        <span>{{ $t("tutorial.howtoSignUpWithGoogle") }}</span>
      </p>
      <img
        src="/images/tutorial-images/google-sign-in-example.png"
        alt=""
      />
    </TutorialsStepsCard>
  </div>
  <div class="sticky top-20 bottom-0 bg-green-600 max-xl:hidden">ssss</div>
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
