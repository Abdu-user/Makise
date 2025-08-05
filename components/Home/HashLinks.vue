<template>
  <a
    :href="'#' + hashLink"
    v-for="hashLink in homeHashLinks"
    :key="hashLink"
    @click="(e) => scrollTo(e, hashLink)"
    >{{ hashLink }}</a
  >
</template>

<script setup lang="ts">
import { document } from "postcss";
import { homeHashLinks } from "~/constants";
function scrollTo(e: MouseEvent, hashLink: string) {
  e.preventDefault();
  const element = window.document.getElementById(hashLink);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
}
</script>

<style scoped></style>
