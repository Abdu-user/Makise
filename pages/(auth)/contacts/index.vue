<template>
  <div :class="state.newColors ? ' text-text-muted' : 'text-T3TextColor dark:text-darkT3TextColor'">
    <ContactsNavLinks :contacts="contacts" />
    <CustomParagraph :variant="'default'">Tap on the pencil to find a new contact </CustomParagraph>

    <ContactsFindNewContact
      :buttonClass="' absolute bottom-[100px] right-5 w-14 h-14 p-3 '"
      :modalClass="'  '"
      class="md:hidden"
    />
  </div>
</template>

<script setup lang="ts">
import { filterContacts } from "~/composables/(contacts)/useContact";
import { useGlobalSettingStore } from "~/store/globalSetting";
import { useMessagingStore } from "~/store/messaging";
const state = useGlobalSettingStore();
const messagingState = useMessagingStore();
const router = useRouter();

function largeDisplayRouterPush() {
  if (window.innerWidth > 768) {
    if (!messagingState.contacts[0]?.username) return;
    router.replace(`/contacts/${messagingState.contacts[0].username}`);
  }
}
watch(
  () => messagingState.contacts,
  (newVal) => {
    if (newVal) {
      largeDisplayRouterPush();
    }
  }
);
onMounted(() => {
  window.addEventListener("resize", largeDisplayRouterPush);
  state.setRouteName("Contacts");
});
onBeforeUnmount(() => {
  window.removeEventListener("resize", largeDisplayRouterPush);
});
useHead({
  title: "Make contact with Makise",
});
definePageMeta({
  layout: "main",
  middleware: "auth",
});

const contacts = computed(() => {
  return filterContacts();
});
</script>
