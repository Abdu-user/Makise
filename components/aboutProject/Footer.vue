<template>
  <!-- Project Links -->
  <footer class="p-6 bg-bg-light dark:bg-bg-dark rounded-lg shadow-md">
    <h2 class="text-2xl md:text-3xl font-bold text-text dark:text-text mb-4 border-b-2 border-primary pb-2">
      {{ $t("projectDetails.externalLinks.label") }}
    </h2>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <a
        v-if="$t('projectDetails.externalLinks.githubRepo.url')"
        :href="$t('projectDetails.externalLinks.githubRepo.url')"
        target="_blank"
        rel="noopener noreferrer"
        class="flex items-center space-x-3 p-4 bg-bg dark:bg-bg-dark rounded-lg shadow hover:shadow-md transition-shadow duration-200 text-primary hover:text-highlight"
      >
        <Icon
          name="lucide:github"
          class="w-6 h-6 text-primary"
        />
        <div>
          <span class="font-semibold">{{ $t("projectDetails.externalLinks.githubRepo.label") }}</span>
          <p class="text-sm text-text-muted">{{ $t("projectDetails.externalLinks.githubRepo.description") }}</p>
        </div>
      </a>

      <!-- <a
        v-if="$t('projectDetails.externalLinks.liveDemo.url')"
        :href="$t('projectDetails.externalLinks.liveDemo.url')"
        target="_blank"
        rel="noopener noreferrer"
        class="flex items-center space-x-3 p-4 bg-bg dark:bg-bg-dark rounded-lg shadow hover:shadow-md transition-shadow duration-200 text-success hover:text-highlight"
      >
        <Icon
          name="lucide:external-link"
          class="w-6 h-6"
        />
        <div>
          <span class="font-semibold">{{ $t("projectDetails.externalLinks.liveDemo.label") }}</span>
          <p class="text-sm text-text-muted">{{ $t("projectDetails.externalLinks.liveDemo.description") }}</p>
        </div>
      </a> -->

      <a
        v-if="$t('projectDetails.externalLinks.figmaDesign.url')"
        :href="$t('projectDetails.externalLinks.figmaDesign.url')"
        target="_blank"
        rel="noopener noreferrer"
        class="flex items-center space-x-3 p-4 bg-bg dark:bg-bg-dark rounded-lg shadow hover:shadow-md transition-shadow duration-200 text-info hover:text-highlight"
      >
        <Icon
          name="lucide:figma"
          class="w-6 h-6"
        />
        <div>
          <span class="font-semibold">{{ $t("projectDetails.externalLinks.figmaDesign.label") }}</span>
          <p class="text-sm text-text-muted">{{ $t("projectDetails.externalLinks.figmaDesign.description") }}</p>
        </div>
      </a>

      <a
        v-if="$t('projectDetails.externalLinks.otherProject.url')"
        :href="$t('projectDetails.externalLinks.otherProject.url')"
        target="_blank"
        rel="noopener noreferrer"
        class="flex items-center space-x-3 p-4 bg-bg dark:bg-bg-dark rounded-lg shadow hover:shadow-md transition-shadow duration-200 text-warning hover:text-highlight"
      >
        <Icon
          name="lucide:code-2"
          class="w-6 h-6"
        />
        <div>
          <span class="font-semibold">{{ $t("projectDetails.externalLinks.otherProject.label") }}</span>
          <p class="text-sm text-text-muted">{{ $t("projectDetails.externalLinks.otherProject.description") }}</p>
        </div>
      </a>
      <a
        v-if="$t('projectDetails.externalLinks.otherProject.url')"
        href="https://kaspi-gold-clone.netlify.app"
        target="_blank"
        rel="noopener noreferrer"
        class="flex items-center space-x-3 p-4 bg-bg dark:bg-bg-dark rounded-lg shadow hover:shadow-md transition-shadow duration-200 text-warning hover:text-highlight"
      >
        <Icon
          name="lucide:code-2"
          class="w-6 h-6"
        />
        <div>
          <span class="font-semibold">{{ $t("projectDetails.externalLinks.otherProject.label") }}</span>
          <p class="text-sm text-text-muted">{{ $t("projectDetails.externalLinks.otherProject.description") }}</p>
        </div>
      </a>
    </div>
  </footer>
</template>

<script setup lang="ts"></script>

<style scoped></style>
