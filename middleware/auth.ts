import { useGlobalSettingStore } from "~/store/globalSetting";

export default defineNuxtRouteMiddleware(async (to, from) => {
  if (import.meta.server) return;
  const { $appwrite } = useNuxtApp();
  const state = useGlobalSettingStore();

  // Only capture certain routes if needed

  try {
    await $appwrite.account.get();
    // Authenticated – let navigation continue
  } catch {
    // @ts-ignore
    state.setFromPage(to.fullPath);
    return navigateTo("/sign-up");
  }
});
