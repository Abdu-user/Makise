<template>
  <div :class="containerClass">
    <Transition
      enter-active-class="transition-all duration-500 ease-in-out"
      enter-from-class="opacity-0 -translate-y-10 scale-90"
      enter-to-class="opacity-100 translate-y-0 scale-100"
      leave-active-class="transition-all duration-500 ease-in-out"
      leave-from-class="opacity-100 translate-y-0 scale-100"
      leave-to-class="opacity-0 -translate-y-10 scale-90 pointer-events-none"
      appear
    >
      <div
        :class="contentClass"
        v-if="isOpen"
      >
        <p class="max-h-16 overflow-auto scrollable-box">
          <Icon
            name="material-symbols:error-outline-rounded"
            class="text-accent w-10 h-10 inline-block -mb-2 mr-1"
          />
          <slot></slot>
        </p>
        <CustomButton2
          v-if="ok"
          :class="`absolute -bottom-5 
          text-textWhite  backdrop-blur-md  right-2  shadow-lg border `"
          variant="tonal"
          @click="emit('handleOk')"
        >
          OK
        </CustomButton2>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(["afterTimeout", "handleOk"]);
const props = defineProps({
  variant: { type: String, default: "error" },
  timeoutTime: { type: Number, default: 500 },
  ok: { type: Boolean, default: false },
  isOpen: { type: Boolean, required: true },
});
const containerClass = computed(() => {
  const variants = {
    error: "fixed z-[1]  right-0 left-0 top-0 m flex justify-center ",
  };
  return [variants[props.variant as keyof typeof variants]].join(" ");
});
const contentClass = computed(() => {
  const variants = {
    error: `max-w-sm bg-red-400/30 w-full backdrop-blur-md
     absolute top-8 mx-50 px-5 py-4 rounded-lg
     text-textWhite text-2xl
     `,
  };

  return [variants[props.variant as keyof typeof variants]].join(" ");
});

onMounted(() => {
  setTimeout(() => {
    emit("afterTimeout");
  }, props.timeoutTime);
});
</script>

<style scoped>
/* For Chrome, Edge, Safari */
.scrollable-box::-webkit-scrollbar {
  width: 8px;
}
.scrollable-box::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}
.scrollable-box::-webkit-scrollbar-thumb {
  background-color: #f63b3b; /* Tailwind blue-500 */
  border-radius: 4px;
  border: 2px solid #f1f1f1;
}

/* For Firefox */
.scrollable-box {
  scrollbar-width: thin;
  scrollbar-color: #f6483b #f1f1f1;
}
</style>
