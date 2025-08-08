<template>
  <CustomContainer
    :variant="'mainContainer'"
    class="max-w-7xl mx-auto max-md:overflow-clip grid gap-20"
  >
    <span class="fixed bottom-0 right-0">7.0v</span>
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
  // document.documentElement.classList.toggle("dark", false);
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        if (entry.target.classList.contains("slideLeft")) {
          entry.target.classList.add("animate-slide-in-left");
        } else if (entry.target.classList.contains("slideRight")) {
          entry.target.classList.add("animate-slide-in-right");
        } else if (entry.target.classList.contains("slideUp")) {
          entry.target.classList.add("animate-slide-up");
        }
      } else {
        entry.target.classList.remove("animate-slide-in-right");
        entry.target.classList.remove("animate-slide-in-left");
        entry.target.classList.remove("animate-slide-up");
      }
    });
  });

  document.querySelectorAll(".slideLeft, .slideRight, .slideUp").forEach((el) => observer.observe(el));
});

onBeforeUnmount(() => {
  state.loadThemeMode();

  document.querySelectorAll(".animate-slide-in-left, .animate-slide-in-right, .animate-slide-up").forEach((el) => {
    el.classList.remove("animate-slide-in-left", "animate-slide-in-right", "animate-slide-up");
  });
});
</script>

<style>
.purpleBlur,
.redBlur {
  position: absolute;
  pointer-events: none;
  z-index: -1;
  width: 600px;
  height: 600px;
  filter: blur(750px);
  border-radius: 9999px;
}
.purpleBlur {
  background-color: rgba(108, 37, 249, 0.35);
}
.redBlur {
  background-color: rgba(185, 28, 28, 0.523);
}
.animate-slide-in-left {
  animation: slideInLeft 0.6s ease-in-out forwards;
}
.animate-slide-in-right {
  animation: slideInRight 0.6s ease-in-out forwards;
}

.animate-slide-up {
  animation: slideUp 0.6s ease-in-out forwards;
}

@keyframes slideInLeft {
  from {
    opacity: 0.4;
    transform: translateX(-25%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideInRight {
  from {
    opacity: 0.4;
    transform: translateX(25%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideUp {
  from {
    opacity: 0.4;
    transform: translateY(25%);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* @supports not (animation-timeline: view()) {
  .slideLeft,
  .slideRight {
    opacity: 1;
    transform: translateX(0) !important;
    transition:
      opacity 0.6s,
      transform 0.6s;
  }

} */

/* 
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
@keyframes slideOutRight {
  from {
    opacity: 1;
    transform: translateX(0);
  }
  to {
    opacity: 0;
    transform: translateX(25%);
  }
} */
/* .slideLeft {
  animation:
    slideInLeft ease-in-out forwards,
    slideOutLeft ease-in-out forwards;

  animation-timeline: view();
  animation-composition: accumulate;

  animation-range:
    cover 0% cover 10%,
    cover 85% cover 100%;
} */

/* .slideRight {
  animation:
    slideInRight 0.6s ease-in-out forwards,
    slideOutRight 0.6s ease-in-out forwards;

  animation-timeline: view();
  animation-composition: accumulate;

  animation-range:
    cover 0% cover 10%,
    cover 85% cover 100%;
} */
</style>
