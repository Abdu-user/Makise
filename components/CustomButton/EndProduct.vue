<template>
  <div class="mt-8">
    <CustomContainer
      :variant="'section'"
      :id="id"
    >
      <div>
        <CustomContainer
          :variant="'numbered'"
          class="mx-auto"
        >
          1
        </CustomContainer>
        <CustomContainer :variant="'line'" />
      </div>
      <div>
        <CustomHeads
          :heads="'h2'"
          :variant="'h2'"
          class="pt-0"
        >
          Command the component
        </CustomHeads>
        <CustomParagraph class="mt-0">
          Try out the <span class="dark:text-darkT2TextColor text-T2TextColor">CustomButton</span> component
        </CustomParagraph>

        <div :class="`grid  bg-mainT2Bg dark:bg-darkMainT2Bg pb-2`">
          <div
            :class="`
           grid grid-cols-3 md:grid-cols-[7rem,repeat(7,1fr)]
          shadow-lg pb-5
           bg-mainBg dark:bg-darkMainBg mx-2 mt-0`"
          >
            <div class="mx-4 w-20 flex items-center justify-center text-4xl text-T2TextColor dark:text-darkT2TextColor">
              {{ counter }}
            </div>
            <CustomLabel
              class="grid"
              v-for="prop in propsArray"
            >
              <span class="capitalize text-center">
                {{ prop }}
              </span>
              <CustomInput
                id="isPrimaryColor"
                :type="'checkbox'"
                :variant="'checkbox'"
                class="!w-10 !h-10 mx-auto"
                v-model="props[prop as keyof typeof props]"
              />
            </CustomLabel>
          </div>
          <div class="grid md:grid-cols-[9rem,1fr] gap-y-6">
            <div class="mx-2 px-2 pb-4 bg-mainBg dark:bg-darkMainBg grid max-md:grid-cols-3 justify-center items-center gap-3">
              <select
                name=""
                id=""
                v-model="variant"
                class="px-3 py-2 bg-slate-500/50 text-textWhite rounded-md"
              >
                <option
                  class="bg-mainBg text-textColor"
                  v-for="(variant, index) in variants"
                  :key="variant"
                  :value="index"
                >
                  {{ variant }}
                </option>
              </select>
              <select
                v-model="size"
                class="px-3 py-2 bg-slate-500/50 text-textWhite rounded-md"
              >
                <option
                  :value="size"
                  v-for="size in sizes"
                  :key="size"
                  class="bg-mainBg text-textColor"
                >
                  {{ size }}
                </option>
              </select>
              <select
                :disabled="!props.icon || props.only"
                v-model="iconPosition"
                class="px-3 py-2 bg-slate-500/50 text-textWhite rounded-md"
              >
                <option
                  :value="position"
                  v-for="position in iconPositions"
                  :key="position"
                  class="bg-mainBg text-textColor"
                >
                  {{ position }}
                </option>
              </select>
            </div>
            <div class="flex items-center justify-center">
              <CustomButton
                :variant="variants[variant]"
                :is-primary-color="props.color ? 'primary' : 'theme'"
                @click="counter++"
                :block="props.block"
                :loading="props.loading"
                :disabled="props.disabled"
                :rounded="props.rounded"
                :name="props.icon ? 'material-symbols:radio-button-partial-outline' : ''"
                :icon="props.only"
                :icon-position="iconPosition"
                :size="size"
                >CustomButton</CustomButton
              >
            </div>
          </div>
          <div class="relative bg-gray-100 dark:bg-neutral-800 rounded p-4 mt-6">
            <button
              class="absolute top-2 right-2 text-sm px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
              @click="copyCode"
            >
              {{ copied ? "Copied!" : "Copy" }}
            </button>

            <!-- Use one div (or p) per code line -->
            <!-- <pre class="font-mono text-sm"> -->

            <code>
              <div
                v-for="(line, i) in codeLines"
                :key="i"
                class="flex justify-start"
                :class="i === 0 ? '' : i === codeLines.length - 1 ? '' : 'pl-4'"
              >
                <!-- Render each token inline -->
                <span
                  v-for="(token, j) in line"
                  :key="j"
                  :class="[token.color]"
                  class="w-auto h-4"
                >
                  {{ token.text }}
                </span>
              </div>
            </code>
            <!-- </pre> -->
          </div>
        </div>
      </div>
    </CustomContainer>
  </div>
</template>

<script setup lang="ts">
import type { CustomButtonVaraintsType } from "~/types/customButtonType";
defineProps({
  id: { type: String, required: true },
});
const variants: CustomButtonVaraintsType[] = ["default", "outlined", "plain", "primary", "text", "tonal"];
const iconPositions = ["left", "right", "top"];
const iconPosition = ref<"left" | "right" | "top">("left");
const sizes = ["lg", "md", "sm"];
const size = ref<"lg" | "md" | "sm">("md");
const variant = ref(0);
const counter = ref(0);
const props = ref({
  disabled: false,
  color: false,
  rounded: false,
  block: false,
  loading: false,
  only: false,
  icon: false,
});
const propsArray = ["color", "disabled", "block", "rounded", "loading", "only", "icon"];
watch(
  () => props.value.only,
  () => {
    if (!props.value.icon) props.value.icon = true;
  }
);

import { ref, computed } from "vue";

// Boolean props to include when true
const boolProps = ["block", "loading", "disabled", "rounded", "only", "icon"] as const;

// Build a 2D array of tokens: [{ text, colorClass }, …]
const codeLines = computed(() => {
  const lines: Array<Array<{ text: string; color: string }>> = [];

  // Opening tag
  lines.push([
    { text: "<", color: "text-gray-400" },
    { text: "CustomButton", color: "text-pink-500" },
  ]);

  // Required props
  lines.push([
    { text: ":variant=", color: "text-blue-600" },
    { text: `"${variants[variant.value]}"`, color: "text-amber-600" },
  ]);
  lines.push([
    { text: ":is-primary-color=", color: "text-blue-600" },
    { text: `"${props.value.color ? "primary" : "theme"}"`, color: "text-amber-600" },
  ]);

  // Boolean props
  boolProps.forEach((p) => {
    if (props.value[p]) {
      lines.push([
        { text: `:${p}=`, color: "text-blue-600" },
        { text: `"true"`, color: "text-amber-600" },
      ]);
    }
  });

  // Icon props
  if (props.value.icon) {
    lines.push([
      { text: ":name=", color: "text-blue-600" },
      { text: `"'material-symbols:radio-button-partial-outline'"`, color: "text-amber-600" },
    ]);
    lines.push([
      { text: ":icon-position=", color: "text-blue-600" },
      { text: `"${iconPosition.value}"`, color: "text-amber-600" },
    ]);
  }

  // Size (always)
  lines.push([
    { text: ":size=", color: "text-blue-600" },
    { text: `"${size.value}"`, color: "text-amber-600" },
  ]);

  // Closing
  lines.push([{ text: ">", color: "text-gray-400" }]);

  lines.push([
    { text: "</", color: "text-gray-400" },
    { text: "CustomButton", color: "text-pink-500" },
    { text: ">", color: "text-gray-400" },
  ]);

  return lines;
});

const copied = ref(false);
const copyCode = async () => {
  const text = codeLines.value.map((tokens) => tokens.map((t) => t.text).join(" ")).join("\n");
  await navigator.clipboard.writeText(text);
  copied.value = true;
  setTimeout(() => (copied.value = false), 2000);
};
</script>

<style scoped></style>
