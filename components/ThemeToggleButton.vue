<template>
  <CustomButton
    :is-primary-color="'theme'"
    variant="text"
    icon
    class=" "
    @click="toggleTheme"
    name="material-symbols:blur-circular-outline"
  >
  </CustomButton>
</template>

<script setup lang="ts">
const toggleTheme = () => {
  const isDark = document.documentElement.classList.toggle("dark");
  localStorage.setItem("theme", isDark ? "dark" : "light");
};
</script>

<style scoped></style>
