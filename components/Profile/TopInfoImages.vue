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
          :class="wideImgClass"
          loading="lazy"
        />
        <!-- Upload wide image button -->
        <label
          class="absolute top-3 right-3 md:top-5 md:right-10 cursor-pointer hover:bg-primary/10 border-[2px] p-[1px] border-primary/20 rounded-full flex"
        >
          <Icon
            name="material-symbols-light:photo-camera"
            class="text-primary/40 w-6 h-6"
          />
          <input
            type="file"
            accept="image/*"
            class="hidden"
            @change="uploadWideImage"
          />
        </label>

        <div>
          <!-- Profile Image -->

          <label
            class="absolute top-[60%] md:left-[15%] left-1/2 -translate-x-1/2 w-36 h-36 border-4 border-mainBg !p-0 overflow-hidden bg-mainBg rounded-full"
            :class="`${state.isEditingProfile ? 'cursor-pointer' : ''}`"
          >
            <input
              type="file"
              accept="image/*"
              class="hidden"
              @change="state.isEditingProfile && uploadProfileImage($event)"
            />
            <img
              :src="profileImgUrl"
              alt="Profile Image"
              class="w-full h-full object-cover"
            />
          </label>
        </div>
      </div>
      <!-- ToDO -->
      <!-- User Info Section -->
      <div class="relative flex max-md:flex-col mt-16 px-6 md:px-16 pb-12 justify-between gap-10">
        <template v-if="!state.isEditingProfile">
          <!-- Not Editing: Name + Job + Address -->
          <div class="max-md:mx-auto max-md:text-center">
            <p class="text-textHeader font-semibold text-xl">{{ cmpUserData.name || pl.name }} {{ cmpUserData.lastName || pl.lastName }}</p>
            <p class="text-text-Paragraph text-base">
              {{ cmpUserData.job || pl.job }}
            </p>
            <p class="text-textSecondary">
              {{ cmpUserData.address || pl.address }}
            </p>
          </div>
        </template>

        <template v-else>
          <!-- Editing: Name + Job + Address -->
          <div class="max-md:mx-auto max-md:text-center flex basis-1/4 flex-col">
            <div class="flex overflow-hidden max-md:gap-2">
              <CustomInput
                class="text-textHeader font-semibold text-xl max-md:text-right"
                v-model="nameRef"
                :placeholder="pl.name"
              />
              <CustomInput
                class="text-textHeader font-semibold text-xl"
                v-model="lastNameRef"
                :placeholder="pl.lastName"
              />
            </div>
            <CustomInput
              class="text-text-Paragraph text-base max-md:text-center max-md:mx-auto"
              v-model="jobRef"
              :placeholder="pl.job"
            />
            <CustomInput
              class="text-textSecondary bg-transparent max-md:text-center max-md:mx-auto"
              v-model="addressRef"
              :placeholder="pl.address"
            />
          </div>
        </template>

        <div class="flex basis-2/3 justify-between max-md:w-full">
          <!-- Contact Info -->
          <div>
            <div class="flex items-center gap-4">
              <Icon
                name="material-symbols-light:stacked-email-rounded"
                class="w-4 h-4"
              />
              <p class="text-textSecondary">{{ cmpUserData.email }}</p>
            </div>
            <div class="flex items-center gap-4">
              <Icon name="material-symbols-light:settings-phone-sharp" />
              <template v-if="!state.isEditingProfile">
                <p class="text-textSecondary">{{ cmpUserData.phoneNumber || pl.phoneNumber }}</p>
              </template>
              <template v-else>
                <CustomInput
                  class="text-textSecondary"
                  v-model="phoneNumberRef"
                  :placeholder="pl.phoneNumber"
                />
              </template>
            </div>
          </div>

          <!-- Profile Strength -->
          <div class="flex flex-col items-start">
            <div class="max-md:hidden">
              <p class="text-textSecondary flex justify-between">
                Profile Strength:
                <template v-if="state.isEditingProfile">
                  <CustomInput
                    class="font-semibold text-textParagraph max-w-10 text-xl text-center"
                    v-model="profileStrengthRef"
                    type="number"
                    :maxNumber="100"
                    :placeholder="pl.profileStrength"
                  />
                </template>
              </p>
              <LinearProggress
                class="w-52 mb-2"
                :percent="Number(state.isEditingProfile ? profileStrengthRef : cmpUserData.profileStrength || pl.profileStrength)"
                :show-percent="true"
                :startColor="colors.activeWeak"
                :stopColor="colors.activeStrong"
                percentColor="text-white"
              />
            </div>

            <!-- Mobile Profile Progress -->
            <div class="md:hidden relative">
              <p class="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-10">
                <template v-if="state.isEditingProfile">
                  <CustomInput
                    class="font-semibold text-textParagraph text-xl text-center"
                    v-model="profileStrengthRef"
                    type="number"
                    :maxNumber="100"
                    :min="0"
                    :placeholder="pl.profileStrength"
                  />
                </template>
                <template v-else>
                  <span class="font-semibold text-textParagraph text-xl"> {{ cmpUserData.profileStrength || pl.profileStrength }}% </span>
                </template>
                <span class="text-textSecondary text-sm -mt-2 inline-block">Realm</span>
              </p>
              <circle-progress
                :percent="Number(state.isEditingProfile ? profileStrengthRef : cmpUserData.profileStrength || pl.profileStrength)"
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
              />
            </div>
          </div>
        </div>

        <!-- Edit / Save / Cancel Buttons -->
        <div class="absolute z-10 -top-10 right-0">
          <ClientOnly>
            <CustomButton2
              v-if="!state.isEditingProfile"
              icon
              prepend-icon="material-symbols-light:edit-outline-sharp"
              variant="text"
              @click="state.toggleIsEditingProfile()"
            />
            <div
              v-else
              class="flex"
            >
              <CustomButton2
                icon
                prepend-icon="material-symbols-light:save"
                size="md"
                variant="text"
                @click="(state.toggleIsEditingProfile(), updateUser())"
              />
              <CustomButton2
                icon
                size="lg"
                prepend-icon="material-symbols-light:close"
                variant="text"
                @click="(state.toggleIsEditingProfile(), resetInputRefs())"
              />
            </div>
          </ClientOnly>
        </div>
      </div>
    </header>
  </div>
