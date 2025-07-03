import * as sdk from "node-appwrite";
import type { MessageType, UserProfileType } from "~/types/type";

const client = new sdk.Client();

client
  .setEndpoint(process.env.APPWRITE_ENDPOINT!)
  .setProject(process.env.APPWRITE_PROJECT_ID!)
  .setKey(process.env.APPWRITE_SECRET_API_KEY!);

const messaging = new sdk.Messaging(client);
const database = new sdk.Databases(client);
const users = new sdk.Users(client);

export async function getAppwriteDocument(databaseVariant: "users", documentId: string) {
  const { databaseId, usersCollectionId } = checkEnvs();
  const { database } = initializeServerAppWrite();
  if (databaseVariant === "users") {
    const user = await database.getDocument(databaseId, usersCollectionId, documentId);
    return user as sdk.Models.Document & UserProfileType;
  }
}
export async function updateAppwriteDocument(databaseVariant: "users", documentId: string, data: Partial<UserProfileType>) {
  const { databaseId, usersCollectionId } = checkEnvs();
  const { database } = initializeServerAppWrite();
  if (databaseVariant === "users") {
    const user = await database.updateDocument(databaseId, usersCollectionId, documentId, data);
    return user as sdk.Models.Document & UserProfileType;
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

export async function sendFCMAppwriteMessage({ target, userName, text }: { target: string; userName: string; text: string }) {
  return await messaging.createPush(
    sdk.ID.unique(), // messageId
    userName, // title (optional)
    text, // body (optional)
    [], // topics (optional)
    [], // users (optional)
    [target], // targets (optional)
    {}, // data (optional)
    "<ACTION>" // action (optional)
    // "[ID1:ID2]", // image (optional)
    // "<ICON>", // icon (optional)
    // "<SOUND>", // sound (optional)
    // "<COLOR>", // color (optional)
    // "<TAG>", // tag (optional)
    // undefined, // badge (optional)
    // false, // draft (optional)
    // "", // scheduledAt (optional)
    // false, // contentAvailable (optional)
    // false, // critical (optional)
    // sdk.MessagePriority.High // priority (optional)
  );
}
export async function postAppwriteMessage(message: Omit<MessageType, "id">) {
  const { databaseId, messagesCollectionId } = checkEnvs();

  const res = await database.createDocument(databaseId, messagesCollectionId, sdk.ID.unique(), message);
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
