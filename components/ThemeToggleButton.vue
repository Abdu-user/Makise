<template>
  <div class="flex ps-3 pe-2 justify-between">
    {{ text }}
    <CustomContainer
      :variant="'ReverseUIContainer'"
      class="p-[2px] flex flex-row"
    >
      <CustomButton
        :variant="state.themeMode === 'light' ? 'active' : 'text'"
        :is-primary-color="'theme'"
        :name="'material-symbols:light-mode'"
        :icon="true"
        :icon-position="'right'"
        size="sm"
        class="w-6 h-6"
        @click="setTheme('light')"
      />
      <CustomButton
        :variant="state.themeMode === 'dark' ? 'active' : 'text'"
        :is-primary-color="'theme'"
        :name="'material-symbols:dark-mode'"
        :icon="true"
        :icon-position="'right'"
        size="sm"
        class="w-6 h-6"
        @click="setTheme('dark')"
      />
      <CustomButton
        :variant="state.themeMode === 'auto' ? 'active' : 'text'"
        :is-primary-color="'theme'"
        :name="'material-symbols:computer-outline-rounded'"
        :icon="true"
        :icon-position="'right'"
        size="sm"
        class="w-6 h-6"
        @click="((state.themeMode = 'auto'), state.setThemeMode('auto'), state.getPreferenceData())"
      />
    </CustomContainer>
  </div>
</template>

<script setup lang="ts">
import { useGlobalSettingStore } from "~/store/globalSetting";
const state = useGlobalSettingStore();
defineProps<{ text?: string }>();

const themeMode = ref("auto");

const setTheme = (theme: "dark" | "light") => {
  themeMode.value = theme;
  state.setThemeMode(theme);
};
</script>
