<template>
  <input
    :class="inputClass"
    v-model="model"
    :type="type"
    @input="handleInput"
    :min="min"
    :style="inputStyle"
    class=" "
  />
</template>

<script setup lang="ts">
const model = defineModel<string | number>(); // Automatically handles `v-model`

const props = defineProps({
  variant: { type: String, default: "input" },
  type: { type: String, default: "text" },
  maxNumber: { type: Number, default: null },
  size: { type: String, default: "" },
  min: { type: Number, default: null },
  error: { type: Boolean, default: false },
});

const inputClass = computed(() => {
  const variants = {
    edit: "border-b-2 border-b-gray-300 focus:border-b-red-500 block w-full focus:outline-none backdrop-blur-md bg-transparent",
    input: `${props.size ? "" : " px-4 py-3"} w-full border border-textParagraph
    focus:border-textParagraph/20 rounded focus:outline-none focus:ring-2 focus:ring-activeStrong/30 bg-white text-base`,
    checkBox: "",
  };
  const type = {
    text: variants.input,
    password: variants.input,
    email: variants.input,
    checkBox: variants.checkBox,
  };
  const sizes = {
    sm: `text-sm   px-3 py-1.5`,
    md: `text-base   px-4 py-3`,
    lg: `text-lg  px-5 py-3`,
    f: "text-lg w-full h-full",
  };
  return [
    props.variant ? variants[props.variant as keyof typeof variants] : type[props.type as keyof typeof type],
    props.error ? "decoration-red-500 text-red-500" : "",
    sizes[props.size as keyof typeof sizes],
  ].join(" ");
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
