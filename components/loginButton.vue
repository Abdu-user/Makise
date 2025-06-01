<template>
  <div class="flex items-center justify-center h-12 w-12 overflow-hidden rounded-full">
    <Icon
      v-if="state.loading"
      name="material-symbols-light:forward-circle"
      class="w-full h-full animate-spin"
    />
    <template v-else>
      <NuxtLink
        v-if="!state.user"
        to="/sign-in"
        @click="setRoutePath"
        class="flex items-center justify-center border border-primary bg-accent hover:bg-active/5 w-[90%] h-[90%] hover:text-secondary text-textHeader font-semibold rounded-full"
        >Login</NuxtLink
      >
      <template v-else>
        <NuxtLink
          to="/profile"
          class="w-full h-full flex"
        >
          <img
            v-if="image"
            class="w-full h-full object-cover"
            :src="image"
          />
          <Icon
            v-else
            name="material-symbols-light:account-circle-outline"
            class="w-full h-full text-primary"
          />
        </NuxtLink>
      </template>
    </template>
  </div>
</template>

<script setup lang="ts">
import { useGlobalSettingStore } from "~/store/globalSetting";
const state = useGlobalSettingStore();
const image = computed(() => {
  return state.userData?.profileImage;
});
const route = useRoute();

const setRoutePath = () => {
  console.log(route.path);
  state.setFromPage(route.path);
};
</script>

<style scoped></style>
