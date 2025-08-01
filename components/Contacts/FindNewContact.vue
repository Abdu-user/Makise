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
          <CustomLabel
            for="searchContact"
            class="text-center"
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
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useGlobalSettingStore } from "~/store/globalSetting";
import { useMessagingStore } from "~/store/messaging";
defineProps({
  buttonClass: { type: String, default: "" },
  modalClass: { type: String, default: "" },
});
const state = useGlobalSettingStore();
const messagingState = useMessagingStore();

const showModal = ref(false);
const searchQuery = ref("");

const contactFound = ref(false);

const timerId = ref();
watch(
  () => searchQuery.value,
  () => {
    clearTimeout(timerId.value);
    timerId.value = setTimeout(async () => {
      const contact = await findContact(searchQuery.value);
      if (contact) {
        contactFound.value = contact.contactFound as boolean;
        console.log(contact);
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
    state.setFeedback("success", "contact has been added1");
    showModal.value = false;
    await messagingState.getContacts();
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
