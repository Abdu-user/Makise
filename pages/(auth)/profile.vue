<template>
  <ClientOnly>
    <ProfileTopInfoImages />
  </ClientOnly>
</template>
<script setup lang="ts">
definePageMeta({
  layout: "main",
  title: "Profile",
  meta: [
    {
      name: "description",
      content: "User profile page for authenticated users.",
    },
  ],
  middleware: "auth",
});
</script>
