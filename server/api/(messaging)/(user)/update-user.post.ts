// server/api/update-user.ts
import { initializeServerAppWrite } from "~/composables/server/useAppwriteWebClient";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { documentId, permissions, data } = body;

  const { database, Query } = initializeServerAppWrite();
  const config = useRuntimeConfig();

  if (data.username) {
    if (data.username.length < 6) {
      throw createError({ statusCode: 400, statusMessage: "Username must be at least 6 characters long" });
    }
    const existing = await database.listDocuments(config.public.appwriteDatabaseId, config.public.appwriteCollectionId, [
      Query.equal("username", data.username),
    ]);
    if (existing.documents.length > 0 && existing.documents[0].$id !== documentId) {
      throw createError({ statusCode: 400, statusMessage: "Username is already taken" });
    }
  }

  const user = await database.updateDocument(
    config.public.appwriteDatabaseId,
    config.public.appwriteCollectionId,
    documentId,
    data,
    permissions
  );

  return user;
});
