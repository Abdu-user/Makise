<template>
  <div class="bg-mainBg shadow-md mt-3 md:mt-6">
    <header class="flex flex-col">
      <!-- Images section -->
      <div class="w-full relative">
        <!-- Wide Image -->
        <img
          :src="wideImgUrl"
          alt=""
          class="w-full h-60 object-cover"
          loading="lazy"
        />
        <div>
          <!-- Profile Image -->
          <img
            :src="profileImgUrl"
            alt=""
            class="absolute top-[60%] md:left-[15%] left-1/2 -translate-x-1/2 w-36 h-36 rounded-full border-4 border-mainBg"
          />
        </div>
        <!-- Upload wide image button -->
        <div class="absolute top-3 right-3 md:top-5 md:right-10">
          <button class="hover:bg-activeWeak/50 border-[2px] p-[1px] border-mainBg rounded-full flex">
            <Icon
              name="material-symbols-light:photo-camera"
              class="text-mainBg w-6 h-6"
            />
          </button>
        </div>
      </div>
      <!-- User Info Section -->
      <div class="relative flex max-md:flex-col mt-16 px-6 md:px-16 pb-12 justify-between gap-10">
        <!-- name -->
        <div class="max-md:mx-auto max-md:text-center">
          <p class="text-textHeader font-semibold text-xl">Kumaran selvarn</p>
          <p class="text-text-Paragraph text-base">UI/UX Designer</p>
          <p class="text-textSecondary">Some random words</p>
        </div>

        <div class="flex basis-2/3 justify-between max-md:w-full">
          <!-- contact -->
          <div>
            <div class="flex items-center gap-4">
              <Icon
                name="material-symbols-light:stacked-email-rounded"
                class="w-4 h-4"
              />
              <p class="text-textSecondary">random.email@example.com</p>
            </div>
            <div class="flex items-center gap-4">
              <Icon name="material-symbols-light:settings-phone-sharp" />
              <p class="text-textSecondary">(123) 456-7890</p>
            </div>
          </div>
          <!-- Proggress -->
          <div class="flex flex-col items-start">
            <div class="max-md:hidden">
              <p class="text-textSecondary">Profile Strength</p>
              <div>
                <LinearProggress
                  class="w-52 mb-2"
                  :percent="70"
                  :show-percent="true"
                  :startColor="colors.activeWeak"
                  :stopColor="colors.activeStrong"
                  percentColor="text-white"
                />
              </div>
            </div>
            <!-- mobile proggress -->
            <div class="md:hidden relative">
              <p class="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
                <span class="font-semibold text-textParagraph text-xl">{{ proggressPercentage }}%</span><br />
                <span class="text-textSecondary text-sm -mt-2 inline-block">Realm</span>
              </p>
              <circle-progress
                :percent="proggressPercentage"
                :viewport="true"
                :size="90"
                :border-width="8"
                :border-bg-width="8"
                :is-gradient="true"
                :gradient="{
                  angle: 90,
                  startColor: colors.activeWeak || '',
                  stopColor: colors.activeStrong || '',
                }"
              >
                <!--CircleProgress DOC: https://www.npmjs.com/package/vue3-circle-progress -->
              </circle-progress>
            </div>
          </div>
        </div>
        <!-- Edit Button -->
        <div class="absolute z-10 -top-10 right-0"></div>
      </div>
    </header>
  </div>
</template>
<script setup lang="ts">
const proggressPercentage = 80;
/// @ts-ignore
import CircleProgress from "vue3-circle-progress";
const wideImgUrl = "/wide_angle_tetons.jpg";
const profileImgUrl = "/placeholder-avatar.jpg";
import colors from "../../colors";
import { Client } from "appwrite";
import { useGlobalSettingStore } from "~/store/globalSetting";
</script>
