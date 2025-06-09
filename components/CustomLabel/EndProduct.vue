<template>
  <div class="mt-8">
    <CustomContainer
      :variant="'sectionWithLines'"
      :section-number="'1'"
      :id="id"
    >
      <div class="pb-5">
        <CustomHeads
          :variant="'h2'"
          :heads="'h2'"
          class="pt-0"
        >
          CustomLabel Showcase
        </CustomHeads>
        <CustomParagraph class="mt-0">
          Try out different props for the <span class="text-T2TextColor dark:text-darkT2TextColor">CustomLabel</span> component.
        </CustomParagraph>

        <div class="grid md:grid-cols-[9rem,1fr] gap-y-6 bg-mainT2Bg dark:bg-darkMainT2Bg p-4 rounded">
          <!-- Controls -->
          <div class="space-y-3 px-2">
            <CustomLabel>
              <span class="text-sm">Label Content</span>
              <CustomInput
                type="text"
                :variant="'input'"
                :size="'lg'"
                v-model="labelContent"
              />
            </CustomLabel>

            <CustomLabel>
              <span class="text-sm">Error text</span>
              <CustomInput
                type="text"
                :size="'lg'"
                v-model="error"
                placeholder="Enter error"
              />
            </CustomLabel>

            <CustomLabel>
              <span class="text-sm">Animation Time (ms)</span>
              <CustomInput
                type="number"
                :variant="'input'"
                :size="'lg'"
                v-model.number="animationTime"
              />
            </CustomLabel>

            <CustomButton
              :variant="'outlined'"
              :is-primary-color="'theme'"
              class="mt-2 transition"
              @click="triggerShake"
              :disabled="!error"
            >
              Trigger Shake
            </CustomButton>
          </div>

          <!-- Live Preview -->
          <div class="flex items-center justify-center">
            <CustomLabel
              :error="error || undefined"
              :is-animating-n="shakeKey"
              :animation-time="animationTime"
            >
              {{ labelContent }}
            </CustomLabel>
          </div>
        </div>

        <!-- Code Viewer -->
        <div class="relative bg-gray-100 dark:bg-neutral-800 rounded p-4 mt-6">
          <CustomButton
            :variant="'outlined'"
            :is-primary-color="'theme'"
            class="absolute top-2 right-2"
            @click="copyCode"
          >
            {{ copied ? "Copied!" : "Copy" }}
          </CustomButton>
          <code ref="codeRef">
            <div
              v-for="(line, i) in codeLines"
              :key="i"
              class="flex justify-start"
            >
              <span
                v-for="(token, j) in line"
                :key="j"
                :class="token.color"
                class="w-auto h-4"
              >
                {{ token.text }}
              </span>
            </div>
          </code>
        </div>
      </div>
    </CustomContainer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

defineProps({ id: { type: String, required: true } });

const labelContent = ref("Label Content");
const error = ref("");
const animationTime = ref(500);
const shakeKey = ref(0);
const copied = ref(false);
const codeRef = ref();

onMounted(() => {
  console.log(codeRef.value.innerText);
});

function triggerShake() {
  shakeKey.value++;
}

const codeLines = computed(() => {
  const lines: Array<Array<{ text: string; color: string }>> = [];

  lines.push([
    { text: "<", color: "text-gray-400" },
    { text: "CustomLabel", color: "text-pink-500" },
  ]);

  if (error.value) {
    lines.push([
      { text: ":error=", color: "text-blue-600" },
      { text: `"${error.value}"`, color: "text-amber-600" },
    ]);
  }

  if (shakeKey.value > 0) {
    lines.push([
      { text: ":is-animating-n=", color: "text-blue-600" },
      { text: `"${shakeKey.value}"`, color: "text-amber-600" },
    ]);
  }

  if (animationTime.value !== 500) {
    lines.push([
      { text: ":animation-time=", color: "text-blue-600" },
      { text: `"${animationTime.value}"`, color: "text-amber-600" },
    ]);
  }

  lines.push([{ text: ">", color: "text-gray-400" }]);
  lines.push([{ text: "  Label Content", color: "text-white" }]);
  lines.push([
    { text: "</", color: "text-gray-400" },
    { text: "CustomLabel", color: "text-pink-500" },
    { text: ">", color: "text-gray-400" },
  ]);

  return lines;
});

const copyCode = async () => {
  const text = codeLines.value.map((tokens) => tokens.map((t) => t.text).join("")).join("\n");
  await navigator.clipboard.writeText(text);
  copied.value = true;
  setTimeout(() => (copied.value = false), 2000);
};
</script>
