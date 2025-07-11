import dayjs from "dayjs";
import { useGlobalSettingStore } from "~/store/globalSetting";
import { useMessagingStore } from "~/store/messaging";
import type { ContactType } from "~/types/messaging";

export async function getChatId() {
  const state = useGlobalSettingStore();
  const route = useRoute();
  try {
    if (!route.params.username) throw 'No username in  "route.params.username"';
    const res = await fetch("/api/get-contact/" + route.params.username);
    const { contact, error }: { contact: ContactType; error: any } = await res.json();
    if (error) throw { contact, message: "Error : contact.error" };
    const contactId = contact.id;
    if (!contactId) throw { contact, message: "Error: !contactId" };
    const chatId = makeChatId(state.user?.$id!, contactId);

    return { chatId, contactId };
  } catch (error) {
    console.error(error);
    return { error };
  }
}
export default function useRealtimeUpdateMessages(isMyMessage: (senderId: string) => boolean) {
  const messagingState = useMessagingStore();
  let realtime: ReturnType<typeof useRealtimeMessages> | null = null;

  async function onMountedFunction() {
    const { chatId, contactId } = await getChatId();
    if (typeof chatId === "string" && chatId.length > 39) {
      realtime = useRealtimeMessages(chatId, (newMessage) => {
        const isMeMessageVar = isMyMessage(newMessage.senderId);
        const doesMessageAlreadyExists = messagingState.messages.some((msg) => msg.$id === newMessage.$id);

        if (newMessage.status === "read" && isMeMessageVar) {
          // ^ Mark messages as read

          messagingState.messages = messagingState.messages.map((message) => {
            const isSentStatus = message.status === "sent" || message.status === "sending";
            const isSameOrBefore = dayjs(message.timestamp).isSameOrBefore(newMessage.timestamp);
            if (isSentStatus && isSameOrBefore) {
              return {
                ...message,
                status: newMessage.status,
              };
            }
            return message;
          });
          // && Make the last message in Contact's navbar as read
          messagingState.contactsWithMessage = messagingState.contactsWithMessage.map((coWMsg) => {
            if (coWMsg.id === contactId) {
              return {
                ...coWMsg,
                message: {
                  ...coWMsg.message,
                  status: "read",
                },
              };
            } else {
              return coWMsg;
            }
          });
        } else if (!doesMessageAlreadyExists && !isMeMessageVar) {
          // ^ if the message is not mine ->  Add a new message in realtime
          messagingState.addNewMessage(newMessage, contactId);
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
  }

  function setupRealTimeMessaging() {
    onMounted(onMountedFunction);
    onBeforeUnmount(() => {
      if (realtime) realtime.stop();
    });
  }
  return {
    setupRealTimeMessaging,
  };
}
