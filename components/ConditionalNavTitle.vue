<template>
  <ContactsFilterByQuery v-if="route.name === 'contacts'">
    <slot></slot>
  </ContactsFilterByQuery>
  <slot v-else></slot>
</template>

<script setup lang="ts">
const route = useRoute();
</script>

<style scoped></style>
