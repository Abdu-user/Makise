<template>
  <div
    ref="messagesContainerRef"
    class="grid md:grid-cols-[minmax(auto,18rem),1fr] h-[100dvh] max-h-screen overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200 bg-[url('/images/tg-background.jpg')] object-cover"
    style="scrollbar-width: thin; scrollbar-color: #83a8ff transparent; scrollbar-track-color: #000"
  >
    <ContactsNavLinksForPC />
    <div class="relative text-text-muted grid grid-rows-[4rem,1fr,4rem]">
      <ContactsNav :contactInfo="contactInfo" />

      <ContactsMessages class="p-4 mt-auto" />

      <ContactsScrollDownButton />
      <ContactsMessageInput />
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();

import { ContactsMessageInput } from "#components";
import { nextTick, onMounted } from "vue";
const state = useGlobalSettingStore();
const contactInfo = ref<ContactType>();
const messagingState = useMessagingStore();

definePageMeta({
  middleware: "auth",
});

async function getContactInfo() {
  try {
    const res = await fetch("/api/get-contact/" + route.params.username);
    const contact = await res.json();
    contactInfo.value = contact.contact;
  } catch (error) {
    console.error(error);
  }
}
getContactInfo();

state.routeName = "/contacts";

const messagesContainerRef = ref<HTMLElement | null>(null);

//  ~ Scroll down on mounded

onMounted(() => {
  messagingState.scrollToBottom(scrollToBottom);
  messagesContainerRef.value?.addEventListener("scroll", detectScroll);

  scrollWatch();
});

function scrollWatch() {
  const stop = watch(
    () => messagingState.messages, // ✅ Track the actual array for proper reactivity
    async (messages) => {
      if (messages.length === 0) return;

      await nextTick(); // wait for DOM update
      scrollToBottom(false);
      stop(); // ✅ stop watching after first scroll
    },
    { immediate: true } // ✅ trigger immediately in case messages are already there
  );
}

function detectScroll(e: Event) {
  const el = messagesContainerRef.value;
  if (!el) return;

  const isAtBottom = el.scrollHeight - el.scrollTop <= el.clientHeight + 65;
  // console.log(el.scrollHeight, el.scrollTop, el.clientHeight, 65);
  messagingState.isUserAtBottom = isAtBottom;
}

onBeforeMount(() => {
  messagesContainerRef.value?.removeEventListener("scroll", detectScroll);
});
function scrollToBottom(smooth = true) {
  nextTick(() => {
    const container = messagesContainerRef.value;
    if (container) {
      container.scrollTo({
        top: container.scrollHeight,
        behavior: smooth ? "smooth" : "auto", // 🔁 toggle animation
      });
    }
  });
}

//  ~ Get device-token for notification
import { useGlobalSettingStore } from "~/store/globalSetting";
import type { ContactType } from "~/types/messaging";
import { useMessagingStore } from "~/store/messaging";

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

<style scoped></style>
