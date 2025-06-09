<template>
  <CustomContainer
    :id="id"
    :variant="'sectionWithLines'"
    :section-number="'3'"
  >
    <div class="space-y-6 pb-5">
      <h2 class="text-xl font-bold text-gray-800 dark:text-white">CustomInput Props Showcase</h2>

      <div class="flex flex-wrap justify-center gap-4 items-start">
        <div
          v-for="(variantProps, index) in inputVariants"
          :key="index"
          class="p-4 bg-white dark:bg-neutral-800 rounded shadow w-[300px]"
          @click.self="toggleInfo(index)"
          @keydown.enter="toggleInfo(index)"
          role="button"
          tabindex="0"
        >
          <CustomLabel :variant="'default'">
            {{ variantProps.label }}
            <CustomInput v-bind="getTruthyInputProps(variantProps)" />
          </CustomLabel>

          <div
            v-if="activeIndexes.includes(index)"
            class="mt-4 bg-mainT2Bg dark:bg-darkMainT2Bg p-3 rounded text-sm font-mono text-gray-800 dark:text-gray-200"
          >
            <p
              v-for="(value, key) in getTruthyInputProps(variantProps)"
              :key="key"
            >
              <span class="text-blue-600">{{ key }}</span
              >=<span class="text-amber-600">"{{ value }}"</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </CustomContainer>
</template>

<script setup lang="ts">
import { ref } from "vue";

defineProps({ id: { type: String, required: true } });

const activeIndexes = ref<number[]>([]);

function toggleInfo(index: number) {
  const idx = activeIndexes.value.indexOf(index);
  if (idx !== -1) {
    activeIndexes.value.splice(idx, 1);
  } else {
    activeIndexes.value.push(index);
  }
}

// Remove falsy values and the `label` key
function getTruthyInputProps(obj: Record<string, unknown>) {
  return Object.fromEntries(Object.entries(obj).filter(([key, value]) => key !== "label" && (!!value || value === 0)));
}
const inputVariants = [
  {
    label: "Basic Text Input",
    variant: "input",
    size: "md",
    type: "text",
  },
  {
    label: "Large Edit Field",
    variant: "edit",
    size: "lg",
    type: "text",
  },
  {
    label: "Small Number Input with Min/Max",
    variant: "input",
    size: "sm",
    type: "number",
    min: 0,
    maxNumber: 10,
  },
  {
    label: "Email Input with Error",
    variant: "input",
    size: "md",
    type: "email",
    error: true,
  },
  {
    label: "Disabled Checkbox",
    variant: "checkbox",
    size: "lg",
    type: "checkbox",
    disabled: true,
  },
  {
    label: "Disabled Text Input",
    variant: "input",
    size: "f",
    type: "text",
    disabled: true,
  },
  {
    label: "Password Field (sm)",
    variant: "input",
    size: "sm",
    type: "password",
  },
  {
    label: "Search Field",
    variant: "input",
    size: "md",
    type: "search",
  },
  {
    label: "Readonly Text Input",
    variant: "input",
    size: "md",
    type: "text",
    readonly: true,
  },
  {
    label: "Textarea Variant",
    variant: "textarea",
    size: "lg",
    rows: 4,
  },
  {
    label: "Checkbox (Unchecked)",
    variant: "checkbox",
    size: "md",
    type: "checkbox",
    modelValue: false,
  },
  {
    label: "Checkbox (Checked)",
    variant: "checkbox",
    size: "md",
    type: "checkbox",
    modelValue: true,
  },
  {
    label: "Input with Placeholder",
    variant: "input",
    size: "md",
    type: "text",
    placeholder: "Type your name",
  },
  {
    label: "Input with Helper Text",
    variant: "input",
    size: "md",
    type: "text",
    helper: "This is some extra info",
  },
  {
    label: "Input with Error Message",
    variant: "input",
    size: "md",
    type: "text",
    error: true,
    errorMessage: "Field is required",
  },
  {
    label: "Disabled Email Input",
    variant: "input",
    size: "lg",
    type: "email",
    disabled: true,
  },
  {
    label: "Input with Icon",
    variant: "input",
    size: "md",
    type: "text",
    icon: "material-symbols:person",
  },
  {
    label: "Icon Only Checkbox",
    variant: "checkbox",
    size: "sm",
    icon: "material-symbols:check-box-outline-blank",
  },
];
</script>
