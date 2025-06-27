import { codeStore } from "../../lib/codes";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { email, code } = body;

  // bypass the checking for now
  // return { success: true, message: "Code verified successfully" };

  const record = codeStore.get(email);
  if (!record) {
    throw createError({ statusCode: 400, statusMessage: "No code found for this email: " + email });
  }
  // Optional: check if code expired (e.g. 5 minutes)
  if (Date.now() - record.createdAt > 50 * 60 * 1000) {
    codeStore.delete(email);
    throw createError({ statusCode: 400, statusMessage: "Code expired" });
  }
  if (record.code !== code) {
    throw createError({ statusCode: 400, statusMessage: "Code does not match. Code: " + code });
  }

  codeStore.delete(email); // Remove code after successful verification
  return { success: true, message: "Code verified successfully" };
});
