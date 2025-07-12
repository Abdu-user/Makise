<template>
  <div
    type="text"
    class="bg-bg"
  >
    <div
      class="h-16 pl-4 pr-6 flex gap-2 items-center"
      :class="`${childClass} `"
    >
      <!-- <CustomButton
        :variant="'text'"
        :is-primary-color="'theme'"
        icon
        name="uiw:paper-clip"
        :size="'md'"
        class=""
        :rounded="true"
        @click="inDevelopment"
      />// TODO -->

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
  </div>
</template>

<script setup lang="ts">
import { getChatId } from "~/composables/(contacts)/useRealtimeUpdateMessages";
import { useGlobalSettingStore } from "~/store/globalSetting";
import { useMessagingStore } from "~/store/messaging";
const state = useGlobalSettingStore();
const route = useRoute();
const messagingState = useMessagingStore();

defineProps({
  childClass: { type: String, default: "" },
});

const doesMessageExist = (message: string): boolean => {
  return message.trim().length > 0;
};

async function sendMessage(text: string) {
  if (doesMessageExist(text)) {
    const { user, userData } = state;
    if (!user) throw new Error("User is falsy");
    if (!userData?.username) throw new Error("userData?.username is falsy: " + userData);
    if (!route.params.username) throw new Error("route.params.username is not provided in the params");

    const { contactId, contact } = await getChatId();

    if (contactId === undefined) {
      const message = "ContactId is falsy: ";
      console.error(message, contactId);
      state.setFeedback("error", message + " " + contactId);
      return;
    }

    const updateMessage = messagingState.addNewMessage({ text, userId: user.$id }, contactId);

    messagingState.message = "";
    const encText = await encryptMessageText(contact, text);

    const body = JSON.stringify({ text, encText, userId: user.$id, userName: userData.username, contactUserName: route.params.username });

    try {
      const response = await fetch("/api/send-message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body,
      });

      const messageRes = await response.json();
      if (messageRes.error) {
        console.error(messageRes);
        throw messageRes;
      }

      let message;
      if (contact.publicKey) {
        message = { ...messageRes.message, text: decryptMessageText(messageRes.message.text, contact?.publicKey) };
      } else {
        message = messageRes.message;
      }
      updateMessage(message);
      messagingState.scrollToBottom(true);
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
