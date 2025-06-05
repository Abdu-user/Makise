<template>
  <div class="grid gap-1">
    <CustomNuxtLink
      v-for="link in navLinks.main"
      :key="link.name"
      :to="link.name === 'home' ? '/' : `/${link.name.toLowerCase()}`"
      :variant="'navigation'"
      v-slot="{ isActive }"
    >
      <Icon :name="link.icon" /> {{ capitalize(link.name) }}
      <Icon
        v-if="isActive"
        :name="'heroicons-outline:chevron-right'"
        class="ml-auto"
      />
    </CustomNuxtLink>
    <h1 class="mt-4 mb-1 dark:text-darkT2TextColor uppercase">{{ navLinks.separator1 }}</h1>

    <CustomNuxtLink
      v-for="link in navLinks.docs"
      :key="link.name"
      :to="link.name === 'home' ? '/' : `/${link.name.toLowerCase()}`"
      :variant="'navigation'"
      v-slot="{ isActive }"
    >
      <Icon :name="link.icon" /> {{ capitalize(link.name) }}
      <Icon
        v-if="isActive"
        :name="'heroicons-outline:chevron-right'"
        class="ml-auto"
      />
    </CustomNuxtLink>
  </div>
</template>

<script setup lang="ts">
import { navLinks } from "../mainFrame";
</script>

<style scoped></style>
