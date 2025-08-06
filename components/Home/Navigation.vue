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
        <div
          class="relative w-10 text-text"
          ref="langDiv"
        >
          <button
            ref="langButton"
            @click="isLangOpen = !isLangOpen"
            class="uppercase font-semibold"
            v-show="!isLangOpen"
          >
            {{ locale }}
          </button>
          <div
            class="grid absolute top-0"
            v-show="isLangOpen"
          >
            <button
              class="uppercase"
              v-for="locale in locales"
              @click="(setLocale(locale.code), (isLangOpen = false))"
            >
              {{ locale.code }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { homeHashLinks } from "~/constants";
const { locales, locale, setLocale } = useI18n();
const isLangOpen = ref(false);
const langButton = ref<HTMLButtonElement>();
const langDiv = ref<HTMLDivElement>();

const isNavOpenHome = ref(false);
const navButton = ref<{ button: HTMLButtonElement }>();
const navDiv = ref<HTMLDivElement>();
const el = ref<HTMLElement>();
function isLangContain(e: Event) {
  const target = e.target as Node;

  const containsNavButton = (navButton.value?.button as Node)?.contains(target);
  const containsNavDiv = (navDiv.value as Node)?.contains(target);
  if (containsNavButton || containsNavDiv) {
  } else {
    isNavOpenHome.value = false;
  }

  const containsButton = (langButton.value as Node)?.contains(target);
  const containsDiv = (langDiv.value as Node)?.contains(target);
  if (containsButton || containsDiv) return;
  isLangOpen.value = false;
}
onMounted(() => {
  document.addEventListener("click", isLangContain);
});
onBeforeUnmount(() => {
  document.removeEventListener("click", isLangContain);
});
</script>

<style scoped></style>
