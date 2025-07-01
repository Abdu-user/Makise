<template>
  <div
    class="mt-8 flex gap-5 relative overflow-auto md:after:content-[''] md:after:block md:after:absolute md:after:bottom-[0px] md:after:left-0 md:after:w-full md:after:h-[2px] z-10"
    :class="state.newColors ? 'md:after:bg-border-muted' : 'md:after:bg-gray-300'"
  >
    <CustomNuxtLink
      variant="underline"
      v-for="route in normalizedRoutes"
      :to="route.path"
      :key="route.name"
      class="capitalize"
      :class="state.newColors ? 'text-text-muted hover:text-text' : 'text-T3TextColor dark:text-darkT3TextColor'"
    >
      {{ route.name }}
    </CustomNuxtLink>
  </div>
</template>

<script setup lang="ts">
import { ProfileRoutes } from "~/mainFrame";
import { useGlobalSettingStore } from "~/store/globalSetting";
const state = useGlobalSettingStore();

const normalizedRoutes = computed(() =>
  ProfileRoutes.map((route, i) => {
    return {
      path: "/profile/" + (i === 0 ? "" : route.toLowerCase()),
      name: route,
    };
  })
);
</script>
