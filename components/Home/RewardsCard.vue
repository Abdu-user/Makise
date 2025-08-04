<template>
  <div class="px-6 py-4 rounded-2xl gap-4 items-center hoverColor flex">
    <div class="min-w-12 h-12 flex bg-[#FFBFCA] rounded-full p-[4px] items-center justify-center">
      <Icon
        class="w-8 h-8 bg-[#ED5484]"
        :name="name"
        :alt="title"
      />
    </div>
    <div>
      <h3 class="text-xl font-semibold h-10">{{ title }}</h3>
      <p class="text-sm text-[var(--text-muted)]">{{ description }}</p>
    </div>
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
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});
</script>

<style scoped>
.hoverColor:hover {
  background: var(--rewards-card-gradient);
}
</style>
