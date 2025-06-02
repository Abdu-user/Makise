<template>
  <!-- <MainLayout> -->
  <ProfileTopInfoImages />
  <ProfileNavLinks />
  <slot />
  <!-- </MainLayout> -->
</template>
<script lang="ts" setup>
// import MainLayout from "./main.vue"; // or '~/layouts/main.vue'

import { useGlobalSettingStore } from "~/store/globalSetting";

const state = useGlobalSettingStore();
state.setRouteName("My Profile");
useHead({
  title: "Profile",
  meta: [{ name: "description", content: "User profile page for authenticated users." }],
});
</script>
