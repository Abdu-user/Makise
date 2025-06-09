<template>
  <div class="grid grid-cols-2">
    <p class="text-textSecondary">
      {{ subtitle }}
    </p>
    <p
      v-if="!isEditing"
      class="text-textColor dark:text-darkT3TextColor font-semibold"
    >
      {{ value ? value : placeholder }}
    </p>
    <CustomInput
      v-else
      :placeholder="placeholder"
      variant="edit"
      v-model="model"
    />
  </div>
</template>

<script setup lang="ts">
const model = defineModel<string | number>(); // Automatically handles `v-model`
defineProps({
  subtitle: { type: String, required: true },
  value: { type: String, required: true },
  isEditing: { type: Boolean, required: true },
  placeholder: { type: String, default: "" },
});
</script>
