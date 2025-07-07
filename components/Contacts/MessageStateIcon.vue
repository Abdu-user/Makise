<template>
  <Icon :name="name" />
</template>

<script setup lang="ts">
import type { MessageType } from "~/types/type";

const props = defineProps<{ state: MessageType["status"] }>();
const name = computed(() => {
  const messageState = props.state;
  if (messageState === "read") {
    return "ion:checkmark-done-sharp";
    return "quill:checkmark-double";
  } else if (messageState === "sending") {
    return "svg-spinners:clock";
  } else if (messageState === "sent") {
    return "ion:checkmark-sharp";
    return "quill:checkmark";
  } else if (messageState === "failed") {
    return "fe:warning";
  } else {
    return "svg-spinners:clock";
  }
});
</script>
