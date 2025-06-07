<template>
  <div class="p-6 space-y-6 bg-mainT2Bg dark:bg-darkMainT2Bg text-T2TextColor dark:text-darkT2TextColor">
    <div class="space-y-4">
      <!-- Controls -->
      <div class="grid grid-cols-3 gap-x-10 gap-y-2">
        <CustomLabel
          >Type

          <select
            v-model="type"
            class="border dark:border-T2TextColor p-2 rounded bg-mainT2Bg dark:bg-darkMainT2Bg text-T2TextColor dark:text-darkT2TextColor"
          >
            <option value="text">Text</option>
            <option value="password">Password</option>
            <option value="email">Email</option>
            <option value="number">Number</option>
            <option value="checkbox">Checkbox</option>
          </select>
        </CustomLabel>

        <CustomLabel
          >Variant

          <select
            v-model="variant"
            class="border dark:border-T2TextColor p-2 rounded bg-mainT2Bg dark:bg-darkMainT2Bg text-T2TextColor dark:text-darkT2TextColor"
          >
            <option value="input">Input</option>
            <option value="edit">Edit</option>
            <option value="checkbox">Checkbox</option>
          </select>
        </CustomLabel>

        <CustomLabel
          >Size

          <select
            v-model="size"
            class="border dark:border-T2TextColor p-2 rounded bg-mainT2Bg dark:bg-darkMainT2Bg text-T2TextColor dark:text-darkT2TextColor"
          >
            <option :value="null">None</option>
            <option value="sm">Small</option>
            <option value="md">Medium</option>
            <option value="lg">Large</option>
            <option value="f">Full</option>
          </select>
        </CustomLabel>
        <CustomLabel
          >Min number

          <CustomInput
            v-model.number="min"
            type="number"
            class="border p-2 rounded"
            :disabled="type !== 'number'"
          />
        </CustomLabel>

        <CustomLabel
          >Max number
          <CustomInput
            v-model.number="maxNumber"
            type="number"
            class="border p-2 rounded"
            :disabled="type !== 'number'"
          />
        </CustomLabel>

        <CustomLabel class="inline-flex items-center gap-2">
          Error State
          <CustomInput
            type="checkbox"
            :disabled="type === 'checkbox' || type === 'number'"
            v-model="error"
          />
        </CustomLabel>
      </div>

      <!-- Bound value display -->
      <div>
        <CustomLabel>Model Value</CustomLabel>
        <div class="px-4 py-2 bg-gray-100 dark:bg-neutral-800 rounded">
          {{ inputValue }}
        </div>
      </div>
      <!-- Live preview -->
      <CustomLabel>
        Preview
        <CustomInput
          v-model="inputValue"
          :type="type"
          :variant="variant"
          :size="size"
          :min="min || 0"
          :max-number="maxNumber"
          :error="error"
        />
      </CustomLabel>
    </div>
    <div class="relative bg-gray-100 dark:bg-neutral-800 rounded p-4">
      <button
        class="absolute top-2 right-2 text-sm px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
        @click="copyToClipboard"
      >
        {{ copied ? "Copied!" : "Copy" }}
      </button>

      <p class="grid font-mono text-sm space-y-1">
        <span><span class="text-pink-500">&lt;CustomInput</span></span>
        <span>
          <span class="text-blue-600">v-model</span>=
          <span class="text-amber-600">"inputValue"</span>
        </span>
        <span>
          <span class="text-blue-600">:type</span>=
          <span class="text-amber-600">"{{ type }}"</span>
        </span>
        <span>
          <span class="text-blue-600">:variant</span>=
          <span class="text-amber-600">"{{ variant }}"</span>
        </span>
        <span v-if="size">
          <span class="text-blue-600">:size</span>=
          <span class="text-amber-600">"{{ size }}"</span>
        </span>
        <span v-if="min">
          <span class="text-blue-600">:min</span>=
          <span class="text-amber-600">"{{ min }}"</span>
        </span>
        <span v-if="maxNumber">
          <span class="text-blue-600">:max-number</span>=
          <span class="text-amber-600">"{{ maxNumber }}"</span>
        </span>
        <span v-if="error">
          <span class="text-blue-600">:error</span>=
          <span class="text-amber-600">"true"</span>
        </span>
        <span><span class="text-pink-500">/&gt;</span></span>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

type InputType = "text" | "password" | "email" | "number" | "checkbox";
type VariantType = "input" | "edit" | "checkbox";
type SizeType = null | "sm" | "md" | "lg" | "f";

const inputValue = ref<string | number | boolean>("Default value");
const type = ref<InputType>("text");
const variant = ref<VariantType>("input");
const size = ref<SizeType>(null);
const min = ref<number | null>(null);
const maxNumber = ref<number | null>(null);
const error = ref<boolean>(false);

watch(type, () => {
  if (type.value === "checkbox") {
    inputValue.value = false;
    variant.value = "checkbox";
  } else if (type.value === "number") {
    inputValue.value = 0;
    if (variant.value === "checkbox") variant.value = "input";
  } else {
    inputValue.value = "Default value";
    if (variant.value === "checkbox") variant.value = "input";
  }
});

const copied = ref(false);

const copyCode = computed(() => {
  const props = [
    `v-model="inputValue"`,
    `:type="${JSON.stringify(type.value)}"`,
    `:variant="${JSON.stringify(variant.value)}"`,
    size.value ? `:size="${JSON.stringify(size.value)}"` : null,
    min.value !== null ? `:min="${min.value}"` : null,
    maxNumber.value !== null ? `:max-number="${maxNumber.value}"` : null,
    error.value ? `:error="true"` : null,
  ]
    .filter(Boolean)
    .join("\n  ");
  return `<CustomInput\n  ${props}\n/>`;
});

const copyToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(copyCode.value);
    copied.value = true;
    setTimeout(() => (copied.value = false), 2000);
  } catch (err) {
    console.error("Copy failed", err);
  }
};
</script>

<style scoped>
select:disabled,
input:disabled {
  background-color: #f3f4f6;
  cursor: not-allowed;
}
</style>
