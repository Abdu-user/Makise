<template>
  <div class="flex ps-3 pe-2 justify-between">
    Theme
    <CustomContainer
      :variant="'ReverseUIContainer'"
      class="p-[2px]"
    >
      <CustomButton
        :variant="themeMode === 'light' ? 'active' : 'text'"
        :is-primary-color="'theme'"
        :name="'material-symbols:light-mode'"
        :icon="true"
        :icon-position="'right'"
        size="sm"
        class="w-6 h-6"
        @click="toggleTheme('light')"
      />
      <CustomButton
        :variant="themeMode === 'dark' ? 'active' : 'text'"
        :is-primary-color="'theme'"
        :name="'material-symbols:dark-mode'"
        :icon="true"
        :icon-position="'right'"
        size="sm"
        class="w-6 h-6"
        @click="toggleTheme('dark')"
      />
      <CustomButton
        :variant="themeMode === 'auto' ? 'active' : 'text'"
        :is-primary-color="'theme'"
        :name="'material-symbols:computer-outline-rounded'"
        :icon="true"
        :icon-position="'right'"
        size="sm"
        class="w-6 h-6"
        @click="(themeMode = 'auto') && state.getPreferenceData()"
      />
    </CustomContainer>
  </div>
</template>

<script setup lang="ts">
import { useGlobalSettingStore } from "~/store/globalSetting";
const state = useGlobalSettingStore();

const themeMode = ref("auto");

const toggleTheme = (theme: "dark" | "light") => {
  document.documentElement.classList.remove(theme === "dark" ? "dark" : "light");
  document.documentElement.classList.toggle("dark", theme === "dark");
  localStorage.setItem("theme", theme === "dark" ? "dark" : "light");
  themeMode.value = theme;
};
</script>
