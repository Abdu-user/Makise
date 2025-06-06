<script setup lang="ts">
import { computed } from "vue";
const variants = {
  default: `shadow-md `,
  primary: `font-semibold rounded transition-colors `,
  outlined: `border  border-1 box-border bg-transparent `,
  tonal: ``,
  text: `bg-transparent `,

  plain: `text-gray-500 bg-transparent hover:bg-gray-100 focus:bg-highlight/20`,
};
const base = `inline-flex items-center justify-center font-medium transition duration-150 focus:outline-none`;
const iconPositions = {
  left: `flex-col`,
  right: `flex-col-reverse`,
  top: "flex-row",
};

const props = defineProps({
  variant: { type: String as PropType<keyof typeof variants>, required: true },
  size: { type: String, default: "md" },
  icon: { type: Boolean, default: false },
  iconPosition: { type: String as PropType<keyof typeof iconPositions>, default: "left" },
  isPrimaryColor: { type: String as PropType<"primary" | "theme">, required: true },
  name: { type: String, default: null },
  loading: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  rounded: { type: Boolean, default: false },
  block: { type: Boolean, default: false },
  // primaryColor: { type: Boolean, default: true },
});
const colors: { primary: typeof variants; theme: typeof variants } = {
  primary: {
    default: "text-red-600 hover:bg-red-200",
    primary: `bg-primary hover:bg-highlight/20 text-white 
     focus:bg-highlight  `,
    outlined: ` border-red-600 text-red-600 hover:bg-red-200/40`,
    tonal: "bg-red-200 text-textWhite hover:bg-red-300",
    text: `text-red-600 hover:bg-red-10 
    hover:text-red-800 focus:bg-highlight/20`,
    plain: "",
  },
  theme: {
    default: `text-T2TextColor hover:bg-hoverBg focus:bg-hoverBg
      dark:text-darkT2TextColor dark:hover:bg-darkHoverBg 
     focus:bg-darkHoverBg/20 `,
    primary: ` bg-darkMainBg  hover:bg-darkHoverBg focus:bg-darkHoverBg text-darkT2TextColor hover:text-darkT1TextColor
    dark:bg-mainBg dark:hover:bg-hoverBg dark:focus:bg-hoverBg dark:text-T2TextColor dark:hover:text-T1TextColor
     `,
    outlined: `border-T2TextColor  text-T2TextColor  hover:bg-hoverBg focus:bg-hoverBg
    dark:border-darkT2TextColor dark:text-darkT2TextColor  dark:hover:bg-darkHoverBg`,
    tonal: `bg-mainT2Bg  text-T3TextColor hover:bg-hoverBg focus:bg-hoverBg
      dark:bg-darkMainT2Bg dark:text-darkT3TextColor dark:hover:text-darkT2TextColor  hover:bg-darkHoverBg focus:bg-darkHoverBg 
    `,
    text: `
      text-T2TextColor  hover:text-T1TextColor hover:bg-hoverBg focus:bg-hoverBg
      dark:text-darkT2TextColor dark:hover:bg-darkHoverBg 
    dark:hover:text-darkT1TextColor dark:focus:bg-darkHoverBg/20`,
    plain: "",
  },
};

const sizes = {
  sm: `md:text-sm text-md ${props.icon ? "p-0" : "px-3 py-1.5"}`,
  md: `md:text-base text-lg ${props.icon ? "p-0" : "px-4 py-2"}`,
  lg: `md:text-lg  text-xl ${props.icon ? " p-0" : "px-5 py-3"}`,
};
const buttonClass = computed(() => {
  return [
    base,
    variants[props.variant],
    sizes[props.size as keyof typeof sizes] || sizes.md,
    colors[props.isPrimaryColor][props.variant],
    props.rounded ? "rounded-full" : "rounded-md",
    props.icon ? "w-10 h-10 p-0" : "",
    iconPositions[props.iconPosition],
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
    <!-- Loading Spinner -->
    <span
      v-if="loading"
      class="animate-spin mr-2"
      :class="iconSizeClass"
      >⏳</span
    >

    <!-- Prepend Icon -->
    <Icon
      v-if="!loading && name"
      :name="name"
      :class="[iconSizeClass, iconPosition === 'top' ? 'mb-1' : icon ? '' : 'mr-2']"
    />

    <!-- Button Label -->
    <span
      v-if="!icon"
      class="inline-flex items-center"
    >
      <slot> </slot>
    </span>
  </button>
</template>
