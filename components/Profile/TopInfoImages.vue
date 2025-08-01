<template>
  <CustomContainer
    :variant="'UIContainer'"
    class="shadow-md mt-2 mx-4"
    :class="state.newColors ? 'bg-bg' : 'bg-mainBg dark:bg-darkMainT2Bg'"
  >
    <header class="flex flex-col">
      <!-- Images section -->
      <div class="w-full relative px-6 h-60 md:h-72 lg:h-96">
        <!-- Wide Image -->
        <ProfileWideImg />

        <!-- Profile Image -->

        <label
          class="absolute -translate-y-3/4 md:left-[15%] left-1/2 -translate-x-1/2 w-36 h-36 border-4 border-mainBg !p-0 overflow-hidden bg-mainBg rounded-full"
          :class="`${state.isEditingProfile ? 'cursor-pointer' : ''}`"
        >
          <input
            v-if="state.isEditingProfile"
            type="file"
            accept="image/*"
            class="hidden"
            @change="state.isEditingProfile && uploadProfileImage($event)"
          />
          <CustomImg
            :src="profileImgUrl || state.userData?.profileImage || ''"
            :defaultImgSrc="'/images/placeholder-avatar.jpg'"
            alt="Profile Image"
            class="w-full h-full object-cover"
          />
        </label>
      </div>
      <!-- ToDO todo is used just to highlight this section -->
      <!-- User Info Section -->
      <div
        :class="`relative grid md:grid-cols-3 max-md:grid-rows-2 max-md:grid-cols-2
      mt-16 px-6 md:px-16 pb-12 justify-center md:gap-10
        max-md:text-xl
      `"
      >
        <template v-if="!state.isEditingProfile">
          <!-- Not Editing: Name + Username + Address -->
          <div class="max-md:mx-auto max-md:text-center max-md:col-span-2">
            <CustomParagraph :variant="'edit'">{{ cmpUserData.name || pl.name }} {{ cmpUserData.lastName || pl.lastName }}</CustomParagraph>
            <CustomParagraph
              @click="copyUsername"
              ref="usernameRef"
              :variant="'editSecondary'"
            >
              @{{ cmpUserData.username || pl.username }}
            </CustomParagraph>
            <CustomParagraph :variant="'editSecondary'">
              {{ cmpUserData.address || pl.address }}
            </CustomParagraph>
          </div>
        </template>

        <template v-else>
          <!-- Editing: Name + Job + Address -->
          <div class="max-md:mx-auto max-md:text-center flex basis-1/4 flex-col max-md:col-span-2">
            <div class="flex overflow-hidden max-md:gap-2">
              <CustomInput
                variant="edit"
                v-model="nameRef"
                :placeholder="pl.name"
              />
              <CustomInput
                variant="edit"
                v-model="lastNameRef"
                :placeholder="pl.lastName"
              />
            </div>
            <CustomInput
              variant="edit"
              class="text-text-Paragraph text-base max-md:text-center max-md:mx-auto"
              v-model="username"
              :placeholder="pl.username"
            />
            <CustomInput
              variant="edit"
              class="text-textSecondary bg-transparent max-md:text-center max-md:mx-auto"
              v-model="addressRef"
              :placeholder="pl.address"
            />
          </div>
        </template>

        <!-- <div class="flex basis-2/3 justify-between max-md:w-full"> -->
        <!-- Contact Info -->
        <div class="max-md:mt-3">
          <div class="grid grid-flow-col justify-start items-center gap-4">
            <CustomIcon name="material-symbols-light:stacked-email-rounded" />
            <CustomParagraph
              :variant="'editSecondary'"
              class="break-all w-full"
              >{{ cmpUserData.email }}</CustomParagraph
            >
          </div>
          <div class="grid grid-flow-col justify-start items-center gap-4">
            <CustomIcon name="material-symbols-light:settings-phone-sharp" />
            <template v-if="!state.isEditingProfile">
              <CustomParagraph :variant="'editSecondary'">{{ cmpUserData.phoneNumber || pl.phoneNumber }}</CustomParagraph>
            </template>
            <template v-else>
              <CustomInput
                variant="edit"
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
            <CustomParagraph
              :variant="'editSecondary'"
              class="text-textSecondary flex justify-between"
            >
              Profile Strength:
              <template v-if="state.isEditingProfile">
                <CustomInput
                  variant="edit"
                  class="font-semibold text-textParagraph max-w-10 text-xl text-center"
                  v-model="profileStrengthRef"
                  type="number"
                  :maxNumber="100"
                  :placeholder="pl.profileStrength"
                />
              </template>
            </CustomParagraph>
            <LinearProgress
              class="w-52 mb-2"
              :percent="Number(state.isEditingProfile ? profileStrengthRef : cmpUserData.profileStrength || pl.profileStrength)"
              :show-percent="true"
              :startColor="colors.activeWeak"
              :stopColor="colors.activeStrong"
            />
          </div>

          <!-- Mobile Profile Progress -->
          <div class="md:hidden relative ml-auto">
            <CustomParagraph
              :variant="'editSecondary'"
              class="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-10"
            >
              <template v-if="state.isEditingProfile">
                <CustomInput
                  variant="edit"
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
              <span class="text-textSecondary text-sm -mt-2 inline-block"></span>
            </CustomParagraph>
            <ClientOnly>
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
              >
                <!-- https://www.npmjs.com/package/vue3-circle-progress -->
              </circle-progress>
            </ClientOnly>
          </div>
        </div>
        <!-- </div> -->

        <!-- Edit / Save / Cancel Buttons -->
        <EditButtons
          class="absolute z-10 -top-10 right-5"
          :is-editing="state.isEditingProfile"
          @toggle="state.toggleIsEditingProfile"
          @cancel="resetInputRefs"
          @save="updateUser"
        >
        </EditButtons>
      </div>
    </header>
  </CustomContainer>
</template>
<script setup lang="ts">
/// @ts-ignore
import CircleProgress from "vue3-circle-progress";

import colors from "../../colors";
import { useGlobalSettingStore } from "~/store/globalSetting";
const state = useGlobalSettingStore();

import { ref, watch, computed } from "vue";
import type { UserProfileType } from "~/types/type";
import { profileInputPlaceholders } from "~/constants";
import { refreshUserData } from "~/composables/useSignUp";

const pl = computed(() => profileInputPlaceholders); // pl means placeholder-text
const cmpUserData = computed((): UserProfileType & { profileImgUrl: string } => ({
  name: state.userData?.name || "",
  lastName: state.userData?.lastName || "",
  username: state.userData?.username || "",
  address: state.userData?.address || "",
  email: state.userData?.email || "",
  phoneNumber: state.userData?.phoneNumber || "",
  profileStrength: state.userData?.profileStrength ? state.userData?.profileStrength : 0,
  profileImgUrl: "/images/placeholder-avatar.jpg",
}));

watch(cmpUserData, () => {
  resetInputRefs();
});

onMounted(async () => {
  if (!state.user || !state.userData) await getUser();
});

const usernameRef = ref<{ paragraphRef: HTMLParagraphElement } | null>(null);
function copyUsername(e: Event) {
  e.preventDefault();

  const paragraph = usernameRef.value?.paragraphRef;
  if (!paragraph?.textContent) {
    state.setFeedback("error", "Username is empty");
    return;
  }

  navigator.clipboard.writeText(paragraph.textContent);
  state.setFeedback("success", "Username copied to clipboard");
}

const profileImgFile = ref<File | null>(null);
const profileImgUrl = ref<string>("");

const nameRef = ref(cmpUserData.value.name);
const lastNameRef = ref(cmpUserData.value.lastName);
const username = ref(cmpUserData.value.username);
const addressRef = ref(cmpUserData.value.address);
const phoneNumberRef = ref(cmpUserData.value.phoneNumber);
const profileStrengthRef = ref(cmpUserData.value.profileStrength);

function resetInputRefs() {
  nameRef.value = cmpUserData.value.name;
  lastNameRef.value = cmpUserData.value.lastName;
  username.value = cmpUserData.value.username;
  addressRef.value = cmpUserData.value.address;
  phoneNumberRef.value = cmpUserData.value.phoneNumber;
  profileStrengthRef.value = cmpUserData.value.profileStrength;
  profileImgUrl.value = "";
}

async function updateUser() {
  if (state.user?.$id) {
    try {
      const res = await useAppwriteDocumentUpdate(state.user.$id, {
        name: nameRef.value,
        lastName: lastNameRef.value,
        username: username.value,
        address: addressRef.value,
        phoneNumber: phoneNumberRef.value,
        profileStrength: Number(profileStrengthRef.value),
      });
      console.log(res);
      if (!res.ok) throw res.text();
      const userData = await res.json();
      console.log(userData);
      state.setUserData(userData as unknown as UserProfileType);
      state.setFeedback("success", "Profile data has been updated successfully");
      if (!profileImgFile.value) return "image profileImgFile doesn't exist. when string to upload to Appwrite";

      const imgUrl = await uploadFileToAppwrite(profileImgFile.value);
      const res3 = (await useAppwriteDocumentGet(state.user.$id)) as unknown as UserProfileType;
      const data = res3.profileImage
        ? { profileImage: imgUrl, previousProfileImageUrls: [...(res3.previousProfileImageUrls || []), imgUrl] }
        : { profileImage: imgUrl };

      await useAppwriteDocumentUpdate(state.user.$id, data);
      await refreshUserData();
      state.setFeedback("success", "Profile img and data has been updated successfully");
    } catch (error: any) {
      const parsedError = JSON.parse(await error);
      console.error(parsedError);
      state.setFeedback("error", `Failed to update profile, ${parsedError.message}`, 10000);
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
</script>
