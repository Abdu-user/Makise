// File: server/api/verify-user.ts
import { defineEventHandler, readBody } from "h3";
import * as sdk from "node-appwrite";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const userId = body.userId; // should come from your frontend

  const client = new sdk.Client()
    .setEndpoint(process.env.APPWRITE_ENDPOINT!)
    .setProject(process.env.APPWRITE_PROJECT_ID!)
    .setKey(process.env.APPWRITE_SECRET_API_KEY!); // Admin key – keep secret

  const users = new sdk.Users(client);

  try {
    const result = await users.updateEmailVerification(userId, true);
    return { success: true, result };
  } catch (error) {
    return { success: false, error: error };
  }
});
