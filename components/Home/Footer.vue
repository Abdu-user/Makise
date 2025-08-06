<template>
  <footer class="px-6 md:px-12 pt-12 md:pb-8 max-md:w-screen relative overflow-clip">
    <div class="">
      <div class="purpleBlur absolute right-0 translate-x-full"></div>
      <div>
        <div class="flex justify-between max-md:flex-col gap-10">
          <div>
            <NuxtLink
              to="/profile"
              class="flex items-center gap-2 w-fit"
            >
              <img
                src="/images/favicon.png"
                alt="logo"
                class="w-20 h-20"
              />
              <span
                class="bg-clip-text text-transparent text-base font-semibold -mt-1 text"
                style="background-image: var(--text-gradient)"
                >Makise</span
              >
            </NuxtLink>
            <p>{{ $t("footerLogoParagraph") }}</p>
          </div>
          <div class="grid grid-cols-2 md:grid-cols-3 gap-y-8 gap-x-4">
            <div
              v-for="linkObject in footerLinks"
              class="flex flex-col"
            >
              <span class="font-bold mb-3">{{ $t(linkObject.name) }}</span>
              <span v-for="link in linkObject.links">{{ $t(link) }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="h-[1px] w-full bg-[--text] mt-14"></div>
      <div class="py-14 flex justify-between">
        <span class="font-bold">
          {{ $t("copyRight") }}
        </span>
        <div class="flex gap-7">
          <Icon
            :name="socialIcon"
            v-for="socialIcon in socialIcons"
            class="w-5 h-5"
          />
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { footerLinks } from "~/constants";
const socialIcons = ["mdi:linkedin", "mdi:twitter", "ic:baseline-facebook", "mdi:instagram"];
</script>

<style scoped></style>
