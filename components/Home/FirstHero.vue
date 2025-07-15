<template>
  <section
    class="md:flex grid-cols-2 md:h-[100dvh] md:min-h-[700px]"
    :id="homeHashLinks[0]"
  >
    <div class="ml-7 max-md:mr-7 md:ml-14 md:w-[40%] pb-10">
      <div class="pt-20 flex flex-col items-start md:h-full justify-evenly">
        <p
          class="px-4 py-2 inline-block rounded-lg slideLeft"
          style="background: var(--bg-gradient)"
        >
          {{ $t("loginMessage1") }}
        </p>
        <div class="relative slideLeft">
          <h1 class="text-4xl leading-[1.1] font-semibold uppercase mt-4">
            <i18n-t keypath="inspiration1">
              <template #gradient>
                <span class="text-gradient">{{ $t("inspired by -") }}</span>
              </template>
              <template #br>
                <br />
              </template>
            </i18n-t>
          </h1>
          <custom-button
            class="absolute top-0 -right-24 w-28 h-28 text-purple-500 bounce2 slideLeft max-md:hidden"
            style="background: var(--bg-gradient)"
            :variant="'primary'"
            :rounded="true"
          >
            {{ $t("Chat with Amadeus") }}
          </custom-button>
        </div>
        <p class="mt-4 text-[#949494] slideLeft">
          <i18n-t keypath="paragraph1">
            <template #Telegram>
              <span class="capitalize text-[#87A9FF]">Telegram</span>
            </template>
            <template #br>
              <br />
            </template>
          </i18n-t>
        </p>
        <div class="relative h-20 w-full">
          <ul class="md:absolute top-0 flex flex-wrap w-[140%] gap-5 md:whitespace-nowrap slideLeft">
            <li
              v-for="info in webAppInfo"
              class="whitespace-nowrap"
            >
              <span class="text-gradient text-4xl">
                {{ info.number }}
              </span>
              {{ info.text }}
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="md:h-full ml-auto relative flex items-center justify-center slideRight">
      <img
        src="/backgrounds/makise-wallpaper3-bg-trans2.png"
        alt=""
        class="h-full object-contain md:pt-16 relative z-10"
      />

      <div class="bg-red-700 w-96 h-96 absolute top-1/2 -translate-y-1/2 rounded-full blur-[450px]"></div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { homeHashLinks, smallUsersInfo } from "~/constants";
const i18n = useI18n();
const { locale, t } = i18n;
const webAppInfo = computed(() => {
  const messages = [t("users"), t("messages"), t("verified users")];
  return smallUsersInfo.map((number, i) => ({ number, text: messages[i] }));
});
</script>

<style scoped>
.bounce2 {
  animation: bounce2 2s ease infinite;
}
@keyframes bounce2 {
  0%,
  20%,
  50%,
  80%,
  100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-30px);
  }
  60% {
    transform: translateY(-15px);
  }
}
</style>
