<template>
  <div>
    <!-- <NuxtRouteAnnouncer />
    <NuxtWelcome /> -->

    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <DebugControl />
  </div>
</template>
<script setup lang="ts">
import { useRouter } from "vue-router";
import { useGlobalSettingStore } from "./store/globalSetting";
import { useAsyncFunction } from "./composables/useAsyncFunction";
import type { UserProfileType } from "./types/type";
import { getUser, refreshUserData } from "./composables/useSignUp";

const router = useRouter();
useHead({
  title: "Makise",
});

const state = useGlobalSettingStore();
onMounted(async () => {
  await state.initialize();
  getUser();
  quickCheck();
});

async function quickCheck() {}
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
}
</style>
