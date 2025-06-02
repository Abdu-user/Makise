<template>
  <div class="space-y-6">
    <!-- Default -->
    <client-only>
      <div class="space-x-2">
        <CustomButton2>Default</CustomButton2>
        <CustomButton2 color="red">Red</CustomButton2>
        <CustomButton2 color="green">Green</CustomButton2>
      </div>

      <!-- Outlined -->
      <div class="space-x-2">
        <CustomButton2 variant="outlined">Outlined</CustomButton2>
        <CustomButton2
          variant="outlined"
          color="red"
          >Red Outlined</CustomButton2
        >
        <CustomButton2
          variant="outlined"
          color="green"
          >Green Outlined</CustomButton2
        >
      </div>

      <!-- Tonal -->
      <div class="space-x-2">
        <CustomButton2 variant="tonal">Tonal</CustomButton2>
        <CustomButton2
          variant="tonal"
          color="red"
          >Red Tonal</CustomButton2
        >
        <CustomButton2
          variant="tonal"
          color="green"
          >Green Tonal</CustomButton2
        >
      </div>

      <!-- Text -->
      <div class="space-x-2">
        <CustomButton2 variant="text">Text</CustomButton2>
        <CustomButton2
          variant="text"
          color="red"
          >Red Text</CustomButton2
        >
        <CustomButton2
          variant="text"
          color="green"
          >Green Text</CustomButton2
        >
      </div>
      <div class="space-x-2">
        <CustomButton2
          block
          class="mb-2"
          variant="primary"
          >Primary</CustomButton2
        >
        <CustomButton2
          variant="primary"
          size="md"
          >Red Primary</CustomButton2
        >
        <CustomButton2
          variant="primary"
          size="lg"
          >Green Primary</CustomButton2
        >
      </div>

      <!-- Plain -->
      <div class="space-x-2">
        <CustomButton2 variant="plain">Plain</CustomButton2>
        <CustomButton2
          variant="plain"
          disabled
          >Disabled</CustomButton2
        >
      </div>

      <!-- Sizes -->
      <div class="space-x-2">
        <CustomButton2 size="sm">Small</CustomButton2>
        <CustomButton2 size="md">Medium</CustomButton2>
        <CustomButton2 size="lg">Large</CustomButton2>
      </div>

      <!-- Loading -->
      <div class="space-x-2">
        <CustomButton2 loading>Loading</CustomButton2>
        <CustomButton2
          loading
          variant="outlined"
          >Loading Outlined</CustomButton2
        >
      </div>

      <!-- Icons -->
      <CustomButton2 :prependIcon="'heroicons-outline:check'">Prepend</CustomButton2>
      <CustomButton2 appendIcon="material-symbols-light:attach-email-rounded">Append</CustomButton2>
      <div class="space-x-2">
        <CustomButton2
          prependIcon="material-symbols-light:news"
          icon
        />
        <CustomButton2
          appendIcon="material-symbols-light:news"
          icon
        />
        <CustomButton2
          prependIcon="material-symbols-light:news"
          icon
          variant="text"
        />
        <CustomButton2
          icon
          name="material-symbols-light:keyboard-backspace"
        ></CustomButton2>
        <CustomButton2 appendIcon="material-symbols-light:news" />
      </div>

      Stacked
      <div class="space-x-2">
        <CustomButton2
          stacked
          prependIcon="material-symbols-light:network-wifi-rounded"
          appendIcon="material-symbols-light:network-wifi-rounded"
        >
          Stacked
        </CustomButton2>
      </div>

      <!-- Block -->
      <div class="w-64">
        <CustomButton2 block>Block Button</CustomButton2>
      </div>
      <!--  -->
    </client-only>
  </div>
</template>

<script setup lang="ts">
import { useGlobalSettingStore } from "~/store/globalSetting";
const state = useGlobalSettingStore();
state.routeName = "Contact";
useHead({
  title: "Make contact with Makise",
});
definePageMeta({
  layout: "main",
});
</script>
