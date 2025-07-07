<template>
  <CustomContainer
    :variant="'UIContainer'"
    class="p-8 rounded-lg shadow-lg w-full mx-auto max-w-md md:sticky bottom-0"
  >
    <div class="relative flex items-center justify-center">
      <CustomButton
        icon
        :is-primary-color="'theme'"
        :variant="'text'"
        name="material-symbols-light:keyboard-backspace"
        class="absolute -top-3 -left-1"
        aria-label="back button"
        size="lg"
        @click="router.push('/')"
      />

      <h2 class="text-2xl font-bold text-primary mb-6 text-center">Sign In</h2>
    </div>
    <form @submit.prevent="onSignIn">
      <div class="mb-4">
        <CustomLabel
          class="mb-2"
          :error="emailError"
          for="email"
        >
          Email
        </CustomLabel>
        <CustomInput
          :size="'lg'"
          id="email"
          v-model="email"
          type="email"
          autocomplete="email"
          required
          placeholder="Email"
          variant="input"
        />
      </div>
      <div class="mb-6">
        <CustomLabel
          class="mb-2"
          :error="passwordError"
          for="password"
        >
          Password</CustomLabel
        >
        <CustomPasswordInput
          :size="'lg'"
          id="password"
          v-model="password"
          required
          aria-placeholder="password"
          placeholder="Password"
          autocomplete="current-password"
        />
      </div>
      <CustomButton
        :is-primary-color="'primary'"
        type="submit"
        variant="primary"
        block
        size="lg"
      >
        Sign In
      </CustomButton>
      <p class="mt-4 text-center text-sm text-textParagraph">
        <NuxtLink
          href="/recovery"
          replace
          class="text-primary hover:underline outline-none focus:outline-primary rounded-lg focus:outline-2 focus:outline-offset-[6px]"
          >Forgot password</NuxtLink
        >
      </p>
    </form>
    <p class="mt-4 text-center text-sm text-textParagraph">
      Don't have an account?
      <NuxtLink
        href="/sign-up"
        replace
        class="text-primary hover:underline outline-none focus:outline-primary rounded-lg focus:outline-2 focus:outline-offset-[6px]"
        >Sign Up</NuxtLink
      >
    </p>
    <ModalsError
      @handleOk="notifyError = ''"
      :isOpen="Boolean(notifyError)"
      ok
    >
      {{ notifyError }}
    </ModalsError>
  </CustomContainer>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useAuth } from "~/composables/useSignUp";
import { useGlobalSettingStore } from "~/store/globalSetting";
const { login } = useAuth();
const router = useRouter();
const state = useGlobalSettingStore();
const notifyError = ref("");

const email = ref("");
const password = ref("");
const emailError = ref("");
const passwordError = ref("");

function onSignIn() {
  emailError.value = "";
  passwordError.value = "";

  if (!email.value) emailError.value = "Email is required";

  if (!validateEmail(email.value)) emailError.value = "Invalid email format";

  login(email.value, password.value)
    .then((res) => {
      const conditionalRedirect = state.fromPage ? state.fromPage : "/";
      router.push(conditionalRedirect);

      saveDeviceToken();
      state.setFeedback("success", "Successfully signed in");
    })
    .catch((error) => {
      if (error.message.includes("email")) emailError.value = "Email not found";
      else if (error.message.includes("password")) passwordError.value = "Incorrect password";
      else {
        notifyError.value = error.message;
      }
      state.setFeedback("error", "Failed to sign itn");
    });

  function validateEmail(email: string): boolean {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }
}

function resetInputValues() {
  email.value = state.isPrefillTheUserField ? "igromen1997@gmail.com" : "";
  password.value = state.isPrefillTheUserField ? "12345678" : "";
}

onMounted(() => {
  state.setResetFunctions(resetInputValues);
  resetInputValues();
});

onUnmounted(() => state.removeSingleResetFunction(resetInputValues));
</script>
