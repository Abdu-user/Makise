<template>
  <div :class="state.newColors ? ' text-text-muted' : 'text-T3TextColor dark:text-darkT3TextColor'">
    <ContactsNavLinks ref="navLinks" />
    <CustomParagraph :variant="'default'">Tap on the pencil to find a new contact </CustomParagraph>
    <ContactsFindNewContact
      :buttonClass="'absolute bottom-[100px] right-5 w-14 h-14 p-3 '"
      :modalClass="'sticky bottom-0'"
      class="md:hidden"
    />
  </div>
</template>

<script setup lang="ts">
import { useGlobalSettingStore } from "~/store/globalSetting";
const state = useGlobalSettingStore();
const router = useRouter();
const navLinks = ref();

function largeDisplayRouterPush() {
  if (window.innerWidth > 768) {
    if (!navLinks.value.contacts[0].username) return;
    router.replace(`/contacts/${navLinks.value.contacts[0].username}`);
  }
}
watch(
  () => navLinks.value?.contacts,
  (newVal) => {
    console.log(JSON.stringify(navLinks.value.contacts));
    console.log(JSON.stringify(newVal));
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
</script>
