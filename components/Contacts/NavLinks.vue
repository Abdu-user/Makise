<template>
  <div>
    <ContactsNavLink
      v-for="contact in messagingState.contactsWithMessage"
      :to="`/contacts/${contact.username}`"
      :last-active="getSmartTime(contact?.message?.timestamp || new Date().toISOString(), 'en', 3)"
      :last-message="contact?.message ? contact?.message.text : 'Start a chat'"
      :my-last-message-status="contact?.message?.senderId === state.user?.$id ? (contact?.message ? contact?.message.status : null) : null"
      :name="`${contact.name ?? ''} ${contact.lastName ?? ''}`.trim() || contact.username"
      :profile-img-src="contact.profileImage ? contact.profileImage : '/images/placeholder-avatar.jpg'"
    />
  </div>
</template>

<script setup lang="ts">
import { Query } from "appwrite";
import type { Models } from "node-appwrite";
import { useGlobalSettingStore } from "~/store/globalSetting";
import { useMessagingStore } from "~/store/messaging";
import type { ContactType } from "~/types/messaging";
import type { MessageType } from "~/types/type";
const state = useGlobalSettingStore();
const messagingState = useMessagingStore();

onMounted(async () => {
  const contacts = await messagingState.getContacts();

  if (contacts) {
    await getContactNavLinks(contacts);
    console.log(contacts, "contacts fetched successfully");
  } else {
    console.error("No contacts found or error fetching contacts.");
  }
});

async function getContactNavLinks(contacts: ContactType[]) {
  if (contacts === undefined) return console.log("Contacts are undefined");
  console.log(contacts, "contacts in getContactNavLinks");

  const contactWithDecryptedMessage = contacts.map(async (contact) => {
    if (state.user) {
      const chatId = makeChatId(state.user.$id, contact.id);
      const res = (await queryDocument("messages", [
        Query.equal("chatId", chatId),
        Query.orderDesc("$createdAt"),
        Query.limit(1),
      ])) as Models.Document & MessageType;
      return {
        contact: contact,
        message: { ...res, text: decryptMessageText(res.text, contact?.publicKey!) },
      };
    } else {
      const message = "state.user is undefined or null";
      console.error(message);
    }
  });

  try {
    console.log(contactWithDecryptedMessage, "contactWithDecryptedMessage before Promise.all");
    console.log("does it work at all");
    const newContacts = await Promise.all(contactWithDecryptedMessage);
    console.log(newContacts, "newContacts");
    const contactsWithMessage = newContacts.map((newContact) => {
      return { ...newContact?.contact, message: newContact?.message } as unknown as ContactType & {
        message: MessageType;
      };
    });

    console.log(contactsWithMessage, "contactsWithMessage");
    messagingState.contactsWithMessage = contactsWithMessage;
  } catch (error) {
    console.error("Error while resolving contact messages:", error);
  }
}
</script>

<style scoped></style>
