import type { useMessagingStore } from "~/store/messaging";
import type { MessageType } from "~/types/type";

// composables/useMessages.ts
export function useMessages(
  route: ReturnType<typeof useRoute>,
  state: ReturnType<typeof useMessagingStore>,
  isMyMessage: (senderId: string) => boolean
) {
  async function getMessages() {
    const res = await fetch(`/api/get-messages?contactUsername=${route.params.username}&messageLimit=40`, { cache: "reload" });
    const fetchedMessages = (await res.json()).messages as MessageType[];

    state.messages = [...fetchedMessages.reverse()];
    const unread = fetchedMessages.filter((msg) => !isMyMessage(msg.senderId) && msg.status === "sent");

    state.setUnreadMessages({
      number: unread.length,
      isThere: unread.length > 0,
    });
  }

  return { getMessages };
}
