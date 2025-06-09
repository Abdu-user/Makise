<template>
  <div class="space-y-6">
    <!-- Default -->
    <client-only>
      <div class="space-x-2">
        <CustomButton
          :isPrimaryColor="'theme'"
          :variant="'default'"
          >Default</CustomButton
        >
        <CustomButton
          :isPrimaryColor="'primary'"
          :variant="'default'"
          color="red"
          >Red</CustomButton
        >
        <CustomButton
          :isPrimaryColor="'primary'"
          :variant="'default'"
          color="green"
          >Green</CustomButton
        >
      </div>

      <!-- Outlined -->
      <div class="space-x-2">
        <CustomButton
          :isPrimaryColor="'theme'"
          variant="outlined"
          >Outlined</CustomButton
        >
        <CustomButton
          :isPrimaryColor="'primary'"
          variant="outlined"
          color="red"
          >Red Outlined</CustomButton
        >
        <CustomButton
          :isPrimaryColor="'primary'"
          variant="outlined"
          color="green"
          >Green Outlined</CustomButton
        >
      </div>

      <!-- Tonal -->
      <div class="space-x-2">
        <CustomButton
          :isPrimaryColor="'theme'"
          variant="tonal"
          >Tonal</CustomButton
        >
        <CustomButton
          :isPrimaryColor="'primary'"
          variant="tonal"
          color="red"
          >Red Tonal</CustomButton
        >
        <CustomButton
          :isPrimaryColor="'primary'"
          variant="tonal"
          color="green"
          >Green Tonal</CustomButton
        >
      </div>

      <!-- Text -->
      <div class="space-x-2">
        <CustomButton
          :isPrimaryColor="'theme'"
          variant="text"
          >Text</CustomButton
        >
        <CustomButton
          :isPrimaryColor="'primary'"
          variant="text"
          color="red"
          >Red Text</CustomButton
        >
        <CustomButton
          :isPrimaryColor="'primary'"
          variant="text"
          color="green"
          >Green Text</CustomButton
        >
      </div>
      <div class="space-x-2">
        <CustomButton
          :isPrimaryColor="'primary'"
          block
          class="mb-2"
          variant="primary"
          >Primary</CustomButton
        >
        <CustomButton
          :isPrimaryColor="'theme'"
          variant="primary"
          size="md"
          >Red Primary</CustomButton
        >
        <CustomButton
          :isPrimaryColor="'primary'"
          variant="primary"
          size="lg"
          >Green Primary</CustomButton
        >
      </div>

      <!-- Plain -->
      <div class="space-x-2">
        <CustomButton
          :isPrimaryColor="'primary'"
          variant="plain"
          >Plain</CustomButton
        >
        <CustomButton
          :isPrimaryColor="'primary'"
          variant="plain"
          disabled
          >Disabled</CustomButton
        >
      </div>

      <!-- Sizes -->
      <div class="space-x-2">
        <CustomButton
          :variant="'default'"
          :isPrimaryColor="'primary'"
          size="sm"
          >Small</CustomButton
        >
        <CustomButton
          :variant="'default'"
          :isPrimaryColor="'primary'"
          size="md"
          >Medium</CustomButton
        >
        <CustomButton
          :variant="'default'"
          :isPrimaryColor="'primary'"
          size="lg"
          >Large</CustomButton
        >
      </div>

      <!-- Loading -->
      <div class="space-x-2">
        <CustomButton
          :variant="'default'"
          :isPrimaryColor="'primary'"
          loading
          >Loading</CustomButton
        >
        <CustomButton
          :variant="'default'"
          :isPrimaryColor="'primary'"
          loading
          >Loading Outlined</CustomButton
        >
      </div>

      <!-- Icons -->
      <CustomButton
        :variant="'default'"
        :isPrimaryColor="'primary'"
        :prependIcon="'heroicons-outline:check'"
        >Prepend</CustomButton
      >
      <CustomButton
        :variant="'default'"
        :isPrimaryColor="'primary'"
        appendIcon="material-symbols-light:attach-email-rounded"
        >Append</CustomButton
      >
      <div class="space-x-2">
        <CustomButton
          :variant="'default'"
          :isPrimaryColor="'primary'"
          prependIcon="material-symbols-light:news"
          icon
        />
        <CustomButton
          :variant="'default'"
          :isPrimaryColor="'primary'"
          appendIcon="material-symbols-light:news"
          icon
        />
        <CustomButton
          :isPrimaryColor="'primary'"
          prependIcon="material-symbols-light:news"
          icon
          variant="text"
        />
        <CustomButton
          :variant="'primary'"
          :isPrimaryColor="'primary'"
          icon
          name="material-symbols-light:keyboard-backspace"
        ></CustomButton>
        <CustomButton
          :variant="'primary'"
          :isPrimaryColor="'primary'"
          appendIcon="material-symbols-light:news"
        />
      </div>

      Stacked
      <div class="space-x-2">
        <CustomButton
          :variant="'primary'"
          :isPrimaryColor="'primary'"
          stacked
          prependIcon="material-symbols-light:network-wifi-rounded"
          appendIcon="material-symbols-light:network-wifi-rounded"
        >
          Stacked
        </CustomButton>
      </div>

      <!-- Block -->
      <div class="w-64">
        <CustomButton
          :variant="'primary'"
          :isPrimaryColor="'primary'"
          block
          >Block Button</CustomButton
        >
      </div>
      <!--  -->
    </client-only>
  </div>
</template>

<script setup lang="ts">
import { useGlobalSettingStore } from "~/store/globalSetting";
const state = useGlobalSettingStore();
onMounted(() => state.setRouteName("Contact"));
useHead({
  title: "Make contact with Makise",
});
definePageMeta({
  layout: "main",
});
</script>
