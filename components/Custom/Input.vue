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
import { useGlobalSettingStore } from "~/store/globalSetting";
const state = useGlobalSettingStore();

const sizes = {
  // 'Remove' text helps the class to act like a default, You need to to remove the 'Remove' text to use the class as it is (w-10Remove -> w-10).
  sm: `text-sm px-3 py-1.5  h-7 w-5Remove`,
  md: `text-base px-4 py-3 h-9 w-9Remove`,
  lg: `text-lg px-5 py-3 h-12 w-12Remove`,
  f: "text-lg w-full h-full",
} as const;

const variants = {
  edit: `border-b-2  block w-full focus:outline-none backdrop-blur-md bg-transparent
    
    ${
      state.newColors
        ? "border-b-border-muted focus:border-b-primary text-text-muted "
        : "border-b-gray-300 focus:border-b-red-500 dark:border-b-gray-600 dark:focus:border-b-red-400 text-gray-800 dark:text-gray-100 "
    }
    `,

  input: "w-full border bg-bg-light text-text rounded-lg border-border-muted focus:border-primary focus:outline-none",

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
