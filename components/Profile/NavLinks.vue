<template>
  <div
    class="mt-8 flex gap-5 relative overflow-auto md:after:content-[''] md:after:block md:after:absolute md:after:bottom-[0px] md:after:left-0 md:after:w-full md:after:h-[2px] z-10"
    style="scrollbar-width: thin; scrollbar-color: var(--border) transparent; -ms-overflow-style: none; overflow-x: auto"
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
      {{ $t(`profileNavLinks.${route.name.toLowerCase()}`) }}
    </CustomNuxtLink>
  </div>
</template>

<script setup lang="ts">
import { ProfileRoutes } from "~/constants";
import { useGlobalSettingStore } from "~/store/globalSetting";
import { useI18n } from "vue-i18n"; // Import useI18n

const state = useGlobalSettingStore();
const { t } = useI18n(); // Initialize t for translations

const normalizedRoutes = computed(() =>
  ProfileRoutes.map((route, i) => {
    return {
      path: "/profile/" + (i === 0 ? "" : route.toLowerCase()),
      name: route, // Keep original name for key, but use it for translation lookup
    };
  })
);
</script>

<style scoped></style>
