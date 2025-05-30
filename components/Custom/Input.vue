<template>
  <input
    :class="inputClass"
    v-model="model"
    :type="type"
    @input="handleInput"
    :min="min"
    :style="inputStyle"
  />
</template>

<script setup lang="ts">
const model = defineModel<string | number>(); // Automatically handles `v-model`

const props = defineProps({
  variant: { type: String, default: "default" },
  type: { type: String, default: "text" },
  maxNumber: { type: Number, default: null },
  min: { type: Number, default: null },
  error: { type: Boolean, default: false },
});

const inputClass = computed(() => {
  const variants = {
    default: "bg-white/30 w-full",
    input: "w-full px-4 py-3 border border-primary rounded focus:outline-none focus:ring-2 focus:ring-active bg-white text-base",
  };
  return [variants[props.variant as keyof typeof variants], props.error ? "decoration-red-500 text-red-500" : ""].join(" ");
});
const inputStyle = computed(() => {
  return [props.error ? `text-decoration: underline; text-decoration-style: wavy;` : ""];
});
function handleInput() {
  if (props.type === "number") {
    if (Number(model) > props.maxNumber) model.value = String(props.maxNumber);
    else if (props.min != null && Number(model) < props.min) model.value = String(props.min);
  }
}
</script>
