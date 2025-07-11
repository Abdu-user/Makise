import { useSIgnUpStore } from "~/store/signUpStore";

export default defineNuxtRouteMiddleware(async (to, from) => {
  if (import.meta.server) return;
  const signUpState = useSIgnUpStore();

  if (!signUpState.email || !signUpState.password) {
    console.log(signUpState);
    return navigateTo("/sign-up");
  }
});
