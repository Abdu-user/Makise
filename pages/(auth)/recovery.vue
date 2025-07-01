<template>
  <div
    :class="`min-h-screen grid justify-center items-center
     bg-mainBg dark:bg-darkMainBg p-4 py-8 gap-8 `"
  >
    <RecoveryForm class="" />
  </div>
</template>

<script setup lang="ts">
import { bigNames } from "~/mainFrame";

useHead({
  title: `Recover ${bigNames.appName} Account`,
});
</script>

<style scoped></style>
