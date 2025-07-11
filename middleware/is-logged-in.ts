import { useGlobalSettingStore } from "~/store/globalSetting";

export default defineNuxtRouteMiddleware(async (to, from) => {
  if (import.meta.server) return;
  const { $appwrite } = useNuxtApp();
  const state = useGlobalSettingStore();

  // Only capture certain routes if needed
  // console.log(to, from);

  try {
    await $appwrite.account.get();
    return navigateTo("/profile");
  } catch {}
});
