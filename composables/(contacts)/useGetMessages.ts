import { useMessagingStore } from "~/store/messaging";
import type { MessageType } from "~/types/type";

export function useGetMessages(isMyMessage: (senderId: string) => boolean) {
  const messagingState = useMessagingStore();

  const route = useRoute();
  const router = useRouter();

  async function getMessages() {
    try {
      const res = await fetch(`/api/get-messages?contactUsername=${route.params.username}&messageLimit=40`, {
        cache: "reload",
      });

      const fetchedMessages = (await res.json()).messages as MessageType[];
      messagingState.messages = [...fetchedMessages.reverse()];

      const unread = fetchedMessages.filter((msg) => !isMyMessage(msg.senderId) && msg.status === "sent");

      messagingState.setUnreadMessages({
        number: unread.length,
        isThere: unread.length > 0,
      });
    } catch (error) {
      console.error(error);
      router.replace("/contacts/no");
    }
  }

  return {
    getMessages,
  };
}
