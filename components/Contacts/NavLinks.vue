<template>
  <div>
    <ContactsNavLink
      v-for="contact in messagingState.contacts"
      :to="`/contacts/${contact.username}`"
      :last-active="getSmartTime(contact.lastOnline, 'en', 3)"
      :last-message="'latest message'"
      :my-last-message-status="'sending'"
      :name="`${contact.name ?? ''} ${contact.lastName ?? ''}`.trim() || contact.username"
      :profile-img-src="contact.profileImage ? contact.profileImage : '/images/placeholder-avatar.jpg'"
    />
  </div>
</template>

<script setup lang="ts">
import { useGlobalSettingStore } from "~/store/globalSetting";
import { useMessagingStore } from "~/store/messaging";

const messagingState = useMessagingStore();

messagingState.getContacts();

// defineExpose({
//   contacts,
// });
</script>

<style scoped></style>
