import * as sdk from "node-appwrite";
import { permission } from "process";
import type { NotificationType } from "~/types/messaging";
import type { FCMTypes, MessageType, UserProfileType } from "~/types/type";

const client = new sdk.Client();

client
  .setEndpoint(process.env.APPWRITE_ENDPOINT!)
  .setProject(process.env.APPWRITE_PROJECT_ID!)
  .setKey(process.env.APPWRITE_SECRET_API_KEY!);

const messaging = new sdk.Messaging(client);
const database = new sdk.Databases(client);
const users = new sdk.Users(client);

export async function getAppwriteDocument(databaseVariant: "users" | "messages", documentId: string) {
  const { databaseId, usersCollectionId, messagesCollectionId } = checkEnvs();
  const { database } = initializeServerAppWrite();
  const collectionId = databaseVariant === "users" ? usersCollectionId : messagesCollectionId;
  if (databaseVariant === "users") {
    const user = await database.getDocument(databaseId, collectionId, documentId);
    return user as sdk.Models.Document & UserProfileType;
  }
}
export async function updateAppwriteDocument(
  collectionVariant: "users" | "messages",
  documentId: string,
  data: Partial<UserProfileType> | Partial<MessageType>
) {
  const { databaseId, usersCollectionId, messagesCollectionId } = checkEnvs();
  const { database } = initializeServerAppWrite();
  if (collectionVariant === "users") {
    const user = await database.updateDocument(databaseId, usersCollectionId, documentId, data);
    return user as sdk.Models.Document & UserProfileType;
  } else if (collectionVariant === "messages") {
    const message = await database.updateDocument(databaseId, messagesCollectionId, documentId, data);
    return message as sdk.Models.Document & MessageType;
  }
}

export function initializeServerAppWrite() {
  return { messaging, database, ID: sdk.ID, users, Query: sdk.Query };
}

export function checkEnvs() {
  const databaseId = process.env.APPWRITE_DATABASE_ID;
  const messagesCollectionId = process.env.APPWRITE_MESSAGES_COLLECTION_ID;
  const usersCollectionId = process.env.APPWRITE_COLLECTION_ID;

  if (!databaseId) throw createError("No database Id at postAppwriteMessage");
  if (!messagesCollectionId) throw createError("No messages collection Id at postAppwriteMessage");
  if (!usersCollectionId) throw createError("No users collection Id at postAppwriteMessage");

  return { databaseId, messagesCollectionId, usersCollectionId };
}

export async function sendFCMAppwriteMessage({
  target,
  userName,
  text,
  senderUsername,
  message,
}: {
  target: string;
  userName: string;
  text: string;
  senderUsername: string;
  message: MessageType;
}) {
  const messageId = sdk.ID.unique();
  const data: NotificationType & { type: FCMTypes } = {
    senderUsername,
    body: text,
    title: userName,
    link: `${process.env.APPWRITE_RECOVERY_URL_PAGE}/contacts/${senderUsername}`,
    time: new Date(Date.now()).toISOString(),
    messageId: message.$id,
    type: "pushNotification",
  };

  return await messaging.createPush(
    messageId, // messageId (string)
    undefined, // title (optional)
    undefined, // body (optional)
    [], // topics (optional)
    [], // users (optional)
    [target], // targets (optional)
    data // data (optional)
    // `${process.env.APPWRITE_RECOVERY_URL_PAGE}/contacts/${senderUsername}`, // action (optional)
    // "683e58ac002dde7fe98b:6869add60033a0a6c4f7", // image (optional)
    // "683e58ac002dde7fe98b:6869add60033a0a6c4f7" // icon (optional)
    //"<SOUND>" // sound (optional)

    // "<COLOR>",                    // color (optional)
    // "<TAG>",                      // tag (optional)
    // undefined,                    // badge (optional)
    // false,                        // draft (optional)
    // "",                           // scheduledAt (optional, ISO string)
    // false,                        // contentAvailable (optional)
    // false,                        // critical (optional)
    // sdk.MessagePriority.High     // priority (optional)
  );
}

export async function sendFCMNotification({
  target,
  data,
}: {
  target: string;
  data: {
    [key: string]: string;
  };
}) {
  const messageId = sdk.ID.unique();

  return await messaging.createPush(
    messageId, // messageId (string)
    undefined, // title (optional)
    undefined, // body (optional)
    [], // topics (optional)
    [], // users (optional)
    [target], // targets (optional)
    data // data (optional)
  );
}
export async function postAppwriteMessage(message: Omit<MessageType, "$id">, permissions: string[] = []) {
  const { databaseId, messagesCollectionId } = checkEnvs();

  const res = await database.createDocument(databaseId, messagesCollectionId, sdk.ID.unique(), message, permissions);
  return res;
}
export async function queryDocument(query: string[], collection: "users" | "messages" = "users") {
  const databaseId = process.env.APPWRITE_DATABASE_ID;
  const collectionId = process.env.APPWRITE_COLLECTION_ID;
  const messagesCollectionId = process.env.APPWRITE_MESSAGES_COLLECTION_ID;

  if (!databaseId) throw createError("No database Id at postAppwriteMessage");
  if (!collectionId) throw createError("No collection Id at postAppwriteMessage");
  if (!messagesCollectionId) throw createError("No messages Collection Id at postAppwriteMessage");

  const res = await database.listDocuments(databaseId, collection === "users" ? collectionId : messagesCollectionId, query);
  return res;
}
