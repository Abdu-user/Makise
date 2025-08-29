<template>
  <MainLayout>
    <ProfileTopInfoImages class="pt-3 md:pt-6" />
    <div class="mx-4">
      <ProfileNavLinks />
      <slot />
    </div>
  </MainLayout>
</template>
<script lang="ts" setup>
import { useGlobalSettingStore } from "~/store/globalSetting";
import { useI18n } from "vue-i18n"; // Import useI18n

const state = useGlobalSettingStore();
const { t } = useI18n(); // Initialize t for translations

state.setRouteName("Profile");

useHead({
  title: t("profileLayout.pageTitle"),
  meta: [{ name: "description", content: t("profileLayout.metaDescription") }],
});
</script>
