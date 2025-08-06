<template>
  <section
    id="Messaging"
    class="px-10 py-6 max-md:w-screen"
  >
    <div class="grid md:grid-cols-2 gap-10">
      <div class="max-md:order-2 w-[290px]">
        <img
          src="/images/messagesImage.png"
          :alt="$t('MessagingImageAlt')"
          class="w-full h-auto slideLeft"
        />
      </div>
      <div class="flex flex-col justify-between max-md:order-1">
        <div class="redBlur right-0 translate-x-full absolute z-50"></div>
        <h1 class="text-4xl md:text-5xl font-bold mb-5 slideRight break-words contain-inline-size hyphens-manual">
          {{ $t("EasilyMessage") }}
        </h1>
        <p class="slideRight">{{ $t("EasilyMessageParagraph") }}</p>
        <div class="flex items-center mt-5 slideRight">
          <span class="font-semibold"> {{ $t("Browsers") }}: </span>
          <div class="flex flex-wrap gap-3">
            <img
              :src="browser.src"
              v-for="browser in browserLogos"
              :alt="browser.alt"
              class="inline-block w-10 h-10 mx-2"
            />
          </div>
        </div>
        <a
          href="/tutorials/messaging/get-started"
          class="w-full h-14 border link-style text-[var(--text-muted)] border-[#F56E99] rounded-2xl flex items-center justify-center mt-5 slideRight break-words hyphens-manual px-3"
          >{{ $t("LearnHowToStartMessaging") }} -></a
        >
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const browserLogos = [
  { alt: "Microsoft Edge", src: "/logos/MicrosoftEdge-logo.png" },
  { alt: "Google Chrome", src: "/logos/chrome-logo.png" },
  { alt: "Brave", src: "/logos/brave-logo.png" },
  { alt: "Opera", src: "/logos/opera-logo.png" },
];
</script>

<style scoped></style>
