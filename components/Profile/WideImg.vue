<template>
  <img
    :src="wideImgUrl"
    alt="Profile wide image"
    class="w-full h-60 object-cover"
    :style="wideImgStyle"
    loading="lazy"
  />

  <!-- Upload Button -->
  <label
    class="absolute top-3 right-3 md:top-5 md:right-10 cursor-pointer hover:bg-primary/10 border-2 p-1 border-primary/20 rounded-full flex"
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

  <!-- Image Position Controls -->
  <select
    id="wideImgLocationSelect"
    class="absolute top-14 right-3 md:top-15 md:right-10 cursor-pointer hover:bg-primary/10 border-2 border-primary/20 rounded-full w-9 h-9 focus:border-primary/20"
    v-model="selectedImgPosition"
  >
    <option
      v-for="position in positionOptions"
      :key="position"
      :value="position"
      class="capitalize"
    >
      {{ position }}
    </option>
  </select>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useGlobalSettingStore } from "~/store/globalSetting";
import type { ImgLocation, WideImageLocationSettingsType } from "~/types/type";

const state = useGlobalSettingStore();

const wideImgStyle = ref("");
const selectedImgPosition = ref<ImgLocation>("center");
const imgPositionSettings = ref<Partial<WideImageLocationSettingsType>>({});
const wideImgUrl = ref(state.userData?.wideProfileImage || "/images/wide_angle_tetons.jpg");
const wideImgFile = ref<File | null>(null);

const positionOptions: ImgLocation[] = ["top", "center", "bottom", "left", "left-top", "left-bottom", "right", "right-top", "right-bottom"];

function updateImgStyle(position: ImgLocation) {
  wideImgStyle.value = `object-position: ${position}`;
}

function resetImgPosition() {
  if (!state.userData?.wideImageLocationSettingsJSON) return;

  imgPositionSettings.value = JSON.parse(state.userData.wideImageLocationSettingsJSON) as WideImageLocationSettingsType;
  const defaultPosition = imgPositionSettings.value.wideImage || "center";
  selectedImgPosition.value = defaultPosition;
  updateImgStyle(defaultPosition);
}

watch(selectedImgPosition, (newVal) => {
  updateImgStyle(newVal);

  const updatedSettings = {
    ...(JSON.parse(state.userData?.wideImageLocationSettingsJSON || "{}") as WideImageLocationSettingsType),
    wideImage: newVal,
  };

  state.user?.$id &&
    useAppwriteDocumentUpdate(state.user.$id, {
      wideImageLocationSettingsJSON: JSON.stringify(updatedSettings),
    });
});

watch([() => state.userData?.wideProfileImage, () => state.userData?.wideImageLocationSettingsJSON], refreshValues);
onMounted(refreshValues);
function refreshValues() {
  wideImgUrl.value = state.userData?.wideProfileImage || "/images/wide_angle_tetons.jpg";
  resetImgPosition();
}
async function uploadWideImage(event: Event) {
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0];
  if (!file) return;

  if (!state.user?.$id) throw "User is undefined";

  wideImgFile.value = file;

  const reader = new FileReader();
  reader.onload = () => {
    wideImgUrl.value = reader.result as string;
  };
  reader.readAsDataURL(file);

  const uploadedUrl = await uploadFileToAppwrite(wideImgFile.value);
  await useAppwriteDocumentUpdate(state.user.$id, { wideProfileImage: uploadedUrl });
  refreshUserData();
}
</script>
