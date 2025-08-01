<script setup lang="ts">
import { computed } from "vue";
import { useGlobalSettingStore } from "~/store/globalSetting";
import type { CustomButtonVariantsType } from "~/types/customButtonType";
const state = useGlobalSettingStore();
const variants = {
  default: `shadow-md `,
  primary: `font-semibold rounded transition-colors `,
  outlined: `border  border-1 box-border bg-transparent `,
  tonal: ``,
  text: `bg-transparent `,
  plain: `text-gray-500 bg-transparent hover:bg-gray-100 focus:bg-highlight/20`,
  navigation: `px-5 py-3 md:px-3 md:py-2 gap-2 rounded 
  flex items-center  
  text-T3TextColor dark:text-darkT3TextColor 
  transition-colors duration-200
  `,
  active: ``,
};
const base = `inline-flex gap-3 items-center justify-center font-medium transition duration-150 focus:outline-none `;
const iconPositions = {
  left: `flex-row`,
  right: `flex-row-reverse`,
  top: "flex-col",
};

const props = defineProps({
  variant: { type: String as PropType<keyof typeof variants>, required: true },
  size: { type: String, default: "f" },
  icon: { type: Boolean, default: false },
  iconPosition: { type: String as PropType<keyof typeof iconPositions>, default: "left" },
  isPrimaryColor: { type: String as PropType<"primary" | "theme">, default: "primary" },
  name: { type: String, default: null },
  loading: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  rounded: { type: Boolean, default: false },
  block: { type: Boolean, default: false },
  prependIcon: { type: Object, default: null },
  appendIcon: { type: Object, default: null },
  newColors: { type: Boolean, default: undefined }, // This is to use the new colors
});

const isNewColors = computed(() => {
  return props.newColors === undefined ? state.newColors : props.newColors;
});
if (props.appendIcon || props.prependIcon) {
  console.error(props.appendIcon, props.prependIcon, "props.appendIcon||props.prependIcon they are deprecated  ");
}

const colors: { primary: typeof variants; theme: typeof variants } = {
  primary: {
    default: "text-red-600 hover:bg-red-200 focus:bg-red-200",
    primary: `bg-primary hover:bg-hoverPrimary focus:bg-hoverPrimary  text-white 
        focus:bg-hoverPrimary focus:outline-1 focus:outline-white focus:outline  `,
    outlined: ` border-red-600 text-red-600 hover:bg-red-200/40 focus:bg-red-200/40`,
    tonal: "bg-red-200 text-textWhite hover:bg-red-300 focus:bg-red-300",
    text: `text-red-600 hover:bg-red-10 focus:bg-red-10 
    hover:text-red-800 focus:bg-highlight/20`,
    plain: `focus:outline-1 focus:outline-white focus:outline  `,
    navigation: `hover:bg-highlight/5
  dark:hover:bg-darkHoverBg/50 dark:hover:text-darkT2TextColor`,
    active: `text-red-600 bg-red-100 hover:bg-red-200 focus:bg-red-200`,
  },
  theme: {
    default: `text-T2TextColor hover:bg-hoverBg focus:bg-hoverBg
      dark:text-darkT2TextColor dark:hover:bg-darkHoverBg 
    focus:bg-darkHoverBg/20 `,
    primary: ` bg-darkMainBg  hover:bg-darkHoverBg focus:bg-darkHoverBg text-darkT2TextColor hover:text-darkT1TextColor
    dark:bg-mainBg dark:hover:bg-hoverBg dark:focus:bg-hoverBg dark:text-T2TextColor dark:hover:text-T1TextColor
    `,
    outlined: `border-T2TextColor  text-T2TextColor  hover:bg-hoverBg focus:bg-hoverBg/20
    dark:border-darkT2TextColor dark:text-darkT2TextColor  dark:hover:bg-darkHoverBg`,
    tonal: `bg-mainT2Bg  text-T3TextColor hover:bg-hoverBg focus:bg-hoverBg
      dark:bg-darkMainT2Bg dark:text-darkT3TextColor dark:hover:text-darkT2TextColor  hover:bg-darkHoverBg focus:bg-darkHoverBg 
    `,
    text: `
      text-T2TextColor  hover:text-T1TextColor hover:bg-hoverBg focus:bg-hoverBg
      dark:text-darkT2TextColor dark:hover:bg-darkHoverBg 
    dark:hover:text-darkT1TextColor dark:focus:bg-darkHoverBg/20`,
    plain: "",
    navigation: `hover:bg-hoverBg  dark:hover:bg-darkHoverBg/50 dark:hover:text-darkT2TextColor`,
    active: `text-T2TextColor dark:text-darkT2TextColor bg-activeBg dark:bg-darkActiveBg `,
  },
};
const newColors: typeof variants = {
  default: "bg-bg text-text hover:bg-light hover:text-text-muted",
  primary: "bg-primary text-bg hover:bg-secondary focus:outline-primary ",
  outlined: "bg-transparent text-primary border border-primary hover:bg-primary hover:text-bg",
  tonal: "bg-bg-light text-text-muted active:text-primary focus:outline-primary   ",
  text: "bg-transparent text-text hover:text-primary focus:outline-primary  ",
  plain: "bg-transparent text-text-muted ",
  navigation: "bg-bg-light text-text-muted hover:bg-highlight",
  active: "bg-secondary text-bg border border-border",
};

const sizes = {
  sm: `md:text-sm text-md ${props.icon ? "p-0" : "px-3 py-1.5"}`,
  md: `md:text-base text-lg ${props.icon ? "p-0" : "px-4 py-2"}`,
  lg: `md:text-lg  text-xl ${props.icon ? " p-0" : "px-5 py-3"}`,
};

const buttonClass = computed(() => {
  return [
    base,
    isNewColors.value ? "" : variants[props.variant],
    sizes[props.size as keyof typeof sizes] || sizes.md,
    isNewColors.value ? newColors[props.variant] : colors[props.isPrimaryColor][props.variant],
    props.rounded ? "rounded-full" : "rounded-md",
    props.icon ? " p-0" : "",
    iconPositions[props.iconPosition],
    props.block ? "w-full" : "",
    props.disabled || props.loading ? " opacity-50 cursor-not-allowed" : "",
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
const button = ref<HTMLButtonElement>();
defineExpose({
  button,
  value: button,
});
</script>

<template>
  <button
    :class="buttonClass"
    :disabled="disabled || loading"
    type="button"
    class=""
    ref="button"
  >
    <!-- Loading Spinner -->
    <span
      v-if="loading"
      class="animate-spin mr-2"
      :class="iconSizeClass"
      >⏳</span
    >

    <Icon
      v-if="!loading && name"
      :name="name"
      :class="[iconSizeClass]"
      class="inline-block"
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
