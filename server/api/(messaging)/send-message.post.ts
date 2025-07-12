// const sdk = require('node-appwrite');

import { Permission, Role } from "node-appwrite";
import {
  initializeServerAppWrite,
  postAppwriteMessage,
  queryDocument,
  sendFCMAppwriteMessage,
} from "~/composables/server/useAppwriteWebClient";
import { MessageType } from "~/types/type";
import { makeChatId } from "~/utils/messaging";

// await messaging.createPushToken("[your-push-target-id]", token);

export default defineEventHandler(async (event) => {
  const { messaging, users, Query, ID } = initializeServerAppWrite();
  const body = await readBody(event);
  const { text, userId, userName, contactUserName, encText }: { userId: string; [key: string]: string } = body;

  if (!text || !text.trim().length) {
    throw createError({ statusCode: 400, statusMessage: "No text message" });
  }
  if (!userId) {
    throw createError({ statusCode: 400, statusMessage: "No userId is provided" });
  }
  if (!userName) {
    throw createError({ statusCode: 400, statusMessage: "No userName is provided" });
  }
  if (!contactUserName) {
    throw createError({ statusCode: 400, statusMessage: "No contactUserName is provided" });
  }

  const contactId = (await queryDocument([Query.equal("username", contactUserName)])).documents[0].$id;
  const contact = await users.get(contactId);

  let newText: string;
  if (encText) {
    newText = encText;
  } else {
    newText = text;
  }

  try {
    const message = (await postAppwriteMessage(
      {
        text: newText,
        status: "sent",
        chatId: makeChatId(userId, contactId),
        senderId: userId,
        receiverId: contactId,
        timestamp: new Date().toISOString(),
      },
      [
        Permission.read(Role.user(userId)), // ✅ sender can read
        Permission.read(Role.user(contactId)), // ✅ receiver can read
        Permission.update(Role.user(userId)), // optional, if you want sender to update status
        Permission.delete(Role.user(userId)), // optional, if you want sender to delete status
        Permission.delete(Role.user(contactId)), // optional
      ]
    )) as unknown as MessageType;

    // ^ send push notification to all devices that the contact have.
    const pushNotifications = [];
    for (const target of contact.targets ?? []) {
      if (target.providerType === "push") {
        try {
          const result = await sendFCMAppwriteMessage({ target: target.$id, text, userName, senderUsername: userName, message });
          pushNotifications.push(result);
        } catch (err: any) {
          pushNotifications.push({ error: true, target: target.$id, message: err.message });
        }
      }
    }
    return {
      message,

      pushStatus: {
        total: pushNotifications.length,
        results: pushNotifications,
      },
    };
  } catch (error) {
    throw createError(error as any);
  }
});
