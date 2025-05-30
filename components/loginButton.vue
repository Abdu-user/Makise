<template>
  <div class="flex items-center justify-center h-12 w-12">
    <Icon
      v-if="state.loading"
      name="material-symbols-light:forward-circle"
      class="w-full h-full animate-spin"
    />
    <template v-else>
      <NuxtLink
        v-if="!state.user"
        to="/sign-in"
        class="flex items-center justify-center border border-primary bg-accent hover:bg-active/5 w-[90%] h-[90%] hover:text-secondary text-textHeader font-semibold rounded-full"
        >Login</NuxtLink
      >
      <template v-else>
        <NuxtLink
          to="/profile"
          class="//bg-blue-100 w-full h-full"
          v-auto-animate
        >
          <image
            v-if="image"
            class="rounded-full w-full h-full object-cover"
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
const image = ref(false);
import { useGlobalSettingStore } from "~/store/globalSetting";
const state = useGlobalSettingStore();
</script>

<style scoped></style>
