<template>
  <input
    :class="inputClass"
    v-model="model"
    :type="type"
    @input="handleInput"
    :min="min"
    :style="inputStyle"
    class=""
    :disabled="disabled"
  />
</template>

<script setup lang="ts">
const model = defineModel();

const sizes = {
  sm: `text-sm px-3 py-1.5  h-5 w-5Remove`,
  md: `text-base px-4 py-3 h-7 w-7Remove`,
  lg: `text-lg px-5 py-3 h-10 w-10Remove`,
  f: "text-lg w-full h-full",
} as const;

const variants = {
  edit: `border-b-2 border-b-gray-300 focus:border-b-red-500 block w-full focus:outline-none backdrop-blur-md bg-transparent
    dark:border-b-gray-600 dark:focus:border-b-red-400 text-gray-800 dark:text-gray-100`,

  input: `w-full border border-textParagraph
    focus:border-textParagraph/20 rounded focus:outline-none focus:ring-2 focus:ring-activeStrong/30
    focus:bg-hoverBg dark:focus:bg-darkHoverBg
    bg-white text-base text-gray-900 dark:bg-darkMainBg dark:text-darkT1TextColor
    dark:border-darkT2TextColor dark:focus:border-darkT1TextColor dark:focus:ring-darkHoverBg`,

  checkbox: "inline-block  ",
} as const;

const props = withDefaults(
  defineProps<{
    size?: keyof typeof sizes | null;
    variant?: keyof typeof variants | null;
    type?: string;
    maxNumber?: number | null;
    min?: number;
    error?: boolean;
    disabled?: boolean;
  }>(),
  {
    size: null,
    variant: null,
    type: "text",
    maxNumber: null,
    min: -Infinity,
    error: false,
    disabled: false,
  }
);

const inputClass = computed(() => {
  const typeClass = {
    text: variants.input,
    password: variants.input,
    email: variants.input,
    checkbox: variants.checkbox,
  };

  const size = (() => {
    if (props.type === "checkbox") {
      if (props.size) return sizes[props.size].slice(0, sizes[props.size].length - 6);
      else return "w-8 h-8";
    } else if (props.size) return sizes[props.size];
  })();
  return [
    props.variant ? variants[props.variant] : typeClass[props.type as keyof typeof typeClass],
    props.error ? "decoration-red-500 text-red-500 dark:text-red-400" : "",
    size,
    props.disabled ? " opacity-10 " : " ",
  ].join(" ");
});

const inputStyle = computed(() => {
  return props.error ? "text-decoration: underline; text-decoration-style: wavy;" : "";
});

function handleInput() {
  if (props.type === "number") {
    const num = Number(model);
    if (props.maxNumber != null && num > props.maxNumber) {
      model.value = String(props.maxNumber);
    } else if (props.min != null && num < props.min) {
      model.value = String(props.min);
    }
  }
}
</script>
