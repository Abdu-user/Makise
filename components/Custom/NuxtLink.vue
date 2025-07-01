<template>
  <NuxtLink
    :class="linkClass"
    :active-class="activeClass"
    :to="to"
    v-slot="slotProps: any"
  >
    <slot v-bind="slotProps"></slot>
    <Icon
      v-if="name"
      :name="name"
      class="w-full h-full"
    />
  </NuxtLink>
</template>

<script setup lang="ts">
import { useGlobalSettingStore } from "~/store/globalSetting";
const state = useGlobalSettingStore();
const props = defineProps({
  variant: { type: String as PropType<keyof typeof variants>, default: "underline" },
  isPrimary: { type: Boolean, required: false },
  name: String,
  block: { type: Boolean, default: false },
  to: { type: [String, Object], required: true, default: "/" },
});
const variants = {
  underline: ` inline-block py-3 md:relative z-10 max-md:px-5 max-md:shadow-lg  rounded-md `,
  navigation: `px-5 py-3 md:px-3 md:py-2 gap-2 rounded 
  flex items-center  
  transition-colors duration-200
  ${
    state.newColors
      ? "text-text-muted hover:text-text"
      : `  text-T3TextColor
  dark:text-darkT3TextColor hover:bg-highlight/5
  dark:hover:bg-darkHoverBg/50 dark:hover:text-darkT2TextColor`
  }
  `,
  ghostButton: ` flex items-center py-7 px-6 rounded-2xl  w-fit
  border border-1  backdrop-blur-lg

   ${
     state.newColors
       ? "text-text  bg-bg hover:bg-bg-light border-b-border-muted border-border border-t-highlight"
       : `
       darkT4TextColor/50
    text-T1TextColor bg-mainT2Bg hover:bg-hoverBg
    dark:text-darkT1TextColor 
    dark:bg-darkMainT2Bg/80 dark:hover:bg-darkHoverBg
  `
   }`,
  link: `text-primary hover:underline outline-none focus:outline-primary rounded-lg focus:outline-2 focus:outline-offset-[6px]`,
};

const base = " text-2xl md:text-base";
const linkClass = computed(() => {
  return [base, variants[props.variant], props.block ? `w-full flex items-center justify-center` : ""].join(" ");
});

const activeClass = computed(() => {
  const variants = {
    underline: `
    border-b-[2px] rounded-b-none
    ${state.newColors ? `!text-primary border-b-primary` : `text-primaryColor dark:text-primaryColor border-b-primary `}
    `,
    navigation: `${
      state.newColors
        ? ` !text-primary  bg-bg-transparent `
        : `bg-activeWeak/70 !text-activeStrong
    dark:bg-darkActiveWeak/30 dark:text-darkPrimaryColor`
    } 
    `,
    ghostButton: ``,
    icon: ``,
    link: "",
  };
  return [variants[props.variant]].join(" ");
});
</script>
