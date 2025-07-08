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
    scrollDownFunction: null as null | (() => void),
    isUserAtBottom: false,
    unreadMessages: {
      number: 0,
      isThere: false,
    } as UnreadMessagesType,
  }),
  actions: {
    addNewMessage({ text, userId }: { text: string; userId: string }) {
      /**
       * Adds a new message to the messages array with the provided text and userId.
       *
       * @param text - The content of the new message to be sent.
       * @param userId - The ID of the user sending the message.
       * @returns A function `updateMessagingState` that can be used to update the state of the newly added message.
       *
       * @remarks
       * - Initializes a new message object with default and provided values.
       * - Appends the new message to the `messages` array.
       * - Returns an updater function that allows selective updating of the message fields in a type-safe manner.
       * - The updater function skips undefined fields and handles the `media` field with special logic.
       * - After updating, the messages array is refreshed to trigger reactivity.
       */
      const newMessage: MessageType = {
        $id: "",
        chatId: "",
        senderId: userId,
        receiverId: "",
        text,
        timestamp: new Date(Date.now()).toISOString(),
        status: "sending",
      };
      this.messages = [...this.messages, newMessage];
      const updateMessagingState = (message: Partial<MessageType>) => {
        for (const key in message) {
          const k = key as keyof MessageType;
          const value = message[k];

          // Skip undefined fields
          if (value === undefined) continue;

          // Type-safe assignment per key
          if (k === "media") {
            if (value === null || typeof value === "object") {
              newMessage.media = value;
            }
          } else if (typeof value === "string" || value === null) {
            newMessage[k] = value as any;
          }
        }
        this.messages = [...this.messages];
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
        console.log(this.contacts);
      } catch (error) {
        console.error(error);
      }
    },
  },
});
