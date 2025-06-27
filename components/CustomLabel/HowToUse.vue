<template>
  <div>
    <CustomContainer
      :variant="'sectionWithLines'"
      :id="id"
      :section-number="sectionNumber"
    >
      <div class="pb-5">
        <CustomHeads
          :heads="'h2'"
          :variant="'h2'"
          class="m-0 mb-3 !p-0"
        >
          Label Component
        </CustomHeads>

        <div>
          <div class="space-y-6 bg-mainBg dark:bg-darkMainBg shadow-md p-6 rounded">
            <CustomHeads
              :heads="'h2'"
              :variant="'h2'"
            >
              Learn how to use the <span class="dark:text-darkT2TextColor text-T2TextColor">CustomLabel</span> component
            </CustomHeads>

            <div
              v-for="prop in labelProps"
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
defineProps({ id: { type: String, required: true }, sectionNumber: { type: [String, Number], required: true } });

interface LabelProp {
  name: string;
  type: string;
  default: string;
  description: string;
}

const labelProps: LabelProp[] = [
  {
    name: "error",
    type: "string | undefined",
    default: "undefined",
    description: "Text displayed as an error message below the label. Triggers visual error styling.",
  },
  {
    name: "is-animating-n",
    type: "number | undefined",
    default: "undefined",
    description: "Triggers shake animation when this number changes.",
  },
  {
    name: "animation-time",
    type: "number",
    default: "500",
    description: "Time in milliseconds for the shake animation duration.",
  },
];
</script>
