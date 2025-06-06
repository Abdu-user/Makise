<template>
  <div class="space-y-6">
    <!-- Default -->
    <client-only>
      <div class="space-x-2">
        <CustomButton2
          :isPrimaryColor="'theme'"
          :variant="'default'"
          >Default</CustomButton2
        >
        <CustomButton2
          :isPrimaryColor="'primary'"
          :variant="'default'"
          color="red"
          >Red</CustomButton2
        >
        <CustomButton2
          :isPrimaryColor="'primary'"
          :variant="'default'"
          color="green"
          >Green</CustomButton2
        >
      </div>

      <!-- Outlined -->
      <div class="space-x-2">
        <CustomButton2
          :isPrimaryColor="'theme'"
          variant="outlined"
          >Outlined</CustomButton2
        >
        <CustomButton2
          :isPrimaryColor="'primary'"
          variant="outlined"
          color="red"
          >Red Outlined</CustomButton2
        >
        <CustomButton2
          :isPrimaryColor="'primary'"
          variant="outlined"
          color="green"
          >Green Outlined</CustomButton2
        >
      </div>

      <!-- Tonal -->
      <div class="space-x-2">
        <CustomButton2
          :isPrimaryColor="'theme'"
          variant="tonal"
          >Tonal</CustomButton2
        >
        <CustomButton2
          :isPrimaryColor="'primary'"
          variant="tonal"
          color="red"
          >Red Tonal</CustomButton2
        >
        <CustomButton2
          :isPrimaryColor="'primary'"
          variant="tonal"
          color="green"
          >Green Tonal</CustomButton2
        >
      </div>

      <!-- Text -->
      <div class="space-x-2">
        <CustomButton2
          :isPrimaryColor="'theme'"
          variant="text"
          >Text</CustomButton2
        >
        <CustomButton2
          :isPrimaryColor="'primary'"
          variant="text"
          color="red"
          >Red Text</CustomButton2
        >
        <CustomButton2
          :isPrimaryColor="'primary'"
          variant="text"
          color="green"
          >Green Text</CustomButton2
        >
      </div>
      <div class="space-x-2">
        <CustomButton2
          :isPrimaryColor="'primary'"
          block
          class="mb-2"
          variant="primary"
          >Primary</CustomButton2
        >
        <CustomButton2
          :isPrimaryColor="'theme'"
          variant="primary"
          size="md"
          >Red Primary</CustomButton2
        >
        <CustomButton2
          :isPrimaryColor="'primary'"
          variant="primary"
          size="lg"
          >Green Primary</CustomButton2
        >
      </div>

      <!-- Plain -->
      <div class="space-x-2">
        <CustomButton2
          :isPrimaryColor="'primary'"
          variant="plain"
          >Plain</CustomButton2
        >
        <CustomButton2
          :isPrimaryColor="'primary'"
          variant="plain"
          disabled
          >Disabled</CustomButton2
        >
      </div>

      <!-- Sizes -->
      <div class="space-x-2">
        <CustomButton2
          :variant="'default'"
          :isPrimaryColor="'primary'"
          size="sm"
          >Small</CustomButton2
        >
        <CustomButton2
          :variant="'default'"
          :isPrimaryColor="'primary'"
          size="md"
          >Medium</CustomButton2
        >
        <CustomButton2
          :variant="'default'"
          :isPrimaryColor="'primary'"
          size="lg"
          >Large</CustomButton2
        >
      </div>

      <!-- Loading -->
      <div class="space-x-2">
        <CustomButton2
          :variant="'default'"
          :isPrimaryColor="'primary'"
          loading
          >Loading</CustomButton2
        >
        <CustomButton2
          :variant="'default'"
          :isPrimaryColor="'primary'"
          loading
          >Loading Outlined</CustomButton2
        >
      </div>

      <!-- Icons -->
      <CustomButton2
        :variant="'default'"
        :isPrimaryColor="'primary'"
        :prependIcon="'heroicons-outline:check'"
        >Prepend</CustomButton2
      >
      <CustomButton2
        :variant="'default'"
        :isPrimaryColor="'primary'"
        appendIcon="material-symbols-light:attach-email-rounded"
        >Append</CustomButton2
      >
      <div class="space-x-2">
        <CustomButton2
          :variant="'default'"
          :isPrimaryColor="'primary'"
          prependIcon="material-symbols-light:news"
          icon
        />
        <CustomButton2
          :variant="'default'"
          :isPrimaryColor="'primary'"
          appendIcon="material-symbols-light:news"
          icon
        />
        <CustomButton2
          :isPrimaryColor="'primary'"
          prependIcon="material-symbols-light:news"
          icon
          variant="text"
        />
        <CustomButton2
          :variant="'primary'"
          :isPrimaryColor="'primary'"
          icon
          name="material-symbols-light:keyboard-backspace"
        ></CustomButton2>
        <CustomButton2
          :variant="'primary'"
          :isPrimaryColor="'primary'"
          appendIcon="material-symbols-light:news"
        />
      </div>

      Stacked
      <div class="space-x-2">
        <CustomButton2
          :variant="'primary'"
          :isPrimaryColor="'primary'"
          stacked
          prependIcon="material-symbols-light:network-wifi-rounded"
          appendIcon="material-symbols-light:network-wifi-rounded"
        >
          Stacked
        </CustomButton2>
      </div>

      <!-- Block -->
      <div class="w-64">
        <CustomButton2
          :variant="'primary'"
          :isPrimaryColor="'primary'"
          block
          >Block Button</CustomButton2
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
