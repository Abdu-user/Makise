<template>
  <div>
    <ContactsNavLink
      v-for="contact in contacts"
      :to="`/contacts/${contact.username}`"
      :last-active="getSmartTime(contact.lastOnline)"
      :last-message="'latest message'"
      :my-last-message-status="'sending'"
      :name="`${contact.name ?? ''} ${contact.lastName ?? ''}`.trim() || contact.username"
      :profile-img-src="contact.profileImage ? contact.profileImage : '/images/placeholder-avatar.jpg'"
    />
  </div>
</template>

<script setup lang="ts">
import { useGlobalSettingStore } from "~/store/globalSetting";

import dayjs from "dayjs";
import type { ContactType } from "~/types/messaging";

const contacts = ref<ContactType[]>([]);
async function getContacts() {
  try {
    const response = await fetch("/api/get-contacts", {
      method: "GET",
      credentials: "include",
      cache: "force-cache",
    });
    const contactsR = (await response.json()) as { success: boolean; users: ContactType[] };
    contacts.value = contactsR.users;
    console.log(contactsR.users);
  } catch (error) {
    console.error(error);
  }
}
getContacts();

defineExpose({
  contacts,
});
</script>

<style scoped></style>
