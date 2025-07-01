// // const sdk = require("node-appwrite");
// // // @ts-ignore
// // // import sdk from "node-appwrite";
import { Client, Users } from "node-appwrite";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { userId } = body;

  if (!userId) {
    throw createError({
      statusCode: 400,
      statusMessage: "Missing user ID",
    });
  }
  // const config = useRuntimeConfig();
  const client = new Client()
    .setEndpoint(process.env.APPWRITE_ENDPOINT!)
    .setProject(process.env.APPWRITE_PROJECT_ID!)
    .setKey(process.env.APPWRITE_SECRET_API_KEY!); // Admin key – keep secret
  const users = new Users(client);

  try {
    await users.delete(userId);
    return { success: true, message: "User deleted successfully" };
  } catch (error) {
    return { success: false, error: error };
  } finally {
    console.log(`User deletion attempt for userId: ${userId}`);
  }
});
