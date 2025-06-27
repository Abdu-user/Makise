<template>
  <section
    ref="hero"
    class="flex flex-col items-center justify-center min-h-screen px-6 text-center bg-gradient-to-b from-white to-gray-100 dark:from-darkMainBg dark:to-darkMainT3Bg"
  >
    <div class="max-w-3xl space-y-6">
      <h1 class="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
        Welcome to <span class="text-primary-600 dark:text-primary-400">Your Nuxt App</span>
      </h1>
      <p class="text-lg text-gray-700 dark:text-gray-300">Build fast, modern web experiences using Nuxt 3, Appwrite, and Tailwind CSS.</p>
      <div class="flex flex-wrap justify-center gap-4">
        <NuxtLink
          to="/get-started"
          class="btn-primary"
        >
          Get Started
        </NuxtLink>
        <NuxtLink
          to="/about"
          class="btn-outline"
        >
          Learn More
        </NuxtLink>
      </div>
    </div>

    <NuxtImg
      src="/illustration.svg"
      alt="Hero Illustration"
      width="500"
      height="350"
      class="mt-12"
    />
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";

import { useGlobalSettingStore } from "~/store/globalSetting";
const state = useGlobalSettingStore();
onMounted(() => state.setRouteName("home"));
definePageMeta({
  layout: "main",
});

// const hero = ref(null)
// onMounted(() => {
//   if (hero.value) autoAnimate(hero.value)
// })
</script>

<style scoped>
.btn-primary {
  @apply inline-block px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition;
}

.btn-outline {
  @apply inline-block px-6 py-3 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-700 transition;
}
</style>
