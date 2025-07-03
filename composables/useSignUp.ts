import { useNuxtApp } from "nuxt/app";
import { useGlobalSettingStore } from "~/store/globalSetting";
import { useAppwriteToRegisterUser } from "~/composables/useAppwriteDocument";
import type { UserProfileType } from "~/types/type";

export async function sendCode(email: string): Promise<{ success: boolean; error: string } | string> {
  try {
    const response = await fetch("/api/send-code", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    if (!response.ok) {
      const res = await response.json();
      console.error(JSON.stringify(res));
      throw new Error(`Failed to send code: ${res.message}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error sending code:", error);
    return { success: false, error: (error as Error).message };
  }
}

export async function createAppwriteUser(email: string, password: string) {
  const state = useGlobalSettingStore();
  const { $appwrite } = useNuxtApp();
  try {
    const user = await $appwrite.account.create("unique()", email, password);

    await fetch("/api/verify-user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: user.$id,
      }),
    });

    const res = await useAuth().login(email, password);
    state.setUser(user);

    await useAppwriteToRegisterUser({ email });
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function verifyCode(email: string, code: string) {
  const response = await fetch("/api/verify-code", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, code }),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.statusMessage || "Verification failed");
  }
  return await response.json();
}

export async function verifyUpdate(userId: string, secret: string) {
  // verify User by Appwrite verification
  const { $appwrite } = useNuxtApp();
  await $appwrite.account.updateVerification(userId, secret);
}

export const useAuth = () => {
  const state = useGlobalSettingStore();
  const { $appwrite } = useNuxtApp();

  const login = async (email: string, password: string) => {
    const user = await $appwrite.account.createEmailPasswordSession(email, password);

    await current();

    return user;
  };

  const logout = async () => {
    try {
      const res = await $appwrite.account.deleteSession("current");
      state.setUser(null);
      state.setUserData(null);
      return res;
    } catch (error) {
      console.error("Logout failed:", error);
      throw error;
    }
  };

  async function current() {
    try {
      const user = await $appwrite.account.get();
      state.setUser(user);

      return user;
    } catch (error) {
      throw error;
    }
  }

  return { login, logout, current };
};

export async function refreshUserData() {
  const state = useGlobalSettingStore();
  try {
    if (!state.user?.$id) throw "There no user in globalSettingStore";
    const userData = (await useAppwriteDocumentGet(state.user.$id)) as unknown as UserProfileType;
    if (!userData) throw new Error("failed to fetch (useAppwriteDocumentGet()):" + userData);

    state.setUserData(userData);
  } catch (err) {
    console.log(err);
  }
}

export async function getUser() {
  const state = useGlobalSettingStore();
  const { current, logout } = useAuth();

  const { value: user, error, cb } = useAsyncFunction(current, state._loading, state._error, false);
  await cb();
  if (error.value) logout();
  if (user.value) state.setUser(user.value), await refreshUserData();
}

export async function deleteUser(userId: string) {
  try {
    fetch("/api/delete-user", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: userId }),
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
}
export async function deleteUserDocument(userId: string) {
  try {
    const { $appwrite } = useNuxtApp();
    const config = useRuntimeConfig();
    $appwrite.databases.deleteDocument(config.public.appwriteDatabaseId, config.public.appwriteCollectionId, userId);
  } catch (error) {
    console.error("Error deleting user document:", error);
    throw error;
  }
}
