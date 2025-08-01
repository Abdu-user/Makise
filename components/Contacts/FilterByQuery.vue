<template>
  <div v-show="messagingState.leftSideState === 'search'">
    <input
      class="w-full pl-2 py-[2px] bg-bg-light text-text rounded-lg border-border-muted focus:border-primary focus:outline-none"
      v-model="messagingState.searchQuery"
      ref="searchInput"
    />
  </div>

  <slot v-if="messagingState.leftSideState === 'contacts'"></slot>
</template>

<script setup lang="ts">
import CustomInput from "~/components/Custom/Input.vue";
import { useMessagingStore } from "~/store/messaging";

const messagingState = useMessagingStore();
const searchInput = ref<HTMLInputElement | null>(null);
watch(
  () => searchInput.value,
  () => {
    if (!searchInput.value) return console.log("Search input is not available");
    messagingState.searchInputs["0"] = searchInput;
  }
);
</script>

<style scoped></style>
