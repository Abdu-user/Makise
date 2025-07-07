<template>
  <CustomContainer
    :variant="'mainContainer'"
    :class="`max-md:hidden sticky top-0 right-0 left-0 h-screen
      border-r-[1px] border-gray-500/20  overflow-y-scroll`"
    style="scrollbar-width: thin; scrollbar-color: #848484 transparent; scrollbar-track-color: #000"
  >
    <div
      class="flex items-center h-14 gap-2 pl-2"
      :class="state.newColors ? 'bg-bg-dark' : 'bg-mainT2Bg dark:bg-darkMainT2Bg'"
    >
      <CustomButton
        name="material-symbols:menu-rounded"
        icon
        :variant="'text'"
        :is-primary-color="'theme'"
        class="w-12 h-12 my-auto p-1"
        @click="inDevelopment"
      />
      <div class="relative mr-2">
        <CustomInput
          class="rounded-full border-none p-1 px-6"
          placeholder="Search "
          @click="(changeLeftSideState('search'), inDevelopment)"
        />
        <CustomButton
          v-if="leftSideState === 'search'"
          name="material-symbols:close-small-outline"
          icon
          :variant="'text'"
          :is-primary-color="'theme'"
          class="absolute top-1/2 right-2 transform -translate-y-1/2 w-8 h-8 p-1"
          @click="changeLeftSideState('contacts')"
        ></CustomButton>
      </div>
    </div>

    <ContactsNavLinks
      class=""
      v-if="leftSideState === 'contacts'"
    />
  </CustomContainer>
</template>

<script setup lang="ts">
import { useGlobalSettingStore } from "~/store/globalSetting";

const state = useGlobalSettingStore();
const leftSideState = ref("contacts");

function changeLeftSideState(state: "contacts" | "search") {
  leftSideState.value = state;
}
</script>

<style scoped></style>
