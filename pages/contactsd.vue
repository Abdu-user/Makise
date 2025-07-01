<template>
  <div class="text-T3TextColor dark:text-darkT3TextColor">
    <!-- <ContactsNavLink />
    <ContactsNavLink /> -->
    <CustomParagraph :variant="'default'">Tap on the pencil to start a new chat</CustomParagraph>
  </div>
</template>

<script setup lang="ts">
import { useGlobalSettingStore } from "~/store/globalSetting";
const state = useGlobalSettingStore();
onMounted(() => state.setRouteName("Contacts"));
useHead({
  title: "Make contact with Makise",
});
definePageMeta({
  layout: "main",
});
</script>
