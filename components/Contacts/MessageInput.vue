<template>
  <div
    type="text"
    class="bg-bg sticky bottom-0 h-16 left-0 pl-2 pr-6 grid gap-2 items-center"
    :class="`${doesMessageExist(messagingState.message) ? 'grid-cols-[2rem,1fr,2rem]' : 'grid-cols-[2rem,1fr]'}`"
  >
    <CustomButton
      :variant="'text'"
      :is-primary-color="'theme'"
      icon
      name="uiw:paper-clip"
      :size="'md'"
      class=""
      :rounded="true"
      @click="inDevelopment"
    />

    <div class="px-4 h-10 w-full">
      <CustomInput
        v-model="messagingState.message"
        :variant="'edit'"
        class="w-fit !p-0 -mt-2"
        :size="'lg'"
        placeholder="Type a message..."
        @keydown.enter="sendMessage(messagingState.message)"
        type="text"
      />
    </div>

    <CustomButton
      v-if="doesMessageExist(messagingState.message)"
      :variant="'text'"
      :is-primary-color="'theme'"
      icon
      name="fe:paper-plane"
      :size="'lg'"
      class=""
      :rounded="true"
      @click="sendMessage(messagingState.message)"
    />
  </div>
</template>

<script setup lang="ts">
import { useGlobalSettingStore } from "~/store/globalSetting";
import { useMessagingStore } from "~/store/messaging";
import type { MessageType } from "~/types/type";
const state = useGlobalSettingStore();
const route = useRoute();
const messagingState = useMessagingStore();

const doesMessageExist = (message: string): boolean => {
  return message.trim().length > 0;
};

async function sendMessage(text: string) {
  if (doesMessageExist(text)) {
    const { user, userData } = state;
    if (!user) throw new Error("User is falsy");
    if (!userData?.username) throw new Error("userData?.username is falsy: " + userData);
    if (!route.params.username) throw new Error("route.params.username is not provided in the params");

    messagingState.message = "";

    const body = JSON.stringify({ text, userId: user.$id, userName: userData.username, contactUserName: route.params.username });

    const updateMessage = messagingState.addNewMessage({ text, userId: user.$id });

    nextTick(() => {
      // ^ Scroll to bottom after the dom updates
      nextTick(() => {
        messagingState.scrollToBottom(true);
      });
    });

    try {
      const response = await fetch("/api/send-message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body,
      });

      const messageRes = await response.json();
      if (messageRes.error) throw new Error(messageRes);
      console.log(messageRes);
      updateMessage(messageRes.message);

      console.log(messageRes);
    } catch (error) {
      messagingState.message = text;
      updateMessage({ status: "failed" });
      console.log(error);
      console.error("Error sending message:", JSON.stringify(error));
      state.setFeedback("error", `"Error sending message:", ${JSON.stringify(error)}`);
    }
  } else {
    console.warn("Cannot send an empty message.");
  }
}
</script>
