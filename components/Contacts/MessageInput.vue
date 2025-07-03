<template>
  <CustomContainer
    :variant="'mainContainer'"
    type="text"
    class="sticky bottom-0 h-16 left-0 pl-2 pr-6 grid gap-2 items-center"
    :class="`${doesMessageExist(message) ? 'grid-cols-[2rem,1fr,2rem]' : 'grid-cols-[2rem,1fr]'}`"
  >
    <CustomButton
      :variant="'text'"
      :is-primary-color="'theme'"
      icon
      name="uiw:paper-clip"
      :size="'md'"
      class=""
      :rounded="true"
    />

    <div class="px-4 h-10 w-full">
      <CustomInput
        v-model="message"
        :variant="'edit'"
        class="w-fit !p-0 -mt-2"
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
      :size="'lg'"
      class=""
      :rounded="true"
      @click="sendMessage(message)"
    />
  </CustomContainer>
</template>

<script setup lang="ts">
import { useGlobalSettingStore } from "~/store/globalSetting";

const doesMessageExist = (message: string): boolean => {
  return message.trim().length > 0;
};
const route = useRoute();
const message = ref("Muha");
const state = useGlobalSettingStore();
async function sendMessage(text: string) {
  if (doesMessageExist(text)) {
    const { user, userData } = state;
    if (!user) throw new Error("User is falsy");
    if (!userData?.username) throw new Error("userData?.username is falsy");
    if (!route.params.username) throw new Error("route.params.username is not provided in the params");
    // console.log();

    const body = JSON.stringify({ text, userId: user.$id, userName: userData.username, contactUserName: route.params.username });
    try {
      const response = await fetch("/api/send-message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body,
      });

      const data = await response.json();
      if (data.error) throw new Error(data);

      message.value = ""; // Clear input after sending

      state.setFeedback("success", "Message sent");
    } catch (error) {
      console.error("Error sending message:", JSON.stringify(error));
    }
  } else {
    console.warn("Cannot send an empty message.");
  }
}
</script>

<style scoped></style>
