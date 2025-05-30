export default defineNuxtRouteMiddleware(async () => {
  if (import.meta.server) return;
  const { $appwrite } = useNuxtApp();

  try {
    await $appwrite.account.get();
    // Authenticated – let navigation continue
  } catch {
    return navigateTo("/sign-up");
  }
});
