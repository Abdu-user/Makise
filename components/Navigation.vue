<template>
  <nav class="bg-mainBg text-textHeader fixed top-0 left-0 w-full z-50">
    <div class="max-w-7xl mx-auto">
      <div class="relative flex items-center justify-between gap-4 h-16 px-4 sm:px-6 lg:px-8 shadow-sm">
        <div class="flex items-center no-auto-pos">
          <div class="rounded-full w-10 h-10">
            <button
              @click="state.toggleIsNavOpen"
              class="w-full h-full flex items-center justify-center"
            >
              <Icon
                :name="state.isNavOpen ? 'heroicons-outline:x' : 'heroicons-outline:menu'"
                class="w-7 h-7 text-primary"
              />
            </button>
          </div>
          <div>
            <Transition
              enter-active-class="transition-all duration-300 ease-in-out"
              enter-from-class="opacity-0 -translate-y-10"
              enter-to-class="opacity-100 translate-y-0"
              leave-active-class="transition-all duration-300 ease-in-out"
              leave-from-class="opacity-100 translate-y-0"
              leave-to-class="opacity-0 -translate-y-10 pointer-events-none "
            >
              <div
                v-show="state.isNavOpen"
                :class="`pr-2 pb-3 space-y-1 absolute left-0 top-16 w-full min-h-[calc(100vh-64px)]  shadow-lg ease-in
                flex `"
                @click.self="state.toggleIsNavOpen"
              >
                <div
                  class="flex flex-col w-full md:max-w-96 md:w-3/12 backdrop-blur-sm bg-mainBg/80"
                  @click.self="state.toggleIsNavOpen"
                >
                  <CustomNuxtLink
                    v-for="link in navLinks"
                    :key="link.name"
                    :to="link.name === 'home' ? '/' : `/${link.name.toLowerCase()}`"
                    variant="full"
                    v-slot="{ isActive }"
                  >
                    <Icon :name="link.icon" /> {{ capitalize(link.name) }}
                    <Icon
                      v-if="isActive"
                      :name="'heroicons-outline:chevron-right'"
                      class="ml-auto"
                    />
                  </CustomNuxtLink>
                </div>
              </div>
            </Transition>
          </div>
        </div>
        <span class="font-bold text-xl capitalize">{{ state.routeName }}</span>

        <LoginButton :is-signed-in="false" />
      </div>
    </div>
  </nav>
  <div class="pt-10 max-w-7xl mx-auto">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { capitalize } from "../utils";
import { ref } from "vue";
const state = useGlobalSettingStore();

import { navLinks } from "../mainFrame";
import LoginButton from "./loginButton.vue";
import { useGlobalSettingStore } from "~/store/globalSetting.js";
</script>
