import {
  initializeServerAppWrite,
  getAppwriteDocument,
  queryDocument,
  updateAppwriteDocument,
} from "~/composables/server/useAppwriteWebClient";

export default defineEventHandler(async (event) => {
  try {
    const { Query } = initializeServerAppWrite();
    const body = await readBody(event);
    const { contactUserName, userId, addContact } = body;

    if (!contactUserName) {
      throw createError({
        statusCode: 400,
        statusMessage: "contactUserName is not provided",
      });
    }
    if (!userId) {
      throw createError({
        statusCode: 400,
        statusMessage: "userId is not provided",
      });
    }

    const user = await getAppwriteDocument("users", userId);
    if (!user) {
      throw createError({
        statusCode: 404,
        statusMessage: "User not found",
      });
    }

    if (user.username === contactUserName) {
      throw createError({
        statusCode: 400,
        statusMessage: "You cannot add yourself as a contact",
      });
    }

    const contactQuery = await queryDocument([Query.equal("username", contactUserName)]);
    const contact = contactQuery.documents[0];

    if (!contact) {
      throw createError({
        statusCode: 404,
        statusMessage: "Contact user not found",
      });
    }

    if (addContact) {
      const contactId = contact.$id;
      const userContacts = user.contacts ?? [];
      const contactContacts = contact.contacts ?? [];

      const userAlreadyHas = userContacts.includes(contactId);
      const contactAlreadyHas = contactContacts.includes(user.$id);

      if (!userAlreadyHas) {
        await updateAppwriteDocument("users", userId, {
          contacts: [...userContacts, contactId],
        });
      }

      if (!contactAlreadyHas) {
        await updateAppwriteDocument("users", contact.$id, {
          contacts: [...contactContacts, user.$id],
        });
      }

      return {
        success: true,
        message: "Both users are now contacts",
        contactFound: true,
        contactAddedToTheUser: !userAlreadyHas,
        userAddedToContact: !contactAlreadyHas,
        contactId: contact.$id,
      };
    }

    return {
      success: true,
      message: "Contact found. Set 'addContact' to true to add it",
      contactFound: true,
      contactId: contact.$id,
    };
  } catch (error: any) {
    console.error("Error in add contact handler:", error);
    throw createError({
      statusCode: error?.statusCode || 500,
      statusMessage: error?.statusMessage || error?.message || "Unknown server error",
    });
  }
});
