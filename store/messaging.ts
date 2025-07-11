import type { ContactType } from "~/types/messaging";
import type { MessageType } from "~/types/type";

type UnreadMessagesType = {
  number: number;
  isThere: boolean;
};
export const useMessagingStore = defineStore("messaging", {
  state: () => ({
    message: "",
    messages: [] as MessageType[],
    messageInput: "idle" as "idle" | "typing" | "send" | "failed",
    messageReceive: {},
    contacts: [] as ContactType[],
    contactsWithMessage: [] as (ContactType & { message: MessageType })[],
    contactInfo: null as ContactType | null,
    scrollDownFunction: null as null | (() => void),
    isUserAtBottom: false,
    unreadMessages: {
      number: 0,
      isThere: false,
    } as UnreadMessagesType,
  }),
  actions: {
    addNewMessage(input: MessageType | { text: string; userId: string }, contactId: string) {
      let newMessage: MessageType;

      if ("$id" in input) {
        // It's a full MessageType
        newMessage = input;
      } else {
        // It's the { text, userId } version
        const { text, userId } = input;
        newMessage = {
          $id: "",
          chatId: "",
          senderId: userId,
          receiverId: "",
          text,
          timestamp: new Date().toISOString(),
          status: "sending",
        };
      }

      this.messages = [...this.messages, newMessage];
      const updateContactWithMessage = () => {
        if (contactId) {
          this.contactsWithMessage = this.contactsWithMessage.map((coWMsg) => {
            if (coWMsg.id === contactId) {
              return { ...coWMsg, message: newMessage };
            } else return coWMsg;
          });
        } else {
          console.error("No contactId is provided");
        }
      };
      updateContactWithMessage();

      const updateMessagingState = (message: Partial<MessageType>) => {
        for (const key in message) {
          const k = key as keyof MessageType;
          const value = message[k];

          if (value === undefined) continue;

          if (k === "media") {
            if (value === null || typeof value === "object") {
              newMessage.media = value;
            }
          } else if (typeof value === "string" || value === null) {
            newMessage[k] = value as any;
          }
        }
        this.messages = [...this.messages];
        updateContactWithMessage();
      };

      return updateMessagingState;
    },

    scrollToBottom(functionORCallFunction: true | (() => void)) {
      if (!functionORCallFunction) {
        return console.error(`${functionORCallFunction} is not valid argument`);
      }
      if (functionORCallFunction === true) {
        if (this.scrollDownFunction !== null) {
          this.scrollDownFunction();
        } else {
          console.error("ScrollToBottom function does to have a function to call");
        }
      } else if (typeof functionORCallFunction === "function") {
        this.scrollDownFunction = functionORCallFunction;
      } else {
        console.error("ScrollToBottom: provided parameter is not a function or a null");
      }
    },
    setUnreadMessages(unreadMessages: UnreadMessagesType) {
      this.unreadMessages = unreadMessages;
    },
    async getContacts() {
      try {
        const response = await fetch("/api/get-contacts", {
          method: "GET",
          credentials: "include",
          cache: "reload",
        });
        const contactsR = (await response.json()) as { success: boolean; users: ContactType[] };
        this.contacts = contactsR.users;
        return contactsR.users;
      } catch (error) {
        console.error(error);
      }
    },
  },
});
