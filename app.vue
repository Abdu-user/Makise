<template>
  <div>
    <!-- <NuxtRouteAnnouncer />
    <NuxtWelcome /> -->
    <DebugControl />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
<script setup lang="ts">
import { useRouter } from "vue-router";
import { useGlobalSettingStore } from "./store/globalSetting";
import { useAsyncFunction } from "./composables/useAsyncFunction";
import type { UserProfileType } from "./types/type";
import { refreshUserData } from "./composables/useSignUp";

const router = useRouter();

const state = useGlobalSettingStore();
onMounted(async () => {
  state.loadSettings();
  getUser();
  quickCheck();
});

async function getUser() {
  const { current } = useAuth();

  const { value: user, cb } = useAsyncFunction(current, state._loading, state._error, false);

  await cb();
  await refreshUserData();
}
async function quickCheck() {
  console.log(state.userData);
}
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
</style>
