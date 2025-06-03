// composables/useAppwrite.ts
import { ID, Storage } from "appwrite";
import { useGlobalSettingStore } from "~/store/globalSetting";
import type { UserProfileType } from "~/types/type";

export async function useAppwriteToRegisterUser(data: UserProfileType) {
  const { $appwrite } = useNuxtApp();
  const databases = $appwrite.databases;
  const config = useRuntimeConfig();
  const userId = (await $appwrite.account.get()).$id;
  if (!userId) throw "There is no user";
  return await databases.createDocument(config.public.appwriteDatabaseId, config.public.appwriteCollectionId, userId, data);
}

export function useAppwriteDocumentUpdate(documentId: string, data: Partial<UserProfileType>) {
  const { $appwrite } = useNuxtApp();
  const databases = $appwrite.databases;
  const config = useRuntimeConfig();

  return databases.updateDocument(config.public.appwriteDatabaseId, config.public.appwriteCollectionId, documentId, data);
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
