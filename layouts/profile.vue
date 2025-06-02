<template>
  <MainLayout>
    <ProfileTopInfoImages class="mt-3 md:mt-6" />
    <ProfileNavLinks />
    <slot />
  </MainLayout>
</template>
<script lang="ts" setup>
import { useGlobalSettingStore } from "~/store/globalSetting";

const state = useGlobalSettingStore();
state.setRouteName("My Profile");
useHead({
  title: "Profile",
  meta: [{ name: "description", content: "User profile page for authenticated users." }],
});
</script>
