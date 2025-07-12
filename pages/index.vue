<template>
  <CustomContainer
    :variant="'mainContainer'"
    class="h-[100dvh]"
  >
    <HomeNavigation />
    <div class="h-[100dvh]">
      <HomeFirstHero />
    </div>
  </CustomContainer>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";

import { useGlobalSettingStore } from "~/store/globalSetting";
const state = useGlobalSettingStore();
onMounted(() => state.setRouteName("home"));
</script>
