<template>
  <div>
    <ContactsNavLink
      to="/contacts/22"
      :last-active="`12:43`"
      :last-message="'latest message'"
      :my-last-message-status="'sending'"
      :name="'Muha active'"
      :profile-img-src="'/images/chatgpt-image-placeholder.png'"
    />
    <ContactsNavLink
      to="/contacts/33"
      :last-active="`12:43`"
      :last-message="'latest message'"
      :my-last-message-status="'sent'"
      :name="'Muha active'"
      :profile-img-src="'/images/chatgpt-image-placeholder.png'"
    />
  </div>
</template>

<script setup lang="ts">
const time = new Date().getTime();
console.log(time);
const minutes = Math.floor((time / 1000 / 60) % 60);
const hours = Math.floor((time / 1000) % 60);
console.log(new Date().toISOString());
console.log(minutes, hours);
</script>

<style scoped></style>
