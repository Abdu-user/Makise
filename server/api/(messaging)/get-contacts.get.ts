import { Models } from "node-appwrite";
import { initializeServerAppWrite, getAppwriteDocument, queryDocument } from "~/composables/server/useAppwriteWebClient";
import { UserProfileType } from "~/types/type";

export default defineEventHandler(async (event) => {
  try {
    const { Query } = initializeServerAppWrite();

    const userId = getCookie(event, "userId");

    if (!userId) {
      throw createError({
        statusCode: 401,
        statusMessage: "Not logged in (missing userId cookie)",
      });
    }

    const user = await getAppwriteDocument("users", userId);
    if (!user) {
      throw createError({
        statusCode: 404,
        statusMessage: "User not found",
      });
    }

    const contacts = user.contacts as string[] | undefined;

    if (!contacts || contacts.length === 0) {
      return {
        success: true,
        message: "No contacts found for this user",
        users: [],
      };
    }

    const userPromises = contacts.map((contactUsername) => queryDocument([Query.equal("username", contactUsername), Query.limit(1)]));

    const usersResults = await Promise.all(userPromises);

    const userPolished = usersResults
      .map((userR) => {
        const user = userR.documents[0] as Models.Document & UserProfileType;
        return user
          ? {
              username: user.username,
              profileImage: user.profileImage,
              id: user.$id,
              name: user.name,
              lastName: user.lastName,
              lastOnline: user.lastOnline,
            }
          : null;
      })
      .filter(Boolean);

    return {
      success: true,
      users: userPolished,
      usedCookie: userId,
    };
  } catch (error: any) {
    console.error("Error in get-contacts handler:", error);
    throw createError({
      statusCode: error?.statusCode || 500,
      statusMessage: error?.statusMessage || error?.message || "Unknown server error",
    });
  }
});
