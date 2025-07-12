import { Models } from "node-appwrite";
import { initializeServerAppWrite, getAppwriteDocument, queryDocument } from "~/composables/server/useAppwriteWebClient";
import { ContactType } from "~/types/messaging";
import { UserProfileType } from "~/types/type";

export default defineEventHandler(async (event) => {
  try {
    const { Query } = initializeServerAppWrite();

    const userId = getCookie(event, "userId");
    const contactUsername = getRouterParam(event, "contactUsername");

    if (!userId) {
      throw createError({ statusCode: 401, statusMessage: "Not logged in" });
    }
    if (!contactUsername) {
      throw createError({ statusCode: 400, statusMessage: "No contact username provided" + contactUsername });
    }

    const user = await getAppwriteDocument("users", userId);
    if (!user) {
      throw createError({ statusCode: 404, statusMessage: "User not found" });
    }

    const contacts = user.contacts ?? [];
    const contactId = (await queryDocument([Query.equal("username", contactUsername)], "users")).documents[0].$id;

    if (!contacts.includes(contactId)) {
      throw createError({
        statusCode: 403,
        statusMessage: "This contact is not in your contacts list",
      });
    }

    const contactResult = await queryDocument([Query.equal("username", contactUsername), Query.limit(1)]);
    const contact = contactResult.documents[0] as Models.Document & UserProfileType;

    if (!contact) {
      throw createError({ statusCode: 404, statusMessage: "Contact not found" });
    }

    const response: { success: boolean; contact: ContactType } = {
      success: true,
      contact: {
        id: contact.$id,
        username: contact?.username ?? "",
        name: contact.name ?? "",
        lastName: contact.lastName ?? "",
        profileImage: contact.profileImage ?? "",
        lastOnline: contact.lastOnline ?? "",
        publicKey: contact.publicKey ?? "",
      },
    };
    return response;
  } catch (error: any) {
    console.error("Error in get-contact handler:", error);
    throw createError({
      statusCode: error?.statusCode || 500,
      statusMessage: error?.statusMessage || error?.message || "Unknown server error",
    });
  }
});
