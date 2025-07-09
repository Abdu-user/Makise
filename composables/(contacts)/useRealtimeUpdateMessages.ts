import dayjs from "dayjs";
import { useGlobalSettingStore } from "~/store/globalSetting";
import { useMessagingStore } from "~/store/messaging";

export default function useRealtimeUpdateMessages(isMyMessage: (senderId: string) => boolean) {
  const messagingState = useMessagingStore();
  const state = useGlobalSettingStore();
  const route = useRoute();
  let realtime: ReturnType<typeof useRealtimeMessages> | null = null;

  async function getChatId() {
    try {
      const res = await fetch("/api/get-contact/" + route.params.username);
      const contact = await res.json();
      return makeChatId(state.user?.$id!, contact.contact.id);
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  onMounted(async () => {
    const chatId = await getChatId();
    if (typeof chatId === "string" && chatId.length > 39) {
      realtime = useRealtimeMessages(chatId, (newMessage) => {
        const isMeMessageVar = isMyMessage(newMessage.senderId);
        const doesMessageAlreadyExists = messagingState.messages.some((msg) => msg.$id === newMessage.$id);

        if (newMessage.status === "read" && isMeMessageVar) {
          // ^ Mark messages as read

          messagingState.messages = messagingState.messages.map((message) => {
            const isSentStatus = message.status !== "read";
            const isSameOrBefore = dayjs(message.timestamp).isSameOrBefore(newMessage.timestamp);
            if (isSentStatus && isSameOrBefore) {
              return {
                ...message,
                status: newMessage.status,
              };
            }
            return message;
          });
        } else if (!doesMessageAlreadyExists && !isMeMessageVar) {
          // ^ Add a new message in realtime
          messagingState.addNewMessage(newMessage);
          messagingState.unreadMessages.isThere = true;
          messagingState.unreadMessages.number++;
        } else {
          console.log("🟡 Message already exists in state, or it is my message, ignoring", newMessage);
        }

        if (messagingState.isUserAtBottom) {
          nextTick(() => messagingState.scrollToBottom(true));
        }
      });

      realtime.subscribe();
    } else {
      console.error("No chatId", chatId);
    }
  });

  onBeforeUnmount(() => {
    if (realtime) realtime.stop();
  });
}
