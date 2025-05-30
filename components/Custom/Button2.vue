<script setup lang="ts">
/**
 * A fully featured Vue button component inspired by Vuetify's <v-btn>.
 *
 * Supports variants, sizes, loading state, icons, stacking, full width, and rounded styles.
 *
 * @component AppButton
 *
 * @props
 * @prop {string} variant - The button style. One of: "default", "outlined", "tonal", "text", "plain". Default: "default".
 * @prop {string} color - The Tailwind color name (e.g. "blue", "red", "green"). Default: "blue".
 * @prop {string} size - The button size. One of: "sm", "md", "lg". Default: "md".
 * @prop {boolean} icon - If true, makes the button icon-only (no label). Default: false.
 * @prop {string|object|null} prependIcon - A component to render before the label (e.g. an icon). Default: null.
 * @prop {string|object|null} appendIcon - A component to render after the label (e.g. an icon). Default: null.
 * @prop {boolean} stacked - If true, stacks icon and label vertically. Default: false.
 * @prop {boolean} loading - Shows a loading spinner and disables the button. Default: false.
 * @prop {boolean} disabled - Disables the button. Default: false.
 * @prop {boolean} rounded - Uses fully rounded (pill-shaped) button style. Default: true.
 * @prop {boolean} block - Makes the button take full width of its container. Default: false.
 *
 * @slots
 * @slot default - The button label/content.
 *
 * @example
 * <AppButton color="green" variant="outlined" :loading="isLoading">
 *   Save
 * </AppButton>
 */
import { computed } from "vue";

const props = defineProps({
  variant: { type: String, default: null },
  color: { type: String, default: "red" },
  size: { type: String, default: "md" },
  icon: { type: Boolean, default: false },
  prependIcon: { type: String, default: null },
  appendIcon: { type: String, default: null },
  name: { type: String, default: null },
  stacked: { type: Boolean, default: false },
  loading: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  rounded: { type: Boolean, default: false },
  block: { type: Boolean, default: false },
});

const buttonClass = computed(() => {
  const base = "inline-flex items-center justify-center font-medium transition duration-150 focus:outline-none";
  const variants = {
    default: `shadow-md text-red-600 hover:bg-red-200`,
    primary: `bg-primary hover:bg-active text-white font-semibold 
              rounded transition-colors text-base`,
    outlined: `border  border-1 border-red-600 text-red-600 bg-transparent hover:bg-red-50`,
    tonal: `bg-red-100 text-red-800 hover:bg-red-200`,
    text: `text-red-600 bg-transparent hover:bg-red-10 hover:text-red-800`,
    plain: `text-gray-500 bg-transparent hover:bg-gray-100`,
    // active: `shadow-md bg-mainBg  hover:bg-red-200`,
  };
  const sizes = {
    sm: `text-sm ${props.icon ? "p-0" : "px-3 py-1.5"}`,
    md: `text-base ${props.icon ? "p-0" : "px-4 py-2"}`,
    lg: `text-lg ${props.icon ? " p-0" : "px-5 py-3"}`,
  };

  return [
    base,
    variants[props.variant as keyof typeof variants] || (props.icon ? variants.text : variants.default),
    sizes[props.size as keyof typeof sizes] || sizes.md,
    props.rounded ? "rounded-full" : "rounded-md",
    props.icon ? "w-10 h-10 p-0" : "",
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
    <!-- Loading Spinner -->
    <span
      v-if="loading"
      class="animate-spin mr-2"
      :class="iconSizeClass"
      >⏳</span
    >

    <!-- Prepend Icon -->
    <Icon
      v-if="(!loading && prependIcon) || (icon && name)"
      :name="prependIcon || name"
      :class="[iconSizeClass, stacked ? 'mb-1' : icon ? '' : 'mr-2']"
    />

    <!-- Button Label -->
    <span
      v-if="!icon"
      class="inline-flex items-center"
    >
      <slot>
        {{
          appendIcon || (prependIcon && !icon)
            ? 'Want to display only Icon?, you have to pass "icon" prop. This is adefault slot message'
            : ""
        }}
      </slot>
    </span>

    <!-- Append Icon -->
    <Icon
      v-if="!loading && appendIcon && !stacked && !name"
      :name="appendIcon"
      :class="[iconSizeClass, stacked ? 'mt-1' : icon ? '' : 'ml-2']"
    />
  </button>
</template>
