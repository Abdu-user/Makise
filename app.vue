<template>
  <CustomContainer :variant="'mainContainer'">
    <!-- <NuxtRouteAnnouncer />
    <NuxtWelcome /> -->
    <!-- <div class="text-textWhite"></div> -->

    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <DebugControl v-if="inDev" />
    <ModalsDynamicFeedback />
  </CustomContainer>
</template>
<script setup lang="ts">
import { useGlobalSettingStore } from "./store/globalSetting";
import { getUser, refreshUserData } from "./composables/useSignUp";
import type { MessagePayload } from "firebase/messaging";
import type { NotificationType } from "./types/messaging";
import { useMessagingStore } from "./store/messaging";
import type { MessageType } from "./types/type";
const state = useGlobalSettingStore();
const messagingState = useMessagingStore();
const { $firebase } = useNuxtApp();
const route = useRoute();

useHead({
  title: "Makise",
});

// ~ Initialize
onMounted(async () => {
  await state.initialize();
  await getUser();
  await saveUserCookie();
  await updateLastOnline();
  addPublicKeyIfHavNt();
  initializeFirebaseNotify();
});
function addPublicKeyIfHavNt() {
  if (state.userData) {
    if (!state.userData.publicKey) {
      console.error("User doesn't have a publicKeyPair");
    }
  }
}
function initializeFirebaseNotify() {
  // $firebase.onMessage($firebase.messaging, (payload) => {
  //   messageReceivedNotify(payload);
  // });
}
async function messageReceivedNotify(payload: MessagePayload) {
  const messagingState = useMessagingStore();
  console.log("[App] Foreground message received:", payload);

  if (payload?.data && payload.data.type === "readMessageUpdate") {
    // console.error(payload.data);

    if (!payload.data?.readMessagesId) return;
    const readMessagesId = payload.data?.readMessagesId;
    messagingState.messages = [
      ...messagingState.messages.map((message) => {
        if (readMessagesId.includes(message.$id)) {
          const readMessage = { ...message, status: "read" } as MessageType;
          return readMessage;
        }
        return message;
      }),
    ];
  } else {
    const p = payload.data as unknown as NotificationType;

    if (!p?.body) console.error("NO title in the Firebase notification");
    if (!p?.title) console.error("No body in the Firebase notification");
    // const {title} = p
    // const { body, title, senderUsername, time, link, messageId } = p;

    // if (link.includes(route.fullPath)) {
    //   const updateMessage = messagingState.addNewMessage({ text: body, userId: "" },);
    //   const message = await getMessageById(senderUsername, messageId);
    //   updateMessage(message);
    //   messagingState.setUnreadMessages({
    //     number: messagingState.unreadMessages.number + 1,
    //     isThere: true,
    //   });
    // }
  }
}

async function saveUserCookie() {
  // ✅ Store userId cookie manually
  const res = await fetch("/api/auth/store-user", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId: state.user?.$id }),
  });
}
let intervalId: NodeJS.Timeout;
async function updateLastOnline() {
  async function postUpdateLastOnline() {
    if (!state.user?.$id) throw Error("User not logged in");
    const res = await useAppwriteDocumentUpdate(state.user?.$id, { lastOnline: new Date().toISOString() });
    return res;
  }
  try {
    await postUpdateLastOnline();
    intervalId = setInterval(() => {
      postUpdateLastOnline();
    }, 60000);
  } catch (error) {
    console.error(error);
  }
}
onBeforeUnmount(() => {
  clearInterval(intervalId);
});

// ~ Dev debug button
const inDev = ref(false);
onMounted(() => {
  const { hostname } = window.location;
  const isLocalhost = hostname === "localhost" || hostname === "127.0.0.1";
  if (isLocalhost) inDev.value = true;
});
</script>
<style>
body {
  background-color: rgb(255, 244, 244);
}
/* * {
  box-shadow: 0 0 0 0 #ffe4e7;
} */
body {
  border-color: #848484;
}
:root {
  --message-bubble: linear-gradient(rgb(255, 157, 0) 0%, rgb(253, 0, 253) 50%, rgb(167, 151, 255) 65%, rgb(0, 229, 255) 100%);
}

:root {
  /* hsl (fallback color) */
  --bg-dark: hsl(323 15% 90%);
  --bg: hsl(323 31% 95%);
  --bg-light: hsl(323 100% 100%);
  --text: hsl(321 36% 5%);
  --text-muted: hsl(322 8% 29%);
  --highlight: hsl(323 100% 100%);
  --border: hsl(323 5% 51%);
  --border-muted: hsl(323 7% 63%);
  --primary: hsl(318 38% 30%);
  --secondary: hsl(160 100% 13%);
  --danger: hsl(9 21% 41%);
  --warning: hsl(52 23% 34%);
  --success: hsl(147 19% 36%);
  --info: hsl(217 22% 41%);
  --bg-transparent: hsla(326, 14%, 90%, 0.628);
}
:root.dark {
  --bg-dark: hsl(300, 20%, 1%);
  --bg: hsl(322 19% 5%);
  --bg-light: hsl(322 11% 9%);
  --text: hsl(323 70% 96%);
  --text-muted: hsl(323 9% 70%);
  --highlight: hsl(323 6% 40%);
  --border: hsl(322 8% 29%);
  --border-muted: hsl(322 12% 19%);
  --primary: hsl(320 50% 73%);
  --secondary: hsl(149 41% 62%);
  --danger: hsl(9 26% 64%);
  --warning: hsl(52 19% 57%);
  --success: hsl(146 17% 59%);
  --info: hsl(217 28% 65%);
  --bg-transparent: hsla(300, 20%, 1%, 0.616);
}
</style>
