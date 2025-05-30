<template>
  <div :class="` ${customClass || 'w-full'} `">
    <div
      ref="barRef"
      class="h-4 rounded-full overflow-hidden relative"
      :style="{ backgroundColor: bgColor || '#e5e7eb' }"
    >
      <div
        v-if="showPercent"
        class="mb-1 text-sm font-medium text-gray-700 text-right absolute top-0 left-1/2 -translate-x-1/2 pr-2"
        :class="percentColor"
      >
        {{ percent }}%
      </div>
      <div
        class="h-full transition-all ease-out"
        :style="{
          width: isVisible ? percent + '%' : '0%',
          transitionDuration: transition + 'ms',
          background: `linear-gradient(to right, ${props.startColor || 'blue'}, ${props.stopColor || 'blue'})`,
        }"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";

const props = defineProps({
  percent: {
    type: Number,
    required: true,
  },
  startColor: String,
  stopColor: String,
  bgColor: String, // maps to `background`
  transition: {
    type: Number,
    default: 1000,
  },
  class: {
    type: String,
    default: "",
  },
  viewport: {
    type: Boolean,
    default: true,
  },
  showPercent: {
    type: Boolean,
    default: false,
  },
  percentColor: {
    type: String,
    default: "text-gray-700",
  },
});

const barRef = ref(null);
const isVisible = ref(!props.viewport); // if viewport is false, always visible
const customClass = props.class;

const gradientClass = ref("");

onMounted(() => {
  if (!props.viewport || !barRef.value) return;

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        isVisible.value = true;
        observer.disconnect();
      }
    },
    { threshold: 0.2 }
  );

  observer.observe(barRef.value);
});
</script>
