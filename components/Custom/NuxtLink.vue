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
  block: { type: Boolean, default: false },
});
const variants = {
  underline: ` inline-block py-3 md:relative z-10 max-md:px-5 max-md:shadow-lg  rounded-md `,
  navigation: `px-5 py-3 md:px-3 md:py-2 gap-2 rounded 
  flex items-center  
  text-T3TextColor
  dark:text-darkT3TextColor hover:bg-highlight/5
  transition-colors duration-200
  dark:hover:bg-darkHoverBg/50 dark:hover:text-darkT2TextColor
  `,
  ghostButton: ` flex items-center py-7 px-6 rounded-2xl  w-fit
  border border-1 border-darkT4TextColor/50 backdrop-blur-lg
    text-T1TextColor bg-mainT2Bg hover:bg-hoverBg
    dark:text-darkT1TextColor 
    dark:bg-darkMainT2Bg/80 dark:hover:bg-darkHoverBg
  `,
};

const base = " text-2xl md:text-base";
const linkClass = computed(() => {
  return [base, variants[props.variant], props.block ? `w-full flex items-center justify-center` : ""].join(" ");
});

const activeClass = computed(() => {
  const variants = {
    underline: `text-primaryColor border-b-primary border-b-[2px] rounded-b-none`,
    navigation: `bg-activeWeak/70 !text-activeStrong
    dark:bg-darkActiveWeak/30 dark:text-darkPrimaryColor 
    `,
    ghostButton: ``,
    icon: ``,
  };
  return [variants[props.variant]].join(" ");
});
</script>
