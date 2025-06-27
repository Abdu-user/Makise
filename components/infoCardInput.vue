<template>
  <div class="grid grid-cols-2">
    <p class="text-textSecondary">
      {{ subtitle }}
    </p>
    <p
      v-if="!isEditing"
      class="font-semibold"
      :class="
        value
          ? 'text-T3TextColor dark:text-darkT3TextColor'
          : `
      underline decoration-wavy text-T4TextColor dark:text-darkT4TextColor`
      "
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
