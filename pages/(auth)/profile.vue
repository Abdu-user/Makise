<template>
  <ProfileTopInfoImages />
  <ProfileNavLinks />
</template>
<script setup lang="ts">
useHead({
  title: "Profile",
  meta: [{ name: "description", content: "User profile page for authenticated users." }],
});

definePageMeta({
  layout: "main",
  middleware: "auth",
});
</script>
