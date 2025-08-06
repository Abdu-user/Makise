<template>
  <div>
    <ContactsNavLink
      v-for="contact in computedContacts"
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
import { getContactNavLinks } from "~/composables/(contacts)/useContact";
import { useGlobalSettingStore } from "~/store/globalSetting";
import { useMessagingStore } from "~/store/messaging";
import type { ContactType } from "~/types/messaging";
import type { MessageType } from "~/types/type";
type C = ContactType & { message: MessageType };

const getDisplayName = (c: C) => `${c.name ?? ""} ${c.lastName ?? ""}`.trim() || c.username;

const getLastMessage = (c: C) => c.message?.text ?? "Start a chat";

const getLastActive = (c: C) => getSmartTime(c.message?.timestamp || new Date().toISOString(), "en", 3);

const getMyStatus = (c: C) => (c.message?.senderId === state.user?.$id ? (c.message?.status ?? null) : null);

const props = defineProps({
  contacts: {
    type: Array as () => ContactType[] | C[],
  },
});
const computedContacts = computed(() => {
  if (props.contacts) {
    return props.contacts as C[];
  }
  return messagingState.contactsWithMessage;
});

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
</script>

<style scoped></style>
