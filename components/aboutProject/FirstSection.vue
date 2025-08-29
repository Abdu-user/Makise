<template>
  <!-- Project Title -->
  <h1 class="text-4xl md:text-5xl font-extrabold text-center text-primary mb-8">
    {{ $t("projectDetails.title") }}
  </h1>

  <!-- Project Overview -->
  <section class="mb-10 p-6 bg-bg-dark rounded-lg shadow-md">
    <h2 class="text-2xl md:text-3xl font-bold text-text mb-4 border-b-2 border-primary pb-2">
      {{ $t("projectDetails.overviewLabel") }}
    </h2>

    <!-- Overview Text -->
    <p class="text-base md:text-lg text-text-muted leading-relaxed">
      {{ $t("projectDetails.overview") }}
    </p>
  </section>

  <div class="grid grid-cols-1 gap-8 mb-10">
    <!-- Highlights -->
    <section class="p-6 bg-bg-dark rounded-lg shadow-md">
      <h2 class="text-2xl font-bold text-text mb-4 border-b-2 border-primary pb-2">
        {{ $t("projectDetails.highlightsLabel") }}
      </h2>
      <p
        class="text-text-muted leading-relaxed"
        style="white-space: pre-wrap"
      >
        {{ $t("projectDetails.highlights") }}
      </p>
    </section>

    <!-- Tech Stack -->
    <section class="p-6 bg-bg-dark rounded-lg shadow-md">
      <h2 class="text-2xl font-bold text-text mb-4 border-b-2 border-primary pb-2">
        {{ $t("projectDetails.techStackLabel") }}
      </h2>
      <p
        class="text-text-muted leading-relaxed"
        style="white-space: pre-wrap"
        v-html="$t('projectDetails.techStack').replaceAll('BBB', '<span class=\'font-bold\'>').replaceAll('$BB', '</span>')"
      ></p>
    </section>
  </div>

  <!-- Additional Information -->
  <section class="mb-10 p-6 bg-bg-dark rounded-lg shadow-md">
    <h2 class="text-2xl md:text-3xl font-bold text-text mb-4 border-b-2 border-primary pb-2">
      {{ $t("projectDetails.additionalInfoLabel") }}
    </h2>
    <p
      class="text-text-muted leading-relaxed"
      style="white-space: pre-wrap"
    >
      {{ $t("projectDetails.additionalInfo") }}
    </p>
  </section>

  <!-- Supported Languages -->
  <section class="mb-10 p-6 bg-bg-dark rounded-lg shadow-md">
    <h2 class="text-2xl md:text-3xl font-bold text-text mb-4 border-b-2 border-primary pb-2">
      {{ $t("projectDetails.languagesLabel") }}
    </h2>
    <p
      class="text-text-muted leading-relaxed"
      style="white-space: pre-wrap"
    >
      {{ $t("projectDetails.languages") }}
    </p>
  </section>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
const { t } = useI18n();
</script>

<style scoped>
/* Tailwind handles most of the styling, but you can add custom tweaks if needed */
</style>