</template>
<script setup lang="ts">
/// @ts-ignore
import CircleProgress from "vue3-circle-progress";

import colors from "../../colors";
import { Client } from "appwrite";
import { useGlobalSettingStore } from "~/store/globalSetting";
const state = useGlobalSettingStore();

import { ref, watch, computed } from "vue";
import CustomInput from "../CustomInput.vue";
import type { UserProfileType } from "~/types/type";
import { profileInputPlaceholders } from "~/mainFrame";
import { refreshUserData } from "~/composables/useSignUp";
const pl = computed(() => profileInputPlaceholders);
const cmpUserData = computed(() => ({
  name: state.userData?.name || "",
  lastName: state.userData?.lastName || "",
  job: state.userData?.job || "",
  address: state.userData?.address || "",
  email: state.userData?.email || "",
  phoneNumber: state.userData?.phoneNumber || "",
  profileStrength: state.userData?.profileStrength ? String(state.userData?.profileStrength) : "0",
  profileImgUrl: state.userData?.profileImage || "/placeholder-avatar.jpg",
  wideImgUrl: state.userData?.wideProfileImage || "/wide_angle_tetons.jpg",
  wideImageLocationSettingsJSON: state.userData?.wideImageLocationSettingsJSON || "",
}));
watch(cmpUserData, () => {
  resetInputRefs();
  wideImgUrl.value = cmpUserData.value.wideImgUrl;
});

const wideImgClass = ref();

const wideImgUrl = ref(cmpUserData.value.wideImgUrl);
const wideImgFile = ref<File | null>(null);

const profileImgFile = ref<File | null>(null);
const profileImgUrl = ref(cmpUserData.value.profileImgUrl);

const nameRef = ref(cmpUserData.value.name);
const lastNameRef = ref(cmpUserData.value.lastName);
const jobRef = ref(cmpUserData.value.job);
const addressRef = ref(cmpUserData.value.address);
const phoneNumberRef = ref(cmpUserData.value.phoneNumber);
const profileStrengthRef = ref(cmpUserData.value.profileStrength);

function resetInputRefs() {
  nameRef.value = cmpUserData.value.name;
  lastNameRef.value = cmpUserData.value.lastName;
  jobRef.value = cmpUserData.value.job;
  addressRef.value = cmpUserData.value.address;
  phoneNumberRef.value = cmpUserData.value.phoneNumber;
  profileStrengthRef.value = cmpUserData.value.profileStrength;
  profileImgUrl.value = cmpUserData.value.profileImgUrl;
}

function getWideImgClass() {
  cmpUserData.value.wideImageLocationSettingsJSON;
  // TODO:
  // TODO:
  // TODO:
  // TODO:
  // TODO: Add wideImgClass
  // TODO:
  // TODO:
  return "object-top";
}

async function updateUser() {
  if (state.user?.$id) {
    try {
      const res = await useAppwriteDocumentUpdate(state.user.$id, {
        name: nameRef.value,
        lastName: lastNameRef.value,
        job: jobRef.value,
        address: addressRef.value,
        phoneNumber: phoneNumberRef.value,
        profileStrength: Number(profileStrengthRef.value),
      });
      state.setUserData(res as unknown as UserProfileType);
      if (!profileImgFile.value) throw "image profileImgFile doesn't exist. when tring to upload to Appwrite";

      const imgUrl = await uploadFileToAppwrite(profileImgFile.value);
      const res3 = (await useAppwriteDocumentGet(state.user.$id)) as unknown as UserProfileType;
      const data = res3.profileImage
        ? { profileImage: imgUrl, previousProfileImageUrls: [...(res3.previousProfileImageUrls || []), imgUrl] }
        : { profileImage: imgUrl };

      await useAppwriteDocumentUpdate(state.user.$id, data);
      await refreshUserData();
    } catch (error) {
      console.error(error);
    }
  }
}

function uploadProfileImage(event: Event) {
  const input = event.target as HTMLInputElement;
  const inputFile = input.files?.[0];

  if (!inputFile) return;

  // ✅ 1. Read the image as a preview (for browser)
  const reader = new FileReader();
  reader.onload = () => {
    profileImgUrl.value = reader.result as string; // This is a base64 data URL
  };
  reader.readAsDataURL(inputFile);

  profileImgFile.value = inputFile;
}
async function uploadWideImage(event: Event) {
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0];
  if (!file) return;
  const state = useGlobalSettingStore();
  if (!state.user?.$id) throw "state.user us undefined";
  wideImgFile.value = file;

  const reader = new FileReader();
  reader.onload = () => {
    wideImgUrl.value = reader.result as string; // Base64 preview
  };
  reader.readAsDataURL(file);

  const uploadedWideImgUrl = await uploadFileToAppwrite(wideImgFile.value);

  await useAppwriteDocumentUpdate(state.user.$id, { wideProfileImage: uploadedWideImgUrl });
  refreshUserData();
}
</script>
