<template>
  <div>
    <CustomButton :variant="'plain'">
      <span class="border border-secondary rounded-lg text-2xl w-10 h-10 text-center inline-block mr-5">1</span> {{ $t("signUp") }}
    </CustomButton>
    <slot></slot>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
