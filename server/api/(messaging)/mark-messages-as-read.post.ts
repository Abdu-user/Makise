import { Models } from "node-appwrite";
import {
  initializeServerAppWrite,
  queryDocument,
  sendFCMNotification,
  updateAppwriteDocument,
} from "~/composables/server/useAppwriteWebClient";
import { MessageType, UserProfileType } from "~/types/type";
import { makeChatId } from "~/utils/messaging";

export default defineEventHandler(async (event) => {
  const { messaging, users, Query, ID } = initializeServerAppWrite();
  const body = await readBody(event);
  const { contactUserName, unreadMessagesNumber } = body;
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
    const contactUser = await users.get(contactId);

    const readUpdater = await Promise.all(
      (contactUser.targets ?? [])
        .filter((target) => target.providerType === "push")
        .map(async (target) => {
          try {
            const result = await sendFCMNotification({
              target: target.$id,
              data: {
                type: "readMessageUpdate",
                readMessagesId: readResults.map((readM) => readM.$id).join(":"),
              },
            });
            return result;
          } catch (err: any) {
            return { error: true, target: target.$id, message: err.message };
          }
        })
    );

    return { readResults, readUpdater, contact, contactTarget: contact.targets };
  } catch (error) {
    createError(error as any);
  }
});
