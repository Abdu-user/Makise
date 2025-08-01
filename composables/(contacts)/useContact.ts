import { useGlobalSettingStore } from "~/store/globalSetting";
import { useMessagingStore } from "~/store/messaging";

export async function addContact(contactName: string, successFunction?: () => void) {
  const messagingState = useMessagingStore();
  const state = useGlobalSettingStore();
  try {
    const contactFound = await findContactFetch(contactName, true);
    const contactMsg = await contactFound.json();

    if (contactMsg.contactAlreadyExists) throw contactMsg;
    state.setFeedback("success", "contact has been added1");
    await messagingState.getContacts();
    successFunction && successFunction();
  } catch (error: any) {
    state.setFeedback("error", error.error);
    console.error(error);
  }
}
export function filterContacts() {
  const messagingState = useMessagingStore();
  return messagingState.contactsWithMessage.filter((contact) => {
    const username = contact.username.toLowerCase().includes(messagingState.searchQuery.toLowerCase());
    const name = contact.name?.toLowerCase().includes(messagingState.searchQuery.toLowerCase());
    const lastName = contact.lastName?.toLowerCase().includes(messagingState.searchQuery.toLowerCase());
    return username || name || lastName;
  });
}
