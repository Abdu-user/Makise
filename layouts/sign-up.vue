<template>
  <CustomContainer
    :variant="'mainContainer'"
    :class="`min-h-screen max-h-screen overflow-auto
       items-center  justify-center
      p-4 gap-8 `"
  >
    <slot></slot>
    <!-- <SignUpAdditionalInfo class="max-md:order-2" /> -->
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
