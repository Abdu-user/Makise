import type { Models, RealtimeResponseEvent } from "appwrite";
import type { MessageType } from "~/types/type";

export function useRealtimeMessages(chatId: string, onNewMessage: (message: Models.Document & MessageType) => void) {
  const config = useRuntimeConfig();
  const databaseId = config.public.appwriteDatabaseId;
  const messagesCollectionId = config.public.appwriteMessagesCollectionId;

  const { $appwrite } = useNuxtApp();
  let unsubscribe: () => void;

  const subscribe = () => {
    console.log("📡 Subscribing to realtime for chatId:", chatId);

    unsubscribe = $appwrite.client.subscribe(
      [`databases.${databaseId}.collections.${messagesCollectionId}.documents`],
      (response: RealtimeResponseEvent<Models.Document & MessageType>) => {
        const message = response.payload;

        // 🔍 Only react to messages for this chat
        if (message.chatId !== chatId) {
          console.log("🚫 Ignored message (not this chatId):", message.chatId);
          return;
        }

        // ✅ React only on create or update events
        const isCreate = response.events.includes("databases.*.collections.*.documents.*.create");
        const isUpdate = response.events.includes("databases.*.collections.*.documents.*.update");

        if (isCreate) {
          console.log(isCreate, isUpdate, "isCreate,isUpdate");
          console.log(response.events, message.status);
          onNewMessage(message);
        } else if (isUpdate) {
          console.log(response.events, message.status);
          onNewMessage({ ...message, status: message.status });
        } else {
          console.log("🚫 Ignored event (not create/update):", response.events);
        }
      }
    );
  };

  const stop = () => {
    console.log("🛑 Unsubscribed from realtime");
    if (unsubscribe) unsubscribe();
  };

  return {
    subscribe,
    stop,
  };
}
