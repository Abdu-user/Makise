<template>
  <NuxtLink
    :class="linkClass"
    :active-class="activeClass"
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
const props = defineProps({
  variant: { type: String as PropType<keyof typeof variants>, default: "underline" },
  isPrimary: { type: Boolean, required: false },
  name: String,
});
const variants = {
  underline: ` inline-block py-3 md:relative z-10 max-md:px-5 max-md:shadow-lg  rounded-md `,
  navigation: `px-5 py-3 md:px-3 md:py-2 gap-2 rounded 
  flex items-center  
  text-T3TextColor
  dark:text-darkT3TextColor hover:bg-highlight/5
  transition-colors duration-200
  dark:hover:bg-darkHoverBg dark:hover:text-darkT2TextColor
  `,
  ghostButton: ` flex items-center py-5 px-6 rounded-md  w-fit
  border border-1 border-darkT4TextColor/50 backdrop-blur-lg
    text-T1TextColor bg-mainT2Bg hover:bg-hoverBg
    dark:text-darkT2TextColor 
    dark:bg-darkMainT2Bg/80 dark:hover:bg-darkHoverBg
  `,
  icon: `bg-transparent p-2  w-10 h-10 rounded-lg `,
};

const base = " text-2xl md:text-base";
const linkClass = computed(() => {
  return [
    base,
    variants[props.variant],
    props.variant === "icon" && props.isPrimary
      ? `text-red-600 hover:bg-red-10 
    hover:text-red-800 focus:bg-highlight/20`
      : `  text-T2TextColor hover:bg-hoverBg hover:text-T1TextColor focus:bg-hoverBg
      dark:text-darkT2TextColor dark:hover:bg-darkHoverBg 
    dark:hover:text-darkT1TextColor focus:bg-darkHoverBg/20
      `,
  ].join(" ");
});

const activeClass = computed(() => {
  const variants = {
    underline: `text-primaryColor border-b-primary border-b-[2px] rounded-b-none`,
    navigation: `bg-activeWeak/70 !text-activeStrong
    dark:bg-darkActiveWeak/50 dark:text-darkPrimaryColor 
    `,
    ghostButton: ``,
    icon: ``,
  };
  return [variants[props.variant]].join(" ");
});
</script>
