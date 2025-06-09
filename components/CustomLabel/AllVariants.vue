<template>
  <CustomContainer
    :id="id"
    variant="sectionWithLines"
    section-number="3"
  >
    <div class="space-y-6 pb-5">
      <h2 class="text-xl font-bold text-gray-800 dark:text-white">CustomLabel Props Showcase</h2>

      <div class="flex flex-wrap justify-center gap-4 items-start">
        <div
          v-for="(variantProps, index) in labelVariants"
          :key="index"
          class="p-4 bg-white dark:bg-neutral-800 rounded shadow w-[300px]"
          @click.self="toggleInfo(index)"
          @keydown.enter="toggleInfo(index)"
          role="button"
          tabindex="0"
        >
          <CustomLabel v-bind="getTruthyLabelProps(variantProps)">
            {{ variantProps.label }}
          </CustomLabel>

          <div
            v-if="activeIndexes.includes(index)"
            class="mt-4 bg-mainT2Bg dark:bg-darkMainT2Bg p-3 rounded text-sm font-mono text-gray-800 dark:text-gray-200"
          >
            <p
              v-for="(value, key) in getTruthyLabelProps(variantProps)"
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
function getTruthyLabelProps(obj: Record<string, unknown>) {
  return Object.fromEntries(Object.entries(obj).filter(([key, value]) => key !== "label" && (value || value === 0 || value === false)));
}

// Test variants of CustomLabel
const labelVariants = [
  {
    label: "Default Variant",
    variant: "default",
  },
  {
    label: "With Error Message",
    variant: "default",
    error: "Field is required",
  },
  {
    label: "Animated Shake (error)",
    variant: "default",
    error: "Please check this",
    isAnimatingN: 1,
    animationTime: 1000,
  },
  {
    label: "Animation Disabled",
    variant: "default",
    error: "Error shown without animation",
    isAnimatingN: 0,
    animationTime: 0,
  },
];
</script>
