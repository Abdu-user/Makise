<template>
  <div class="relative flex items-center">
    <!-- <template> -->
    <template v-if="!showPassword">
      <CustomInput
        :id="id"
        v-model="model"
        :type="'password'"
        v-bind="$attrs"
        variant="input"
      />
      <CustomButton
        :is-primary-color="'theme'"
        class="absolute right-2"
        icon
        size="md"
        variant="plain"
        name="material-symbols-light:eye-tracking-outline-sharp"
        @click="toggleShowPassword"
      />
    </template>
    <template v-else>
      <CustomInput
        :id="id"
        v-model="model"
        type="text"
        v-bind="$attrs"
        variant="input"
      />
      <CustomButton
        :is-primary-color="'theme'"
        class="absolute right-2 text-textHeader"
        icon
        size="md"
        variant="plain"
        name="material-symbols-light:eye-tracking-rounded"
        @click="toggleShowPassword"
      />
    </template>
    <!-- </template> -->
  </div>
</template>

<script setup lang="ts">
const model = defineModel<string | number>(); // Automatically handles `v-model`
const props = defineProps({ id: String, showPassword: Boolean, type: String });
const showPassword = ref(props.showPassword || false);
const toggleShowPassword = () => (showPassword.value = !showPassword.value);
</script>
