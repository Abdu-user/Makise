// import type { MessagePayload } from "firebase/messaging";
// // import { useMessagingStore } from "~/store/messaging";
// import type { NotificationType } from "~/types/messaging";
import type { MessageType } from "~/types/type";

// const router = useRouter();
// export async function getMessages(contactUsername: string) {
//   const messagingState = useMessagingStore();
//   try {
//     const res = await fetch(`/api/get-messages?contactUsername=${contactUsername}&messageLimit=50`, {
//       cache: "reload",
//     });

//     const messages = await res.json();
//     const fetchedMessages = messages.messages as MessageType[];

//     messagingState.messages = [...fetchedMessages];
//   } catch (error) {
//     console.error(error);
//     router.replace("/contacts/no");
//   }
// }
export async function getMessageById(contactUsername: string, messageId: string) {
  try {
    const res = await fetch(`/api/get-messages?contactUsername=${contactUsername}&messageLimit=50&messageId=${messageId}`, {
      cache: "reload",
    });

    const message = await res.json();
    return message as MessageType;

    // console.log("Single message:", messageId, fetchedMessage);
    // You can return it or update state as needed
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// export function messageReceivedNotify(payload: MessagePayload, fullPath: string) {
//   const messagingState = useMessagingStore();
//   console.log("[App] Foreground message received:", payload);

//   const p = payload.data as unknown as NotificationType;
//   if (!p?.body) console.error("NO title in the Firebase notification");
//   if (!p?.title) console.error("No body in the Firebase notification");
//   // const {title} = p
//   const { body, title, senderUsername, time, link, messageId } = p;

//   if (link.includes(fullPath)) {
//     const updateMessage = messagingState.addNewMessage({ text: body, userId: "" });
//     console.log(messageId);
//     const message = getMessageById(senderUsername, messageId);
//     // updateMessage(message);
//     // messagingState.messages =
//   }
// }
// ("686bdc33000be3c84d84 ");
