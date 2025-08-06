import { Query, type Models } from "appwrite";
import { useGlobalSettingStore } from "~/store/globalSetting";
import { useMessagingStore } from "~/store/messaging";
import type { ContactType } from "~/types/messaging";
import type { MessageType } from "~/types/type";

export async function addContact(contactName: string, successFunction?: () => void) {
  const messagingState = useMessagingStore();
  const state = useGlobalSettingStore();
  try {
    const contactFound = await findContactFetch(contactName, true);
    const contactMsg = await contactFound.json();

    if (contactMsg.contactAlreadyExists) throw contactMsg;
    state.setFeedback("success", "contact has been added1");
    await messagingState.getContacts();
    const contacts = await messagingState.getContacts();
    if (!contacts) throw new Error("Contacts are undefined after adding a contact");
    await getContactNavLinks(contacts);
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

export async function getContactNavLinks(contacts: ContactType[]) {
  const messagingState = useMessagingStore();
  if (contacts === undefined) return console.log("Contacts are undefined");

  const contactWithDecryptedMessage = contactWIthDecryptMessageFn(contacts);

  try {
    const newContacts = await Promise.all(contactWithDecryptedMessage);
    const contactsWithMessage = newContacts.map((newContact) => {
      return { ...newContact?.contact, message: newContact?.message } as unknown as ContactType & {
        message: MessageType;
      };
    });
    messagingState.contactsWithMessage = contactsWithMessage;
  } catch (error) {
    console.error("Error fetching contacts with messages:", error);
    messagingState.contactsWithMessage = messagingState.contacts.map((contact) => {
      return { ...contact, message: {} } as ContactType & { message: MessageType };
    });
  }
}

function contactWIthDecryptMessageFn(contacts: ContactType[]) {
  const state = useGlobalSettingStore();

  return contacts.map(async (contact) => {
    if (state.user) {
      const chatId = makeChatId(state.user.$id, contact.id);
      const res = (await queryDocument("messages", [
        Query.equal("chatId", chatId),
        Query.orderDesc("$createdAt"),
        Query.limit(1),
      ])) as Models.Document & MessageType;
      if (!res) {
        console.error("Message response is undefined", res);
        return { contact: contact, message: null };
      }
      if (!contact.publicKey || !res.text) {
        console.error("Contact publicKey is falsy", contact);
        return { contact: contact, message: res };
      }
      return {
        contact: contact,
        message: { ...res, text: decryptMessageText(res.text, contact.publicKey) },
      };
    } else {
      const message = "state.user is undefined or null";
      console.error(message);
    }
  });
}
