<template>
  <div>
    <CustomContainer
      :variant="'sectionWithLines'"
      :id="id"
      :section-number="'2'"
    >
      <div class="pb-5">
        <CustomHeads
          :heads="'h2'"
          :variant="'h2'"
          class="m-0 mb-3 !p-0"
        >
          Default Variant
        </CustomHeads>

        <div>
          <div class="space-y-6 bg-gray-100 dark:bg-neutral-900 p-6 rounded">
            <CustomHeads
              :heads="'h2'"
              :variant="'h2'"
            >
              Learn how to use <span class="dark:text-darkT2TextColor text-T2TextColor">CustomButton</span> component
            </CustomHeads>

            <div
              v-for="prop in buttonProps"
              :key="prop.name"
              class="p-4 rounded bg-white dark:bg-neutral-800 border border-gray-300 dark:border-neutral-700"
            >
              <h3 class="text-lg font-semibold text-T2TextColor dark:text-darkT2TextColor">
                <span class="text-blue-600">{{ prop.name }}</span>
                <span class="text-sm text-gray-600 dark:text-gray-400">({{ prop.type }})</span>
              </h3>
              <p class="text-sm text-gray-700 dark:text-gray-300 mt-1">
                {{ prop.description }}
              </p>
              <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
                <strong>Default:</strong> <code class="font-mono text-amber-600">{{ prop.default }}</code>
              </p>
            </div>
          </div>
        </div>
      </div>
    </CustomContainer>
  </div>
</template>

<script setup lang="ts">
defineProps({ id: { type: String, required: true } });
interface ButtonProp {
  name: string;
  type: string;
  default: string;
  description: string;
}

const buttonProps: ButtonProp[] = [
  {
    name: "variant",
    type: `'default' | 'outlined' | 'plain' | 'primary' | 'text' | 'tonal'`,
    default: `'default'`,
    description: "Controls the button's visual style and color treatment.",
  },
  {
    name: "is-primary-color",
    type: `'primary' | 'theme'`,
    default: `'theme'`,
    description: "Switches between primary brand color or theme color.",
  },
  {
    name: "block",
    type: "boolean",
    default: "false",
    description: "Makes the button take the full width of its container.",
  },
  {
    name: "loading",
    type: "boolean",
    default: "false",
    description: "Shows a loading spinner and disables interactions.",
  },
  {
    name: "disabled",
    type: "boolean",
    default: "false",
    description: "Disables the button.",
  },
  {
    name: "rounded",
    type: "boolean",
    default: "false",
    description: "Applies a rounded border style.",
  },
  {
    name: "name",
    type: "string",
    default: '""',
    description: "Specifies the icon name from the icon set.",
  },
  {
    name: "icon",
    type: "boolean",
    default: "false",
    description: "If true, displays only the icon (icon-only mode).",
  },
  {
    name: "icon-position",
    type: `'left' | 'right' | 'top'`,
    default: `'left'`,
    description: "Controls where the icon appears relative to the label.",
  },
  {
    name: "size",
    type: `'lg' | 'md' | 'sm'`,
    default: `'md'`,
    description: "Adjusts the button size.",
  },
];
</script>

<style scoped></style>
