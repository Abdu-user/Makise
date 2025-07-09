import { Models } from "node-appwrite";
import {
  initializeServerAppWrite,
  queryDocument,
  sendFCMNotification,
  updateAppwriteDocument,
} from "~/composables/server/useAppwriteWebClient";
import { FCMTypes, MessageType, UserProfileType } from "~/types/type";
import { makeChatId } from "~/utils/messaging";

export default defineEventHandler(async (event) => {
  const { messaging, users, Query, ID } = initializeServerAppWrite();
  const body = await readBody(event);
  const { contactUserName, unreadMessagesNumber, readMessageIds } = body;
  const userId = getCookie(event, "userId");

  if (!userId) {
    throw createError({ statusCode: 400, statusMessage: "No userId is provided" });
  }

  if (!contactUserName) {
    throw createError({ statusCode: 400, statusMessage: "contactUserName is NOT provided" });
  }
  if (!unreadMessagesNumber) {
    throw createError({ statusCode: 400, statusMessage: "unreadMessagesNumber is NOT provided" });
  }

  try {
    if (readMessageIds) {
      const readPromises = readMessageIds.map((readMessageId: string) => {
        return updateAppwriteDocument("messages", readMessageId, { status: "read" });
      });

      const readResults = (await Promise.all(readPromises)) as (Models.Document & MessageType)[];

      return {
        readResults,
        text: readResults.reduce((messages, message) => {
          return messages + ":" + message.text;
        }, ""),
      };
    } else {
      const contact = (await queryDocument([Query.equal("username", contactUserName)], "users")).documents[0] as Models.Document &
        UserProfileType;
      const contactId = contact.$id;

      const chatId = makeChatId(userId, contactId);
      const contactSMessages = (
        await queryDocument(
          [
            Query.equal("chatId", chatId),
            Query.equal("senderId", contactId),
            Query.notEqual("status", "read"),
            Query.orderDesc("$createdAt"),
            Query.limit(unreadMessagesNumber),
          ],
          "messages"
        )
      ).documents as (Models.Document & MessageType)[];

      const readPromises = contactSMessages.map((contactSMessage) => {
        return updateAppwriteDocument("messages", contactSMessage.$id, { status: "read" });
      });

      const readResults = (await Promise.all(readPromises)) as (Models.Document & MessageType)[];

      return {
        readResults,
        contact,
        text: readResults.reduce((messages, message) => {
          return messages + ":" + message.text;
        }, ""),
        contactTarget: contact.targets,
      };
    }
  } catch (error) {
    createError(error as any);
  }
});
