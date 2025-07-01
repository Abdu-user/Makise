<template>
  <CustomContainer
    :variant="'mainContainer'"
    type="text"
    class="sticky bottom-0 h-16 left-0 pl-2 pr-6 grid gap-2"
    :class="`${doesMessageExist(message) ? 'grid-cols-[2rem,1fr,2rem]' : 'grid-cols-[2rem,1fr]'}`"
  >
    <CustomButton
      :variant="'text'"
      :is-primary-color="'theme'"
      icon
      name="uiw:paper-clip"
      :size="'md'"
      class=""
    />

    <div class="px-4 h-10 w-full">
      <CustomInput
        v-model="message"
        :variant="'edit'"
        class="w-fit !p-0"
        :size="'lg'"
        placeholder="Type a message..."
        @keydown.enter="sendMessage(message)"
      />
    </div>

    <CustomButton
      v-if="doesMessageExist(message)"
      :variant="'text'"
      :is-primary-color="'theme'"
      icon
      name="fe:paper-plane"
      :size="'md'"
      class=""
      @click="sendMessage(message)"
    />
  </CustomContainer>
</template>

<script setup lang="ts">
const doesMessageExist = (message: string): boolean => {
  return message.trim().length > 0;
};
const message = ref("Muha");

function sendMessage(text: string) {
  if (doesMessageExist(text)) {
    fetch("/api/send-message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Message sent successfully:", data);
        // message.value = ""; // Clear the input after sending
      })
      .catch((error) => {
        console.error("Error sending message:", error);
      });
  } else {
    console.warn("Cannot send an empty message.");
  }
}
</script>

<style scoped></style>
