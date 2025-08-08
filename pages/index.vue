<template>
  <CustomContainer
    :variant="'mainContainer'"
    class="max-w-7xl mx-auto max-md:overflow-clip grid gap-20"
  >
    <span class="fixed bottom-0 right-0">6.1.6v</span>
    <HomeNavigation />
    <HomeFirstHero />
    <HomeSecondHero />
    <HomeThirdHero />
    <HomeFourthHero />
    <HomeTryOurService />
    <HomeFooter />
  </CustomContainer>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";

import { useGlobalSettingStore } from "~/store/globalSetting";
const state = useGlobalSettingStore();
onMounted(() => {
  // document.documentElement.classList.remove("dark");
  // document.documentElement.classList.toggle("dark", false);
});
onBeforeUnmount(() => {
  state.loadThemeMode();
});
</script>

<style>
/* Prevent horizontal overflow from visual effects (Safari safe) */
section,
div {
  overflow-x: clip;
}

.purpleBlur,
.redBlur {
  position: absolute;
  pointer-events: none;
  z-index: -1;
  /* keep width/height for style, but remove from layout flow */
}
.purpleBlur {
  background-color: rgba(108, 37, 249, 0.35);
  width: 600px;
  height: 600px;
  filter: blur(750px);
  border-radius: 9999px;
}
.redBlur {
  background-color: rgba(185, 28, 28, 0.523);
  width: 600px;
  height: 600px;
  border-radius: 9999px;
  filter: blur(750px);
}

.slideLeft {
  animation:
    slideInLeft ease-in-out forwards,
    slideOutLeft ease-in-out forwards;

  animation-timeline: view();
  animation-composition: accumulate;

  animation-range:
    cover 0% cover 10%,
    cover 85% cover 100%;
}

@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-25%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideOutLeft {
  from {
    opacity: 1;
    transform: translateX(0);
  }
  to {
    opacity: 0;
    transform: translateX(-25%);
  }
}
.slideRight {
  animation:
    slideInRight 0.6s ease-in-out forwards,
    slideOutRight 0.6s ease-in-out forwards;

  animation-timeline: view();
  animation-composition: accumulate;

  animation-range:
    cover 0% cover 10%,
    cover 85% cover 100%;
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(25%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideOutRight {
  from {
    opacity: 1;
    transform: translateX(0);
  }
  to {
    opacity: 0;
    transform: translateX(25%);
  }
}
@supports not (animation-timeline: view()) {
  .slideLeft,
  .slideRight {
    opacity: 1;
    transform: translateX(0) !important;
    transition:
      opacity 0.6s,
      transform 0.6s;
  }
}
</style>
