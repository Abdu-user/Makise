<template>
  <nav class="absolute top-0 z-10 left-0 w-full flex h-28 items-center justify-between px-11">
    <div class="flex items-center gap-2">
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
    </div>
    <div class="md:hidden"><Icon name="hugeicons:menu-11" /></div>
    <div class="max-md:hidden flex text-base text-text font-semibold">
      <div class="flex gap-14 mr-14">
        <a
          :href="'#' + hashLink"
          v-for="hashLink in homeHashLinks"
          >{{ hashLink }}</a
        >
      </div>
      EN 🇺🇸
    </div>
  </nav>
</template>

<script setup lang="ts">
import { homeHashLinks } from "~/constants";
</script>

<style scoped></style>
