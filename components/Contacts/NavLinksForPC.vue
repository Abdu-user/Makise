<template>
  <CustomContainer
    :variant="'mainContainer'"
    :class="`max-md:hidden sticky top-0 right-0 left-0 h-screen
      border-r-[1px] border-gray-500/20  overflow-y-scroll`"
    style="scrollbar-width: thin; scrollbar-color: #848484 transparent; scrollbar-track-color: #000"
  >
    <CustomTransitions :variant="'drop-down'">
      <div
        ref="navDiv"
        v-if="state.isNavOpen"
        class="fixed right-0 flex flex-col w-full md:max-w-96 md:w-3/12 bg-opacity-5 backdrop-blur-sm px-4 py-3 space-y-1 z-20 left-0 top-16 min-h-[calc(100vh-64px)] shadow-lg ease-in backdrop-saturate-150"
        :class="state.newColors ? 'bg-bg-transparent text-text-muted' : 'bg-mainBg/80 dark:bg-darkMainBg'"
        @click.self="() => state.toggleIsNavOpen()"
      >
        <NavigationalLinks />
      </div>
    </CustomTransitions>
    <div
      class="flex items-center h-14 gap-2 pl-2"
      :class="state.newColors ? 'bg-bg-dark' : 'bg-mainT2Bg dark:bg-darkMainT2Bg'"
    >
      <!-- <CustomButton
      /> -->
      <button
        class="w-12 h-12 my-auto p-1"
        ref="navButton"
        @click="state.toggleIsNavOpen()"
      >
        <Icon
          :name="state.isNavOpen ? 'material-symbols:close' : 'material-symbols:menu-rounded'"
          class="w-6 h-6"
        />
      </button>

      <div class="relative mr-2">
        <input
          class="rounded-full border-none p-1 px-6 bg-bg-light text-text border-border-muted focus:border-primary focus:outline-none"
          placeholder="Search "
          @click="(changeLeftSideState('search'), inDevelopment)"
          v-model="messagingState.searchQuery"
          ref="searchInput"
        />
        <CustomButton
          v-if="messagingState.leftSideState === 'search'"
          name="material-symbols:close-small-outline"
          icon
          :variant="'text'"
          :is-primary-color="'theme'"
          class="absolute top-1/2 right-2 transform -translate-y-1/2 w-8 h-8 p-1"
          @click="(changeLeftSideState('contacts'), (messagingState.searchQuery = ''))"
        ></CustomButton>
      </div>
    </div>

    <div>
      <div
        v-if="messagingState.leftSideState === 'search'"
        class="px-3"
      >
        <ContactsNavLink
          v-if="foundContact"
          :last-active="' '"
          :last-message="''"
          :my-last-message-status="'sending'"
          :name="foundContact.name || foundContact.lastName || foundContact.username"
          :profile-img-src="foundContact.profileImage"
          :to="`/contacts/${foundContact.username}`"
        />
        <p
          v-if="foundContactTextStatus"
          class="text-[var(--danger)] text-sm my-4 text-center"
        >
          {{ foundContactTextStatus }}
        </p>

        <CustomButton
          :variant="'primary'"
          block
          class="mb-2 mx-2"
          @click="addContact(messagingState.searchQuery)"
          :disabled="isAddContactButtonDisabled()"
        >
          Add Contact
        </CustomButton>
      </div>
      <ContactsNavLinks
        class=""
        :contacts="contacts"
      />

      <div></div>
    </div>
  </CustomContainer>
</template>

<script setup lang="ts">
import { addContact, filterContacts } from "~/composables/(contacts)/useContact";
import { useGlobalSettingStore } from "~/store/globalSetting";
import { useMessagingStore } from "~/store/messaging";
import type { ContactType } from "~/types/messaging";

const state = useGlobalSettingStore();

function changeLeftSideState(state: "contacts" | "search") {
  messagingState.changeLeftSideState(state);
}

const navDiv = ref<HTMLDivElement | undefined>(undefined);
const navButton = ref<HTMLButtonElement | undefined>(undefined);
const foundContact = ref<ContactType | null>(null);
const foundContactTextStatus = ref("");
const messagingState = useMessagingStore();

const searchInput = ref<HTMLInputElement | null>(null);
messagingState.searchInputs["1"] = searchInput;

function isAddContactButtonDisabled() {
  return !foundContact.value;
}
const contacts = computed(() => {
  return filterContacts();
});

watch(
  () => messagingState.searchQuery,
  async (newQuery) => {
    if (newQuery.trim() === "") {
      foundContact.value = null;
      return;
    }

    try {
      const contact = await findContact(newQuery);

      //@ts-ignore
      if (contact?.error) throw contact;

      if (contact) {
        if (contact?.contact?.id === state.user?.$id) {
          foundContact.value = null;
          return;
        } else if (isNewContactAlreadyExists()) {
          foundContactTextStatus.value = "You already have this contact.";
          foundContact.value = null;
          return;
        } else {
          foundContact.value = contact?.contact as unknown as ContactType;
        }
        function isNewContactAlreadyExists() {
          return (
            contact?.contact?.username.toLowerCase() ===
            messagingState.contacts.find((c) => c.username.toLowerCase() === newQuery.toLowerCase())?.username.toLowerCase()
          );
        }
      } else {
        foundContact.value = null;
      }
    } catch (error) {
      console.error("Error finding contact:", error);
    }
  },
  { immediate: true }
);

useCloseNotFocused([navDiv, navButton], () => {
  state.isNavOpen = false;
});
</script>

<style scoped></style>
