<template>
  <input
    :class="inputClass"
    v-model="model"
    :type="type"
    @input="
      if (type === 'number') {
        if (Number(model) > maxNumber) model = String(maxNumber);
        else if (min != null && Number(model) < min) model = String(min);
      }
    "
    :min="min"
  />
</template>

<script setup lang="ts">
const model = defineModel<string | number>(); // Automatically handles `v-model`

const props = defineProps({
  variant: { type: String, default: "default" },
  type: { type: String, default: "text" },
  maxNumber: { type: Number, default: null },
  min: { type: Number, default: null },
});

const inputClass = computed(() => {
  const variants = { default: "bg-white/30 w-full" };
  return variants[props.variant as keyof typeof variants];
});
</script>
