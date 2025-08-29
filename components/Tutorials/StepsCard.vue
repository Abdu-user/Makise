<template>
  <div>
    <CustomButton
      :variant="'plain'"
      @click="isOpen = !isOpen"
      class="w-full justify-between mb-3"
    >
      <span class="border border-secondary rounded-lg text-2xl w-10 h-10 text-center inline-block mr-5">{{ number }}</span> {{ title }}
      <Icon
        class="w-8 h-8"
        :name="isOpen ? 'charm:chevron-up' : 'charm:chevron-down'"
      />
    </CustomButton>
    <slot v-if="isOpen"></slot>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: "",
  },
  number: {
    type: Number,
    required: true,
  },
  initialState: {
    type: Boolean,
    default: false,
  },
});
const isOpen = ref(props.initialState);
</script>

<style scoped></style>
