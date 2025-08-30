<template>
  <div>
    <CustomButton
      @click="showModal = !showModal"
      :variant="'tonal'"
      icon
      name="bxs:pencil"
      :class="buttonClass"
      :size="'f'"
      rounded
      ref="button"
    >
    </CustomButton>

    <div
      class="fixed bg-transparent inset-0 flex flex-col justify-center"
      :class="showModal ? 'pointer-events-auto' : 'pointer-events-none'"
    >
      <CustomTransitions :variant="'drop-down'">
        <CustomContainer
          :variant="'UIContainer'"
          v-if="showModal"
          @close="showModal = false"
          :class="modalClass"
          class="p-4 mx-3"
          ref="modal"
        >
          <div style="display: flex; flex-direction: column; gap: 1rem">
            <ContactsNavLink
              v-if="contactFound"
              :last-active="' '"
              :last-message="''"
              :my-last-message-status="'sending'"
              :name="contactFound.name || contactFound.lastName || contactFound.username"
              :profile-img-src="contactFound.profileImage"
              :to="`/contacts/${contactFound.username}`"
            />
            <CustomLabel
              for="searchContact"
              class="text-center"
              v-else
            >
              Search new Contact
            </CustomLabel>
            <div class="flex items-center gap-3">
              <CustomInput
                id="searchContact"
                :variant="'edit'"
                v-model="searchQuery"
                class="my-3 !px-0"
                :size="'lg'"
                placeholder="Enter contact username"
              />
              <Icon
                v-if="contactFound"
                name="gg:search-found"
                class="w-10 h-10 text-primary"
              />
            </div>
            <div class="">
              <CustomButton
                :variant="'primary'"
                block
                class="mb-2"
                @click="addContact"
                :disabled="!contactFound"
              >
                Add
              </CustomButton>
            </div>
          </div>
        </CustomContainer>
      </CustomTransitions>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { getContactNavLinks } from "~/composables/(contacts)/useContact";
import { useGlobalSettingStore } from "~/store/globalSetting";
import { useMessagingStore } from "~/store/messaging";
import type { AddContactResultsType, ContactType } from "~/types/messaging";
defineProps({
  buttonClass: { type: String, default: "" },
  modalClass: { type: String, default: "" },
});
const state = useGlobalSettingStore();
const messagingState = useMessagingStore();

const showModal = ref(false);
const searchQuery = ref("");

const contactFound = ref<ContactType | null>(null);

const timerId = ref();
watch(
  () => searchQuery.value,
  () => {
    clearTimeout(timerId.value);
    timerId.value = setTimeout(async () => {
      const contact = await findContact(searchQuery.value);
      if (contact) {
        contactFound.value = contact.contact || null;
      } else {
        console.error("Contact is not found: ", contact);
      }
    }, 250);
  }
);

async function addContact() {
  try {
    const contactFound = await findContactFetch(searchQuery.value, true);
    const contactMsg = await contactFound.json();

    if (contactMsg.contactAlreadyExists) throw contactMsg;

    const contact = await messagingState.getContacts();
    if (contact) {
      await getContactNavLinks(contact);
    } else {
      throw new Error("Could not fetch contacts after adding new contact");
    }
    state.setFeedback("success", "contact has been added1");
    showModal.value = false;
  } catch (error: any) {
    state.setFeedback("error", error.error);
    console.error(error);
  }
}
const button = ref();
const modal = ref();
function closeModal(e: Event) {
  if (!modal.value?.sectionRef || !button.value?.button) return;
  const isOutsideClick = !modal.value.sectionRef.contains(e.target) && !button.value.button.contains(e.target);
  if (isOutsideClick) {
    showModal.value = false;
  }
}
onMounted(() => {
  document.addEventListener("click", closeModal);
});
onBeforeUnmount(() => {
  document.removeEventListener("click", closeModal);
});
</script>
