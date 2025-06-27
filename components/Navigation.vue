<template>
  <nav
    class="bg-mainBg/80 dark:bg-darkMainBg backdrop-blur-sm text-textHeader fixed top-0 left-0 w-full z-50 border-b-[1px] border-e-gray-600 dark:border-b-darkT3TextColor/40"
  >
    <div class="max-w-7xl mx-auto">
      <div class="relative flex items-center justify-between gap-4 h-16 px-4 sm:px-6 lg:px-8 shadow-sm">
        <div class="flex items-center no-auto-pos">
          <MenuOpenButton
            :toggle="state.toggleIsNavOpen"
            :is-menu-open="state.isNavOpen"
          />
          <img
            :src="bigNames.mainLogPath"
            class="w-10 h-10"
          />
        </div>
        <span class="font-bold text-2xl md:text-xl capitalize text-T1TextColor dark:text-darkT1TextColor">{{ state.routeName }}</span>

        <LoginButton :is-signed-in="false" />
      </div>
    </div>
  </nav>
  <div class="dark:bg-darkMainBg w-full">
    <div class="pt-16 max-w-7xl mx-auto">
      <!-- Add a test gradient background -->
      <slot></slot>
    </div>
  </div>
  <CustomTransitions :variant="'drop-down'">
    <div
      v-if="state.isNavOpen"
      class="fixed flex flex-col w-full md:max-w-96 md:w-3/12 backdrop-blur-sm bg-mainBg/80 dark:bg-darkMainBg/80 px-4 py-3 space-y-1 z-20 left-0 top-16 min-h-[calc(100vh-64px)] shadow-lg ease-in backdrop-saturate-150"
      @click.self="() => state.toggleIsNavOpen()"
    >
      <NavigationalLinks />
    </div>
  </CustomTransitions>
  <div
    v-if="state.isNavOpen"
    :class="`pr-2 pb-3 space-y-1 fixed  z-10 left-0 top-16 w-full min-h-[calc(100vh-64px)]  shadow-lg ease-in bg-mainBg/[0.05] dark:bg-darkMainBg/[0.05]   backdrop-blur-sm backdrop-saturate-50
              flex `"
    @click.self="() => state.toggleIsNavOpen()"
  ></div>
</template>

<script setup lang="ts">
const state = useGlobalSettingStore();

import LoginButton from "./loginButton.vue";
import { useGlobalSettingStore } from "~/store/globalSetting";
import { bigNames } from "../mainFrame";
</script>
