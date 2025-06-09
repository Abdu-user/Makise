<template>
  <div>
    <CustomButton
      v-if="!isEditingRef"
      icon
      name="material-symbols-light:edit-outline-sharp"
      variant="text"
      @click="edit"
      :class="className"
      :is-primary-color="'primary'"
    />
    <div
      v-else
      :class="`flex ${reversedButtons ? ' flex-row-reverse' : ''}`"
    >
      <CustomButton
        icon
        name="material-symbols-light:save"
        size="md"
        variant="text"
        @click="save"
        :class="className"
        :is-primary-color="'primary'"
      />
      <CustomButton
        icon
        size="lg"
        name="material-symbols-light:close"
        variant="text"
        @click="cancel"
        :class="className"
        :is-primary-color="'primary'"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(["edit", "cancel", "save", "toggle"]);
const props = defineProps({ isEditing: { type: Boolean, default: undefined }, reversedButtons: Boolean, className: String });

const isEditingRef = ref(props.isEditing);

watch(
  () => props.isEditing,
  () => (isEditingRef.value = props.isEditing)
);

const shouldItToggle = () => {
  if (props.isEditing !== undefined) emit("toggle");
  else isEditingRef.value = !isEditingRef.value;
};

const save = () => (emit("save"), shouldItToggle());
const cancel = () => (emit("cancel"), shouldItToggle());
const edit = () => (emit("edit"), shouldItToggle());
</script>
