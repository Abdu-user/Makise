<template>
  <CustomContainer
    :variant="'mainContainer'"
    :class="`min-h-screen max-h-screen overflow-auto
      md:grid max-md:flex max-md:flex-col  md:grid-cols-2  items-center 
      p-4 gap-8 `"
  >
    <SignUpAdditionalInfo class="max-md:order-2" />
    <slot></slot>
  </CustomContainer>
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
