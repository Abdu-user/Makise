// const sdk = require('node-appwrite');

import {
  initializeServerAppWrite,
  postAppwriteMessage,
  queryDocument,
  sendFCMAppwriteMessage,
} from "~/composables/server/useAppwriteWebClient";

// await messaging.createPushToken("[your-push-target-id]", token);

export default defineEventHandler(async (event) => {
  const { messaging, users, ID, Query } = initializeServerAppWrite();
  const query = getQuery(event);
  const userId = getCookie(event, "userId");
  const contactUsername = query.contactUsername as string;
  const messageLimit = query.messageLimit as string;

  if (!userId || !contactUsername || !messageLimit) {
    throw createError({ statusCode: 400, statusMessage: "Missing parameters" });
  }

  try {
    const contactId = (await queryDocument([Query.equal("username", contactUsername)])).documents[0].$id;

    const chatId = [userId, contactId].sort().join("_");
    const messages = await queryDocument([Query.equal("chatId", chatId), Query.limit(Number(messageLimit))], "messages");
    return { success: true, messages: messages.documents, total: messages.total };
  } catch (error: any) {
    throw createError(error);
  }

  return {};
});
