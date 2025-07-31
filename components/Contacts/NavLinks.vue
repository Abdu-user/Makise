<template>
  <div>
    <ContactsNavLink
      v-for="contact in messagingState.contactsWithMessage"
      :key="contact.id"
      :to="`/contacts/${contact.username}`"
      :last-active="getLastActive(contact)"
      :last-message="getLastMessage(contact)"
      :my-last-message-status="getMyStatus(contact)"
      :name="getDisplayName(contact)"
      :profile-img-src="contact.profileImage ?? '/images/placeholder-avatar.jpg'"
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
type C = ContactType & { message: MessageType };

const getDisplayName = (c: C) => `${c.name ?? ""} ${c.lastName ?? ""}`.trim() || c.username;

const getLastMessage = (c: C) => c.message?.text ?? "Start a chat";

const getLastActive = (c: C) => getSmartTime(c.message?.timestamp || new Date().toISOString(), "en", 3);

const getMyStatus = (c: C) => (c.message?.senderId === state.user?.$id ? (c.message?.status ?? null) : null);

const state = useGlobalSettingStore();
const messagingState = useMessagingStore();

onMounted(async () => {
  const contacts = await messagingState.getContacts();

  if (contacts) {
    await getContactNavLinks(contacts);
  } else {
    console.error("No contacts found or error fetching contacts.");
  }
});

async function getContactNavLinks(contacts: ContactType[]) {
  if (contacts === undefined) return console.log("Contacts are undefined");

  const contactWithDecryptedMessage = contactWIthDecryptMessageFn(contacts);

  try {
    const newContacts = await Promise.all(contactWithDecryptedMessage);
    const contactsWithMessage = newContacts.map((newContact) => {
      return { ...newContact?.contact, message: newContact?.message } as unknown as ContactType & {
        message: MessageType;
      };
    });
    messagingState.contactsWithMessage = contactsWithMessage;
  } catch (error) {
    console.error("Error fetching contacts with messages:", error);
    messagingState.contactsWithMessage = messagingState.contacts.map((contact) => {
      return { ...contact, message: {} } as ContactType & { message: MessageType };
    });
  }
}

function contactWIthDecryptMessageFn(contacts: ContactType[]) {
  return contacts.map(async (contact) => {
    if (state.user) {
      const chatId = makeChatId(state.user.$id, contact.id);
      const res = (await queryDocument("messages", [
        Query.equal("chatId", chatId),
        Query.orderDesc("$createdAt"),
        Query.limit(1),
      ])) as Models.Document & MessageType;
      if (!res) {
        console.error("Message response is undefined", res);
        return { contact: contact, message: null };
      }
      if (!contact.publicKey || !res.text) {
        console.error("Contact publicKey is falsy", contact);
        return { contact: contact, message: res };
      }
      return {
        contact: contact,
        message: { ...res, text: decryptMessageText(res.text, contact.publicKey) },
      };
    } else {
      const message = "state.user is undefined or null";
      console.error(message);
    }
  });
}
</script>

<style scoped></style>
