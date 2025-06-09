<template>
  <div class="max-w-7xl mx-auto dark:bg-darkMainBg bg-mainBg">
    <header
      class="fixed z-10 px-6 h-20 top-0 right-0 bg-mainBg/30 dark:bg-darkMainBg/30 backdrop-blur-sm border-b-[1px] border-gray-400/50 w-full"
    >
      <div class="max-w-7xl mx-auto h-full flex justify-center items-center gap-6">
        <!-- Project Logo -->
        <div class="flex items-center">
          <img
            :src="bigNames.mainLogPath"
            :alt="bigNames.appName"
            class="w-10 h-10"
          />
          <h1 class="text-2xl dark:text-darkT1TextColor">{{ bigNames.appName }}</h1>
        </div>
        <div class="flex items-center max-md:hidden">
          <NuxtLink
            to="/"
            class="font-semibold text-xl md:text-lg text-center dark:text-darkT2TextColor hover:text-primaryColor"
            >Docs</NuxtLink
          >
        </div>

        <NuxtLink
          class="ml-auto"
          to="/"
        >
          <CustomButton
            :variant="'primary'"
            :is-primary-color="'primary'"
            tabindex="-1"
          >
            Get Started
          </CustomButton>
        </NuxtLink>

        <MenuOpenButton
          class="md:hidden md:pointer-events-none"
          :toggle="state.toggleIsNavOpen"
          :is-menu-open="state.isNavOpen"
        />
      </div>
    </header>
  </div>
  <div class="dark:bg-darkMainBg bg-mainBg">
    <div
      :class="`${state.isScrollLinksExist ? `md:grid-cols-[1fr,14rem]` : 'md:grid-cols-[14rem,1fr]'}
     md:grid max-w-7xl mx-auto xl:grid-cols-[14rem,1fr,14rem]
     min-h-screen pt-20  items-start `"
    >
      <CustomTransitions :variant="'drop-down'">
        <nav
          :class="`
            fixed z-10 md:sticky top-20 bottom-0
            max-md:left-0 max-md:right-0
            max-h-[calc(100vh-5rem)] p-4
            overflow-auto
            border-r-[1px] border-r-gray-400/50
            dark:bg-darkMainBg/90 bg-mainBg/70 backdrop-blur-sm
            ${state.isScrollLinksExist ? 'md:hidden xl:block' : ''}
            `"
          v-if="state.isNavOpen"
          class="h-full"
          @click.self="() => state.toggleIsNavOpen()"
        >
          <NavigationalLinks /></nav
      ></CustomTransitions>

      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { bigNames, navLinks } from "~/mainFrame";
import { useGlobalSettingStore } from "~/store/globalSetting";
const route = useRoute();
const state = useGlobalSettingStore();
const responsive = (isRouteChanged: boolean = false) => {
  if (window.innerWidth > 768) {
    state.isNavOpen || state.toggleIsNavOpen(true);
  } else isRouteChanged || (state.isNavOpen && state.toggleIsNavOpen(false));
};
onMounted(() => {
  window.addEventListener("resize", () => responsive());
});
onUnmounted(() => {
  window.removeEventListener("resize", () => responsive());
});
watch(
  () => route.fullPath,
  () => responsive(true)
);
</script>
