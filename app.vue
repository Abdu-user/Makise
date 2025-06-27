<template>
  <div>
    <!-- <NuxtRouteAnnouncer />
    <NuxtWelcome /> -->
    <!-- <div class="text-textWhite"></div> -->

    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <DebugControl v-if="inDev" />
  </div>
</template>
<script setup lang="ts">
import { useGlobalSettingStore } from "./store/globalSetting";
import { getUser, refreshUserData } from "./composables/useSignUp";

useHead({
  title: "Makise",
});

const state = useGlobalSettingStore();
onMounted(async () => {
  await state.initialize();
  getUser();
  state.getPreferenceData();
});

const inDev = ref(false);
onMounted(() => {
  const { hostname } = window.location;
  const isLocalhost = hostname === "localhost" || hostname === "127.0.0.1";
  if (isLocalhost) inDev.value = true;
});
</script>
<style>
body {
  background-color: rgb(255, 244, 244);
}
* {
  /* box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1); */
  /* background: #fee1ea; */
  box-shadow: 0 0 0 0 #ffe4e7;
}
body {
  /* padding: 16px 0;
  height: 100vh; */
  border-color: #848484;
}
</style>
