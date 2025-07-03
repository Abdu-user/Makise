<template>
  <div
    ref="messagesContainerRef"
    class="grid md:grid-cols-[minmax(auto,18rem),1fr] min-h-screen max-h-screen overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200 bg-[url('/images/tg-background.jpg')] object-cover"
    style="scrollbar-width: thin; scrollbar-color: #848484 transparent; scrollbar-track-color: #000"
  >
    <CustomContainer
      :variant="'mainContainer'"
      :class="`max-md:hidden sticky top-0 right-0 left-0 h-screen
      border-r-[1px] border-gray-500/20  overflow-y-scroll 
      `"
      style="scrollbar-width: thin; scrollbar-color: #848484 transparent; scrollbar-track-color: #000"
    >
      <CustomContainer
        :variant="'mainContainer'"
        class="flex items-center bg-mainT2Bg dark:bg-darkMainT2Bg h-14 gap-2 pl-2"
      >
        <CustomButton
          name="material-symbols:menu-rounded"
          icon
          :variant="'text'"
          :is-primary-color="'theme'"
          class="w-12 h-12 my-auto p-1"
          @click="inDevelopment"
        />
        <div class="relative mr-2">
          <CustomInput
            class="rounded-full border-none p-1 px-6"
            placeholder="Search "
            @click="(changeLeftSideState('search'), inDevelopment)"
          />
          <CustomButton
            v-if="leftSideState === 'search'"
            name="material-symbols:close-small-outline"
            icon
            :variant="'text'"
            :is-primary-color="'theme'"
            class="absolute top-1/2 right-2 transform -translate-y-1/2 w-8 h-8 p-1"
            @click="changeLeftSideState('contacts')"
          ></CustomButton>
        </div>
      </CustomContainer>

      <ContactsNavLinks
        class=""
        v-if="leftSideState === 'contacts'"
      />
    </CustomContainer>
    <div class="relative text-text-muted grid grid-rows-[4rem,1fr,4rem]">
      <ContactsNav :contactInfo="contactInfo" />

      <ContactsMessages class="p-4 mt-auto" />

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

async function getContactInfo() {
  try {
    const res = await fetch("/api/get-contact/" + route.params.username, { cache: "force-cache" });
    contactInfo.value = (await res.json()).contact;
    console.log(contactInfo.value);
  } catch (error) {
    console.error(error);
  }
}

getContactInfo();

const messagesContainerRef = ref<HTMLElement | null>(null);

onMounted(() => {
  scrollToBottom();
});

function scrollToBottom() {
  nextTick(() => {
    if (messagesContainerRef.value) {
      messagesContainerRef.value.scrollTop = messagesContainerRef.value.scrollHeight;
    }
  });
}

const leftSideState = ref("contacts");
function changeLeftSideState(state: "contacts" | "search") {
  leftSideState.value = state;
}

definePageMeta({
  middleware: "auth",
});

const config = useRuntimeConfig();

const { $messaging, $getToken, $appwrite } = useNuxtApp();
import { ID } from "appwrite";
import { useGlobalSettingStore } from "~/store/globalSetting";
import type { ContactType } from "~/types/messaging";

const vapidKey = config.public.firebasePublicKeyPair as string;
async function requestPermissionAndToken() {
  const permission = await Notification.requestPermission();

  if (permission === "granted") {
    const token = await $getToken($messaging, { vapidKey });
    // console.log("FCM Token:", token);

    // await $appwrite.account.deletePushTarget(useAppwriteDocumentGet(user))
    const res = await $appwrite.account.createPushTarget(ID.unique(), token);
    console.log(res);
    useAppwriteDocumentUpdate((await $appwrite.account.get()).$id, {
      FCMToken: token,
    });
  } else {
    console.warn("Push permission not granted.");
  }
}
onMounted(() => {
  noNotificationPermission();
  // requestPermissionAndToken();
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
