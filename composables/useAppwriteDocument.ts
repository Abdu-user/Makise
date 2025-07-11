// composables/useAppwrite.ts
import { ID, Permission, Query, Role, Storage } from "appwrite";
import { useGlobalSettingStore } from "~/store/globalSetting";
import type { UserProfileType } from "~/types/type";
import { generateRandomUsername } from "~/utils";

export async function useAppwriteToRegisterUser(data: UserProfileType) {
  const { $appwrite } = useNuxtApp();
  const databases = $appwrite.databases;
  const config = useRuntimeConfig();
  const userId = (await $appwrite.account.get()).$id;
  if (!userId) throw "There is no user";

  if (!data.username) {
    data.username = generateRandomUsername();
  }
  return await databases.createDocument(config.public.appwriteDatabaseId, config.public.appwriteCollectionId, userId, data, [
    Permission.read(Role.user(userId)),
    Permission.update(Role.user(userId)),
    Permission.delete(Role.user(userId)),
  ]);
}

export async function useAppwriteDocumentUpdate(documentId: string, data: Partial<UserProfileType>) {
  try {
    return await fetch("/api/update-user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ documentId, data }),
    });
  } catch (error) {
    throw error;
  }
}

export function useAppwriteDocumentGet(documentId: string) {
  const { $appwrite } = useNuxtApp();
  const databases = $appwrite.databases;
  const config = useRuntimeConfig();

  return databases.getDocument(config.public.appwriteDatabaseId, config.public.appwriteCollectionId, documentId);
}

export async function uploadFileToAppwrite(file: File) {
  const { $appwrite } = useNuxtApp();
  const config = useRuntimeConfig();
  const storage = new Storage($appwrite.client);
  const state = useGlobalSettingStore();

  try {
    if (!state.user) throw "There is not user state in pinia";
    const uploadedImg = await storage.createFile(
      config.public.appwriteBucketId,
      ID.unique(),
      file //
    );
    if (!uploadedImg) throw "File is not uploaded";
    const imgUrl = loadFileFromAppwrite(config.public.appwriteBucketId, uploadedImg.$id);

    return imgUrl;
  } catch (err) {
    throw err;
  }
}

export function loadFileFromAppwrite(bucketId: string, fileId: string) {
  const { $appwrite } = useNuxtApp();
  const storage = new Storage($appwrite.client);

  return storage.getFileDownload(bucketId, fileId);
}

export async function queryDocument(collectionVariant: "messages", query: string[]) {
  const { $appwrite } = useNuxtApp();
  const config = useRuntimeConfig();
  const databaseId = config.public.appwriteDatabaseId;
  const userCollectionId = config.public.appwriteCollectionId;
  const messageCollectionId = config.public.appwriteMessagesCollectionId;
  const collectionId = collectionVariant === "messages" ? messageCollectionId : userCollectionId;
  const res = await $appwrite.databases.listDocuments(databaseId, collectionId, query);
  return res.documents[0];
}
