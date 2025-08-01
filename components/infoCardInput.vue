<template>
  <div class="grid grid-cols-2 max-md:text-sm">
    <p :class="state.newColors ? 'text-text-muted ' : 'text-T3TextColor dark:text-darkT3TextColor'">
      {{ subtitle }}
    </p>
    <p
      v-if="!isEditing"
      class="font-semibold"
      :class="value ? ' text-text-muted ' : 'text-[var(--text-ghost)] border-b border-[var(--text-ghost)] border-dashed'"
    >
      {{ value ? value : "" }}
    </p>
    <CustomInput
      v-else
      variant="edit"
      v-model="model"
      class="border-b border-[var(--text-ghost)]"
    />
  </div>
</template>

<script setup lang="ts">
import { useGlobalSettingStore } from "~/store/globalSetting";
const state = useGlobalSettingStore();
const model = defineModel<string | number>(); // Automatically handles `v-model`
defineProps({
  subtitle: { type: String, required: true },
  value: { type: String, required: true },
  isEditing: { type: Boolean, required: true },
  placeholder: { type: String, default: "" },
});
</script>
