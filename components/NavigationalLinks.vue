<template>
  <div class="grid gap-1">
    <CustomNuxtLink
      v-for="link in navLinks.main"
      :key="link.name"
      :to="link.name === 'home' ? '/' : `/${link.name.toLowerCase()}`"
      :variant="'navigation'"
      v-slot="{ isActive }"
    >
      <Icon :name="link.icon" /> {{ $t(`navLinks.${link.name}`) }}
      <Icon
        v-if="isActive"
        :name="'heroicons-outline:chevron-right'"
        class="ml-auto"
      />
    </CustomNuxtLink>
    <h1 class="mt-4 mb-1 dark:text-darkT2TextColor uppercase">{{ $t("navLinks.separator1") }}</h1>

    <CustomNuxtLink
      v-for="link in navLinks.docs"
      :key="link.name"
      :to="link.name === 'home' ? '/' : `/${link.name.toLowerCase()}`"
      :variant="'navigation'"
      v-slot="{ isActive }"
    >
      <Icon :name="link.icon" /> {{ $t(`navLinks.${link.name}`) }}
      <Icon
        v-if="isActive"
        :name="'heroicons-outline:chevron-right'"
        class="ml-auto"
      />
    </CustomNuxtLink>
  </div>
</template>

<script setup lang="ts">
import { navLinks } from "../constants";
import { useI18n } from "vue-i18n"; // Import useI18n

const { t } = useI18n(); // Initialize t for translations

// The `capitalize` function is no longer directly applied to the translated string here.
// Instead, the translation itself should be capitalized if needed, or you can
// apply CSS `text-transform: capitalize;` if that fits your design.
// For now, I've removed `capitalize()` from the template as it's often better
// to handle capitalization within the translation strings or via CSS for i18n.
// If `capitalize` is a global helper you still need, ensure it's imported or globally available.
</script>

<style scoped></style>
