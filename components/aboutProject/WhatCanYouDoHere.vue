<template>
  <h2 class="text-4xl md:text-5xl font-extrabold text-center text-primary mb-8 mt-16">{{ $t("projectDetails.whatCanYouDoHere") }}?</h2>
  <section class="mb-10 p-6 bg-bg-dark rounded-lg shadow-md">
    <h2 class="text-2xl md:text-3xl font-bold text-text dark:text-text mb-4 border-b-2 border-primary pb-2">
      1. {{ $t("projectDetails.authorize") }}
    </h2>
    <p class="text-text-muted mb-4">
      {{ $t("projectDetails.authorizeText") }}
    </p>
    <a
      href="/tutorials?open=how-to-sign-up"
      class="text-base text-blue-400"
    >
      {{ $t("projectDetails.authorizeHowTo") }}
    </a>

    <RadioDisplay
      :active-prop="activeProp1"
      :radios="pcMobile"
      radio-button-class="p-2 gap-2 w-fit"
      ref="radioDisplay1"
      @radio-click="(pcM) => setActiveProp(pcM, '1')"
      class="flex flex-col items-center"
    >
      <img
        class="mt-4"
        :src="`/images/tutorial-images/sign-up-example${activeProp1 === 'pc' ? '' : '-mobile'}.png`"
        alt=""
      />
    </RadioDisplay>
    <h2 class="text-2xl md:text-3xl font-bold text-text dark:text-text mb-4 border-b-2 border-primary pb-2 mt-10">
      {{ $t("projectDetails.authorizeSignIn") }}
    </h2>

    <RadioDisplay
      :active-prop="activeProp2"
      :radios="pcMobile"
      radio-button-class="p-2 gap-2 w-fit"
      ref="radioDisplay2"
      @radio-click="(pcM) => setActiveProp(pcM, '2')"
      class="flex flex-col items-center"
    >
      <img
        :src="`/images/tutorial-images/sign-in-example${activeProp2 === 'pc' ? '' : '-mobile'}.png`"
        alt=""
        class="mt-4"
      />
    </RadioDisplay>
  </section>
  <section class="mb-10 p-6 bg-bg-dark rounded-lg shadow-md">
    <h2 class="text-2xl md:text-3xl font-bold text-text dark:text-text mb-4 border-b-2 border-primary pb-2">
      2. {{ $t("projectDetails.profile") }}
    </h2>
    <p class="text-text-muted mb-4">
      {{ $t("projectDetails.profileText") }}
    </p>
    <a
      href="/tutorials#profile"
      class="text-base text-blue-400"
    >
      {{ $t("projectDetails.profileHowTo") }}
    </a>
    <RadioDisplay
      :active-prop="activeProp3"
      :radios="pcMobile"
      radio-button-class="p-2 gap-2 w-fit"
      ref="radioDisplay3"
      @radio-click="(pcM) => setActiveProp(pcM, '3')"
      class="flex flex-col items-center"
    >
      <img
        :src="`/images/tutorial-images/profile-example${activeProp3 === 'pc' ? '' : '-mobile'}.png`"
        alt=""
        class="mt-4"
      />
    </RadioDisplay>
  </section>
  <section class="mb-10 p-6 bg-bg-dark rounded-lg shadow-md">
    <h2 class="text-2xl md:text-3xl font-bold text-text dark:text-text mb-4 border-b-2 border-primary pb-2">
      3. {{ $t("projectDetails.messaging") }}
    </h2>
    <p class="text-text-muted mb-4">
      {{ $t("projectDetails.messagingText") }}
    </p>
    <a
      href="/tutorials#messaging"
      class="text-base text-blue-400"
    >
      {{ $t("projectDetails.messagingHowTo") }}
    </a>

    <RadioDisplay
      :active-prop="activeProp4"
      :radios="pcMobile"
      radio-button-class="p-2 gap-2 w-fit"
      ref="radioDisplay4"
      @radio-click="(pcM) => setActiveProp(pcM, '4')"
      class="flex flex-col items-center"
    >
      <div class="flex gap-4 overflow-auto">
        <img
          id="mobile-chat-image1"
          :src="`/images/tutorial-images/messaging-example${activeProp4 === 'pc' ? '' : '-mobile'}.png`"
          alt=""
          class="mt-4"
        />
        <img
          id="mobile-chat-image2"
          v-if="activeProp4 === 'mobile'"
          :src="`/images/tutorial-images/messaging-example-mobile-chat.png`"
          alt=""
          class="mt-4"
        />
      </div>
      <div
        v-if="activeProp4 === 'mobile'"
        class="flex gap-2 mt-2 justify-center"
      >
        <a
          href="#mobile-chat-image1"
          class="underline text-lg"
          >1</a
        >
        <a
          href="#mobile-chat-image2"
          class="underline text-lg"
          >2</a
        >
      </div>
    </RadioDisplay>
  </section>
</template>

<script setup lang="ts">
import { pcMobile } from "~/constants";
const activeProp1 = ref(pcMobile[0].text);
const activeProp2 = ref(pcMobile[0].text);
const activeProp3 = ref(pcMobile[0].text);
const activeProp4 = ref(pcMobile[0].text);
const radioDisplay1 = ref(null);
const radioDisplay2 = ref(null);
const radioDisplay3 = ref(null);
const radioDisplay4 = ref(null);

type PcMobileText = (typeof pcMobile)[number]["text"];
function setActiveProp(newActiveProp: PcMobileText, which?: "1" | "2" | "3" | "4") {
  function setActiveProp1() {
    activeProp1.value = newActiveProp;
    // @ts-ignore  value is an array. The first element is the active prop Ref
    radioDisplay1.value[0] = newActiveProp;
  }
  function setActiveProp2() {
    activeProp2.value = newActiveProp;
    // @ts-ignore  value is an array. The first element is the active prop Ref
    radioDisplay2.value[0] = newActiveProp;
  }
  function setActiveProp3() {
    activeProp3.value = newActiveProp;
    // @ts-ignore  value is an array. The first element is the active prop Ref
    radioDisplay3.value[0] = newActiveProp;
  }
  function setActiveProp4() {
    activeProp4.value = newActiveProp;
    // @ts-ignore  value is an array. The first element is the active prop Ref
    radioDisplay4.value[0] = newActiveProp;
  }
  if (which === "1") {
    setActiveProp1();
    return;
  } else if (which === "2") {
    setActiveProp2();
    return;
  } else if (which === "3") {
    setActiveProp3();
    return;
  } else if (which === "4") {
    setActiveProp4();
    return;
  } else {
    setActiveProp1();
    setActiveProp2();
    setActiveProp3();
    setActiveProp4();
  }
}
onMounted(() => {
  const deviceWidth = window.innerWidth < 768 ? pcMobile[1].text : pcMobile[0].text;
  setActiveProp(deviceWidth);
});
</script>

<style scoped></style>
