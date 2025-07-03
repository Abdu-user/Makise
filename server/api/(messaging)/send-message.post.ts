// const sdk = require('node-appwrite');

import {
  initializeServerAppWrite,
  postAppwriteMessage,
  queryDocument,
  sendFCMAppwriteMessage,
} from "~/composables/server/useAppwriteWebClient";

// await messaging.createPushToken("[your-push-target-id]", token);

export default defineEventHandler(async (event) => {
  const { messaging, users, Query, ID } = initializeServerAppWrite();
  const body = await readBody(event);
  const { text, userId, userName, contactUserName } = body;

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
  const user = await users.get(contactId);

  const message = await postAppwriteMessage({
    text,
    status: "sent",
    chatId: [userId, contactId].sort().join("_"),
    senderId: userId,
    receiverId: contactId,
    timestamp: new Date().toISOString(),
  });

  const pushNotifications = [];
  for (const target of user.targets ?? []) {
    if (target.providerType === "push") {
      try {
        const result = await sendFCMAppwriteMessage({ target: target.$id, text, userName });
        pushNotifications.push(result);
      } catch (err: any) {
        pushNotifications.push({ error: true, target: target.$id, message: err.message });
      }
    }
  }

  return {
    messageSent: message,
    pushStatus: {
      total: pushNotifications.length,
      results: pushNotifications,
    },
  };
});
