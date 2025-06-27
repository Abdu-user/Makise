<template>
  <CustomContainer
    :variant="'UIContainer'"
    class="p-6 mt-4"
  >
    <p class="flex text-T3TextColor dark:text-darkT3TextColor font-bold">
      {{ title }}
      <EditButtons
        :reversed-buttons="true"
        class-name="text-textHeader dark:text-darkT3TextColor"
        class="-mt-2 ml-2"
        :is-editing="isEditing"
        @cancel="emit('cancel')"
        @edit="emit('edit')"
        @save="emit('save')"
        @toggle="emit('toggle')"
      />
    </p>
    <slot></slot>
  </CustomContainer>
</template>

<script setup lang="ts">
const emit = defineEmits(["edit", "cancel", "save", "toggle"]);
const props = defineProps({
  title: { type: String, required: true },

  isEditing: { type: Boolean, default: undefined },
  reversedButtons: Boolean,
  className: String,
});
</script>

<style scoped></style>
