<template>
  <div>
    <CustomParagraph>
      Learn how to use <span class="dark:text-darkT2TextColor text-T2TextColor">CustomButton2</span> component
    </CustomParagraph>

    <CustomContainer
      :variant="'section'"
      id="default"
    >
      <div>
        <CustomContainer
          :variant="'numbered'"
          class="mx-auto"
        >
          1
        </CustomContainer>
        <CustomContainer :variant="'line'" />
      </div>
      <div>
        <CustomHeads
          :heads="'h2'"
          :variant="'h2'"
          class="m-0"
        >
          Default Variant
        </CustomHeads>
      </div>
    </CustomContainer>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
