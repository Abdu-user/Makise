<template></template>

<script setup lang="ts">
import { useGlobalSettingStore } from "~/store/globalSetting";

onMounted(async () => {
  try {
    saveDeviceToken();
    const account = useNuxtApp().$appwrite.account;
    const user = await account.get();
    const email = user.email || "";
    try {
      const doc = await useAppwriteDocumentGet(user.$id);
      if (!doc) throw "User document not found";
      if (doc.email !== email) throw "Email mismatch in user document";
    } catch (err) {
      await createAppwriteDocument(email);
    }

    const router = useRouter();
    router.push("/profile");
  } catch (err) {
    console.error(err);

    const state = useGlobalSettingStore();
    state.setFeedback("error", err as string);
  }
});
async function createAppwriteDocument(email: string) {
  // Save user to your own DB
  const update = await useAppwriteToRegisterUser({
    email,
    lastOnline: new Date().toISOString(),
  });
  return update;
}
</script>

<style scoped></style>
