<template>
  <div class="px-5 pt-24 grid justify-center">
    <div
      class="flex gap-5 md:gap-10 items-center max-md:flex-col justify-between bg-gradient2 px-7 py-7 rounded-3xl slideUp animate-slide-up"
    >
      <div class="w-full">
        <h2 class="text-4xl md:text-5xl font-bold">{{ $t("Let'sTryOurServiceNow") }}!</h2>
        <p class="mt-10 text-[var(--text-ghost)]">{{ $t("LetsTryParagraph") }}</p>
      </div>
      <HomeButtonFromHome
        @click="$router.push('/contacts')"
        class="h-fit max-md:w-full"
        >{{ $t("getStarted") }}</HomeButtonFromHome
      >
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.bg-gradient2 {
  background: linear-gradient(90deg, #ffc9c9, #fbb8b8);
}
:root.dark {
  .bg-gradient2 {
    background: linear-gradient(90deg, #412d2d, #7c2222);
  }
}
</style>
