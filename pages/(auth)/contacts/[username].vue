<template>
  <div class="relative text-text-muted flex flex-col h-[100dvh] max-h-[100dvh">
    <ContactsNav :contactInfo="contactInfo" />

    <ContactsMessages class="max-w-2xl mx-auto" />

    <ContactsScrollDownButton class="absolute bottom-20 w-full" />

    <ContactsMessageInput childClass="max-w-2xl mx-auto" />
  </div>
</template>

<script setup lang="ts">
const route = useRoute();

import { ContactsMessageInput } from "#components";
import { onMounted } from "vue";
const state = useGlobalSettingStore();
const messagingState = useMessagingStore();
const contactInfo = ref<ContactType>();

definePageMeta({
  middleware: "auth",
  layout: "contacts",
});

async function getContactInfo() {
  try {
    const res = await fetch("/api/get-contact/" + route.params.username);
    const contact = await res.json();
    contactInfo.value = contact.contact;
    messagingState.contactInfo = contact.contact;
  } catch (error) {
    console.error(error);
  }
}

onBeforeUnmount(() => {
  messagingState.contactInfo = null;
});

onMounted(() => {
  let intervalId: NodeJS.Timeout;
  intervalId = setInterval(() => {
    getContactInfo();
  }, 240000);
  onBeforeMount(() => {
    clearInterval(intervalId);
  });
});

getContactInfo();

state.routeName = "/contacts";

//  ~ ask for notification permission
import { useGlobalSettingStore } from "~/store/globalSetting";
import { useMessagingStore } from "~/store/messaging";
import type { ContactType } from "~/types/messaging";

async function requestPermissionAndToken() {
  const permission = await Notification.requestPermission();

  if (permission === "granted") {
  } else {
    state.setFeedback("error", "Please allow Notification");
  }
}

onMounted(() => {
  noNotificationPermission();
});

async function noNotificationPermission() {
  if (Notification.permission === "default") {
    requestPermissionAndToken();
  } else if (Notification.permission === "denied") {
    state.setFeedback("error", "You must grant notification permission to receive push notifications.");
  }
}
</script>
