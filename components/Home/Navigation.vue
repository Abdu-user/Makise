<template>
  <nav class="absolute top-0 z-20 left-0 w-full">
    <div class="max-w-7xl mx-auto flex h-28 items-center justify-between px-4 md:px-11">
      <NuxtLink
        to="/profile"
        class="flex items-center gap-2"
      >
        <img
          src="/images/favicon.png"
          alt="logo"
          class="w-10 h-10"
        />
        <span
          class="bg-clip-text text-transparent text-base font-semibold -mt-1"
          style="background-image: var(--text-gradient)"
          >Makise</span
        >
      </NuxtLink>
      <div class="flex gap-4">
        <div class="md:hidden relative">
          <custom-button
            :variant="'text'"
            icon
            name="hugeicons:menu-11"
            size="md"
            @click="isNavOpenHome = !isNavOpenHome"
            ref="navButton"
          >
          </custom-button>
          <div
            class="grid gap-5 mr-14 absolute top-10 left-0 z-10 -translate-x-1/2 bg-gradient p-4 rounded-2xl"
            :class="{
              'opacity-0 pointer-events-none': !isNavOpenHome,
              'opacity-100 pointer-events-auto': isNavOpenHome,
            }"
            ref="navDiv"
          >
            <HomeHashLinks />
          </div>
        </div>
        <div class="max-md:hidden flex text-base text-text font-semibold">
          <div class="flex gap-14 mr-14">
            <HomeHashLinks />
          </div>
        </div>
        <LanguagePicker />
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import LanguagePicker from "../LanguagePicker.vue";
const isNavOpenHome = ref(false);
</script>

<style scoped></style>
