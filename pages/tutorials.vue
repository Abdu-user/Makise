<template>
  <div class="px-6">
    <CustomHeads
      :variant="'h1'"
      :heads="'h1'"
      class="capitalize"
      >tutorials</CustomHeads
    >

    <CustomHeads
      heads="h2"
      :variant="'h2'"
    >
      Continue the this (Makise) project
    </CustomHeads>
    <main>
      <p class="dark:text-darkT3TextColor">
        to resume the project, please uncomment this line in <strong> "middleware/auth.ts": </strong>
        <i>"// return navigateTo("/sign-up");"" </i>
      </p>
    </main>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: "Tutorials on Makise",
});
definePageMeta({
  layout: "documentation",
});
</script>

<style scoped></style>
