import { initializeServerAppWrite } from "~/composables/server/useAppwriteWebClient";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { userId } = body;

  if (!userId) createError("No userId is provided ");
  const { database, users } = initializeServerAppWrite();

  try {
    const result = await users.delete(userId);
    return result;
  } catch (error) {}
});
