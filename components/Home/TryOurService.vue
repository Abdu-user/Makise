<template>
  <div class="flex max-md:gap-5 items-center max-md:flex-col justify-between bg-gradient2 mx-12 mt-28 px-7 py-7 rounded-3xl slideLeft">
    <div class="w-full">
      <h2 class="text-4xl md:text-5xl font-bold">{{ $t("Let'sTryOurServiceNow") }}!</h2>
      <p class="mt-10 text-[var(--text-ghost)]">{{ $t("LetsTryParagraph") }}</p>
    </div>
    <HomeButtonFromHome class="h-fit max-md:w-full">{{ $t("getStarted") }}</HomeButtonFromHome>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.bg-gradient2 {
  background: linear-gradient(90deg, #ffc9c9, #fbb8b8);
}
</style>
