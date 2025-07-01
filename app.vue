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

useHead({
  title: "Makise",
});

const state = useGlobalSettingStore();
onMounted(async () => {
  await state.initialize();
  getUser();
});

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
* {
  /* box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1); */
  /* background: #fee1ea; */
  box-shadow: 0 0 0 0 #ffe4e7;
}
body {
  /* padding: 16px 0;
  height: 100vh; */
  border-color: #848484;
}
/* :root {
  --bg-dark: hsl(0 0% 90%);
  --bg: hsl(300 0% 95%);
  --bg-light: hsl(300 50% 100%);
  --text: hsl(300 0% 4%);
  --text-muted: hsl(0 0% 28%);
  --highlight: hsl(300 50% 100%);
  --border: hsl(NaN 0% 50%);
  --border-muted: hsl(340 0% 62%);
  --primary: hsl(4 48% 31%);
  --secondary: hsl(186 100% 11%);
  --danger: hsl(9 21% 41%);
  --warning: hsl(52 23% 34%);
  --success: hsl(147 19% 36%);
  --info: hsl(217 22% 41%);
  --bg-transparent: hsla(0, 0%, 90%, 0.601);
}
:root.dark {
  --bg-dark: hsl(336 0% 1%);
  --bg: hsl(300 0% 4%);
  --bg-light: hsl(0 0% 9%);
  --text: hsl(300 0% 95%);
  --text-muted: hsl(300 0% 69%);
  --highlight: hsl(330 0% 39%);
  --border: hsl(0 0% 28%);
  --border-muted: hsl(300 0% 18%);
  --primary: hsl(6 68% 74%);
  --secondary: hsl(187 57% 58%);
  --danger: hsl(9 26% 64%);
  --warning: hsl(52 19% 57%);
  --success: hsl(146 17% 59%);
  --info: hsl(217 28% 65%);
  --bg-transparent: hsla(336, 0%, 1%, 0.605);
} */

/* :root {
  --bg-dark: oklch(0.92 0.1 27);
  --bg: oklch(0.96 0.1 27);
  --bg-light: oklch(1 0.1 27);
  --text: oklch(0.15 0.2 27);
  --text-muted: oklch(0.4 0.2 27);
  --highlight: oklch(1 0.2 27);
  --border: oklch(0.6 0.2 27);
  --border-muted: oklch(0.7 0.2 27);
  --primary: oklch(0.4 0.2 27);
  --secondary: oklch(0.4 0.2 207);
  --danger: oklch(0.5 0.2 30);
  --warning: oklch(0.5 0.2 100);
  --success: oklch(0.5 0.2 160);
  --info: oklch(0.5 0.2 260);
  --bg-transparent: oklch(0.7 0.15 20 /0.6);
}
:root.dark {
  --bg-dark: hsl(350 100% 4%);
  --bg: hsl(352 100% 6%);
  --bg-light: hsl(355 100% 9%);
  --text: hsl(7 100% 100%);
  --text-muted: hsl(6 68% 74%);
  --highlight: hsl(356 91% 38%);
  --border: hsl(354 100% 23%);
  --border-muted: hsl(352 100% 15%);
  --primary: hsl(4 100% 75%);
  --secondary: hsl(185 100% 22%);
  --danger: hsl(7 100% 66%);
  --warning: hsl(53 100% 21%);
  --success: hsl(162 100% 22%);
  --info: hsl(217 100% 70%);

  --bg-transparent: hsla(351, 100%, 4%, 0.604);
} */
:root {
  /* hsl (fallback color) */
  --bg-dark: hsl(324 31% 1%);
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
  /* oklch */
  --bg-dark: oklch(0.1 0.01 340);
  --bg: oklch(0.15 0.01 340);
  --bg-light: oklch(0.2 0.01 340);
  --text: oklch(0.96 0.02 340);
  --text-muted: oklch(0.76 0.02 340);
  --highlight: oklch(0.5 0.02 340);
  --border: oklch(0.4 0.02 340);
  --border-muted: oklch(0.3 0.02 340);
  --primary: oklch(0.76 0.1 340);
  --secondary: oklch(0.76 0.1 160);
  --danger: oklch(0.7 0.05 30);
  --warning: oklch(0.7 0.05 100);
  --success: oklch(0.7 0.05 160);
  --info: oklch(0.7 0.05 260);
}
body.light {
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
  /* oklch */
  --bg-dark: oklch(0.92 0.01 340);
  --bg: oklch(0.96 0.01 340);
  --bg-light: oklch(1 0.01 340);
  --text: oklch(0.15 0.02 340);
  --text-muted: oklch(0.4 0.02 340);
  --highlight: oklch(1 0.02 340);
  --border: oklch(0.6 0.02 340);
  --border-muted: oklch(0.7 0.02 340);
  --primary: oklch(0.4 0.1 340);
  --secondary: oklch(0.4 0.1 160);
  --danger: oklch(0.5 0.05 30);
  --warning: oklch(0.5 0.05 100);
  --success: oklch(0.5 0.05 160);
  --info: oklch(0.5 0.05 260);
}
</style>
