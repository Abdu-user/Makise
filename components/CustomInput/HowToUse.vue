<template>
  <div>
    <CustomContainer
      :variant="'sectionWithLines'"
      :id="id"
      :section-number="'3'"
    >
      <div class="pb-5">
        <CustomHeads
          :heads="'h2'"
          :variant="'h2'"
          class="m-0 mb-3 !p-0"
        >
          Input Component
        </CustomHeads>

        <div>
          <div class="space-y-6 bg-mainBg dark:bg-darkMainBg shadow-md p-6 rounded">
            <CustomHeads
              :heads="'h2'"
              :variant="'h2'"
            >
              Learn how to use the <span class="dark:text-darkT2TextColor text-T2TextColor">CustomInput</span> component
            </CustomHeads>

            <div
              v-for="prop in inputProps"
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

interface InputProp {
  name: string;
  type: string;
  default: string;
  description: string;
}

const inputProps: InputProp[] = [
  {
    name: "size",
    type: `'sm' | 'md' | 'lg' | 'f' | null`,
    default: "null",
    description: "Controls the size of the input (small, medium, large, or full width).",
  },
  {
    name: "variant",
    type: `'edit' | 'input' | 'checkbox' | null`,
    default: "null",
    description: "Determines the visual style of the input, such as bordered or underline-only.",
  },
  {
    name: "type",
    type: "string",
    default: `"text"`,
    description: "Sets the input type (e.g., text, number, password, email, checkbox).",
  },
  {
    name: "maxNumber",
    type: "number | null",
    default: "null",
    description: "Restricts the maximum value (only applies when `type` is 'number').",
  },
  {
    name: "min",
    type: "number",
    default: "-Infinity",
    description: "Restricts the minimum value (only applies when `type` is 'number').",
  },
  {
    name: "error",
    type: "boolean",
    default: "false",
    description: "Marks the input as invalid and applies visual cues (e.g., red underline).",
  },
  {
    name: "disabled",
    type: "boolean",
    default: "false",
    description: "Disables the input field, making it non-interactive and dimmed.",
  },
];
</script>
