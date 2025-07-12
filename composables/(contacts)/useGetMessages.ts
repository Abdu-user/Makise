import { useMessagingStore } from "~/store/messaging";
import type { MessageType } from "~/types/type";
import type { ContactType } from "~/types/messaging";
import { getChatId } from "./useRealtimeUpdateMessages";

export function useGetMessages(isMyMessage: (senderId: string) => boolean) {
  const messagingState = useMessagingStore();

  const route = useRoute();
  const router = useRouter();

  async function getMessages() {
    try {
      // ^ 1. Fetch Messages
      const res = await fetch(`/api/get-messages?contactUsername=${route.params.username}&messageLimit=40`, {
        cache: "reload",
      });

      const fetchedMessages = (await res.json()).messages as MessageType[];

      // ^ 2. decryptMessages Messages
      const { contact } = await getChatId();
      if (contact && contact.publicKey) {
        messagingState.messages = fetchedMessages.reverse().map((message) => {
          return {
            ...message,
            text: decryptMessageText(message.text, contact.publicKey!),
          };
        });
      } else {
        console.error("There is not contact or contact.publicKey", contact);
        messagingState.messages = [...fetchedMessages.reverse()];
      }

      // ^ 3. count the unreadMessages
      const unread = fetchedMessages.filter((msg) => !isMyMessage(msg.senderId) && msg.status === "sent");

      messagingState.setUnreadMessages({
        number: unread.length,
        isThere: unread.length > 0,
      });
    } catch (error) {
      console.error(error);
      router.push("/contacts/no");
    }
  }

  return {
    getMessages,
  };
}
