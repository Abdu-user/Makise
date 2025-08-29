<template>
  <div>
    <CustomContainer
      :variant="'ReverseUIContainer'"
      class="flex flex-row"
      :class="radioButtonClass"
    >
      <CustomButton
        v-for="radio in radios"
        :variant="active === radio.text ? 'active' : 'text'"
        :is-primary-color="'theme'"
        :icon="radio.name ? true : false"
        :name="radio.name ? radio.name : undefined"
        :icon-position="'right'"
        class="w-6 h-6"
        @click="((active = radio.text), $emit('radio-click', radio.text))"
    /></CustomContainer>
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { PropType } from "vue";
const props = defineProps({
  radios: {
    type: Array as PropType<Array<{ text: string; name: string | null | undefined }>>,
    required: true,
  },
  activeProp: {
    type: String,
    default: "",
  },
  radioButtonClass: {
    type: String,
    default: "w-fit",
  },
});
const active = ref(props.activeProp);
defineExpose([active]);

defineEmits(["radio-click"]);
</script>

<style scoped></style>
