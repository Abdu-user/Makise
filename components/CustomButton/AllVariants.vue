<template>
  <CustomContainer
    :id="id"
    :variant="'sectionWithLines'"
    :section-number="sectionNumber"
  >
    <div class="space-y-6 pb-5">
      <h2 class="text-xl font-bold text-gray-800 dark:text-white">CustomButton2 Props Showcase</h2>

      <div class="flex flex-wrap gap-4 items-start">
        <div
          v-for="(variantProps, index) in buttonVariants"
          :key="index"
          class="p-4 bg-white dark:bg-neutral-800 rounded shadow"
          @click="(variantProps.disabled || variantProps.loading) && toggleInfo(index)"
          @keydown.enter="(variantProps.disabled || variantProps.loading) && toggleInfo(index)"
          :role="variantProps.disabled || variantProps.loading ? 'button' : ''"
          :tabindex="variantProps.disabled || variantProps.loading ? '0' : '-1'"
        >
          <CustomButton
            :variant="variantProps.variant"
            :size="variantProps.size"
            :is-primary-color="variantProps.color ? 'primary' : 'theme'"
            :block="variantProps.block"
            :rounded="variantProps.rounded"
            :disabled="variantProps.disabled ? true : false"
            :loading="variantProps.loading"
            :only="variantProps.only"
            :icon="variantProps.icon"
            :name="variantProps.icon ? 'material-symbols:star-outline' : ''"
            :icon-position="variantProps.iconPosition"
            @click="toggleInfo(index)"
          >
            {{ variantProps.variant }}
          </CustomButton>

          <div
            v-if="activeIndexes.includes(index)"
            class="mt-4 bg-mainT2Bg dark:bg-darkMainT2Bg p-3 rounded text-sm font-mono text-gray-800 dark:text-gray-200"
          >
            <p
              v-for="(value, key) in variantProps"
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
import { buttonVariants } from "~/buttonVariantsData";

defineProps({ id: { type: String, required: true }, sectionNumber: { type: [String, Number], required: true } });

const activeIndexes = ref<number[]>([]);

function toggleInfo(index: number) {
  const anIndex = activeIndexes.value.indexOf(index);

  if (anIndex > -1) {
    activeIndexes.value.splice(anIndex, 1);
  } else {
    activeIndexes.value.push(index);
  }
}
</script>

<style scoped></style>
