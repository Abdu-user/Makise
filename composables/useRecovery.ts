import { Client, Account } from "appwrite";

export const sendRecovery = async (email: string) => {
  const { $appwrite } = useNuxtApp();
  const config = useRuntimeConfig();
  try {
    await $appwrite.account.createRecovery(email, `${config.public.appwriteRecoveryUrlPage}/reset-password`);
    alert("Check your email for a password reset link.");
  } catch (err) {
    console.error(err);
    alert("Failed to send recovery email." + err);
  }
};

export const resetPassword = async (password: string) => {
  const router = useRouter();
  const route = useRoute();
  const userId = route.query.userId as string;
  const secret = route.query.secret as string;

  const { $appwrite } = useNuxtApp();
  if (!userId || !secret) {
    throw new Error("Invalid reset link.");
  }

  try {
    await $appwrite.account.updateRecovery(userId, secret, password);
  } catch (err) {
    console.error(err);
    throw new Error("Reset failed. Link may be expired or invalid.");
  }
};
