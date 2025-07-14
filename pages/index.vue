<template>
  <CustomContainer
    :variant="'mainContainer'"
    class="max-w-7xl mx-auto"
  >
    <HomeNavigation />
    <div class="md:h-[100dvh]">
      <HomeFirstHero />
    </div>
    <div>waawaw</div>
    <HomeSecondHero />
  </CustomContainer>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";

import { useGlobalSettingStore } from "~/store/globalSetting";
const state = useGlobalSettingStore();
onMounted(() => {
  state.setThemeMode("light");
});
</script>

<style>
.slideLeft {
  animation:
    slideInLeft ease-in-out forwards,
    slideOutLeft ease-in-out forwards;

  animation-timeline: view();
  animation-composition: accumulate;

  animation-range:
    cover 0% cover 10%,
    cover 90% cover 100%;
}

@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-100%);
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
    transform: translateX(-100%);
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
    cover 90% cover 100%;
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(100%);
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
    transform: translateX(100%);
  }
}
</style>
