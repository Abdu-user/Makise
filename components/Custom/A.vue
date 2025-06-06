<template>
  <a :class="computedClass"><slot></slot></a>
</template>

<script setup lang="ts">
const props = defineProps({
  variant: { type: String, default: "default" },
  error: { type: Boolean, default: false },
});

const computedClass = computed(() => {
  const variants = {
    default: "text-primary hover:underline",
  };

  return [variants[props.variant as keyof typeof variants], props.error ? "text-red-500 font-bold uppercase" : ""].join(" ");
});
</script>
<!-- <script setup lang="ts">
import { computed } from "vue";
const variants = {
  default: `shadow-md text-red-600 hover:bg-red-200`,
  primary: `bg-primary hover:bg-highlight text-white font-semibold 
     focus:bg-highlight rounded transition-colors text-base`,
  outlined: `border  border-1 box-border border-red-600 text-red-600 bg-transparent hover:bg-red-200/40`,
  tonal: `bg-red-200 text-textWhite hover:bg-red-300`,
  text: `text-red-600 bg-transparent hover:bg-red-10 
    hover:text-red-800 focus:bg-highlight/20 `,
  plain: `text-gray-500 bg-transparent hover:bg-gray-100 focus:bg-highlight/20`,
  // active: `shadow-md bg-mainBg  hover:bg-red-200`,
};
const base = `inline-flex items-center justify-center font-medium transition duration-150 focus:outline-none`;
const iconPositions = {
  left: `flex-col`,
  right: `flex-col-reverse`,
  top: "flex-row",
};
const props = defineProps({
  variant: { type: String as PropType<keyof typeof variants>, default: null },
  size: { type: String, default: "md" },
  iconPosition: { type: String as PropType<keyof typeof iconPositions>, default: "left" },
  name: { type: String, default: null },
  icon: { type: Boolean, defalt: false },
  stacked: { type: Boolean, default: false },
  loading: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  rounded: { type: Boolean, default: false },
  block: { type: Boolean, default: false },
  // primaryColor: { type: Boolean, default: true },
});

const sizes = {
  sm: `md:text-sm text-md ${props.icon ? "p-0" : "px-3 py-1.5"}`,
  md: `md:text-base text-lg ${props.icon ? "p-0" : "px-4 py-2"}`,
  lg: `md:text-lg  text-xl ${props.icon ? " p-0" : "px-5 py-3"}`,
};
const buttonClass = computed(() => {
  return [
    base,
    variants[props.variant] || (props.name ? variants.text : variants.default),
    sizes[props.size as keyof typeof sizes] || sizes.md,
    iconPositions[props.iconPosition],
    props.rounded ? "rounded-full" : "rounded-md",
    props.name ? "w-10 h-10 p-0" : "",
    props.stacked ? "flex-col" : "",
    props.block ? "w-full" : "",
    props.disabled ? "opacity-50 cursor-not-allowed" : "",
  ].join(" ");
});

const iconSizeClass = computed(() => {
  return (
    {
      sm: "w-4 h-4",
      md: "w-6 h-6",
      lg: "w-8 h-8",
    }[props.size] || (props.icon ? "w-full h-full" : "w-6 h-6") // Default size for icons
  );
});
</script>

<template>
  <button
    :class="buttonClass"
    :disabled="disabled || loading"
    type="button"
  >
    <!-- Loading Spinner 
    <span
      v-if="loading"
      class="animate-spin mr-2"
      :class="iconSizeClass"
      >⏳</span
    >

    <!-- Prepend Icon 
    <Icon
      v-if="!loading || name"
      :name="name"
      :class="[iconSizeClass, stacked ? 'mb-1' : name ? '' : 'mr-2']"
    />

    <!-- Button Label 
    <span
      v-if="!icon"
      class="inline-flex items-center"
    >
      <slot> </slot>
    </span>
  </button>
</template> -->
