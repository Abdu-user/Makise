<template>
  <div class="min-h-screen flex flex-col items-center justify-center container bg-bg">
    <h1 class="text-4xl font-bold text-gray-800 mb-4">About Us</h1>
    <p class="text-lg text-gray-600 max-w-xl text-center">
      Welcome to Authentifection! This is the about page. Here you can learn more about our project and team.
    </p>
    <button @click="showNotification">button</button>
  </div>
</template>

<script setup lang="ts">
import { useGlobalSettingStore } from "~/store/globalSetting";
const state = useGlobalSettingStore();

onMounted(() => state.setRouteName("About"));
useHead({
  title: "About Makise ",
});
definePageMeta({
  layout: "main",
});
// function click() {
//   new Notification("Test from Vue", {
//     body: "This is from the Notification API directly.",
//   });

//   if (navigator.serviceWorker.controller) {
//     console.log("Sending message to SW");
//     navigator.serviceWorker.controller.postMessage({
//       action: "TEST_NOTIFICATION",
//       title: "Test Notification",
//       body: "This notification was triggered manually.",
//     });
//   } else {
//     console.error("No service worker controller found");
//   }
// }
// onMounted(() => {
//   console.log(Notification.permission);
//   if (Notification.permission === "granted") {
//     showNotification();
//   } else if (Notification.permission !== "denied") {
//     Notification.requestPermission().then((permission) => {
//       showNotification();
//     });
//   }
//   new Notification("Test", {
//     body: "This is a test notification",
//     icon: "/icon.png",
//   });
// });
function showNotification() {
  console.log("notification");
  const notification = new Notification("New message from dCode", {
    body: "Hey mate, how are you? You want to catch up",
    // image: "/image/favicon.png",
    requireInteraction: true,
  });
  console.log(notification);
}
</script>

<style scoped>
/* .container {
  background-color: var(--bg-dark);
} */
</style>
