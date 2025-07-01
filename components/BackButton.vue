<template>
  <CustomButton
    :variant="'text'"
    :is-primary-color="'theme'"
    :new-colors="true"
    icon
    name="material-symbols-light:keyboard-backspace"
    aria-label="back button"
    size="f"
    :rounded="true"
    @click="router.back"
  />
</template>

<script setup lang="ts">
const router = useRouter();
</script>

<style scoped></style>
