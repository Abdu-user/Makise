<template>
  <div class="mt-8 mx-4 flex gap-5 md:border-b-2 md:border-b-gray-300 overflow-auto">
    <CustomNuxtLink
      variant="underline"
      v-for="route in normalizedRoutes"
      :to="route.path"
      :key="route.name"
      class="capitalize"
    >
      {{ route.name }}
    </CustomNuxtLink>
  </div>
</template>

<script setup lang="ts">
import { ProfileRoutes } from "~/mainFrame";

const normalizedRoutes = computed(() =>
  ProfileRoutes.map((route, i) => {
    return {
      path: "/profile/" + (i === 0 ? "" : route.toLowerCase()),
      name: route,
    };
  })
);
</script>
