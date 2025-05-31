<template>
  <div class="min-h-screen flex items-center justify-center bg-mainBg">
    <div class="bg-accent p-8 rounded-lg shadow-lg w-full max-w-md">
      <div class="relative flex items-center justify-center">
        <CustomButton2
          icon
          name="material-symbols-light:keyboard-backspace"
          class="absolute -top-3 -left-1"
          aria-label="back button"
          size="lg"
          @click="router.back"
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
            id="email"
            v-model="email"
            type="email"
            autocomplete="email"
            required
            placeholder="Email"
            :class="`w-full px-4 py-2 border border-highlight rounded focus:outline-none focus:ring-2 focus:ring-primary bg-white ${
              emailError ? '  decoration-red-500 text-red-500' : ''
            }`"
            :style="emailError && `text-decoration: underline; text-decoration-style: wavy;`"
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
            id="password"
            v-model="password"
            required
            aria-placeholder="password"
            placeholder="Password"
            autocomplete="current-password"
          />
        </div>
        <CustomButton2
          type="submit"
          variant="primary"
          block
          size="lg"
        >
          Sign In
        </CustomButton2>
      </form>
      <p class="mt-4 text-center text-sm text-textParagraph">
        Don't have an account?
        <NuxtLink
          href="/sign-up"
          class="text-primary hover:underline"
          >Sign Up</NuxtLink
        >
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useAuth } from "~/composables/useSignUp";
import { useGlobalSettingStore } from "~/store/globalSetting";
const { login } = useAuth();
const router = useRouter();
const state = useGlobalSettingStore();

const email = ref("");
const password = ref("");
const emailError = ref("");
const passwordError = ref("");

// Example validation logic (replace with your own as needed)
function onSignIn() {
  emailError.value = "";
  passwordError.value = "";

  if (!email.value) emailError.value = "Email is required";

  if (!validateEmail(email.value)) emailError.value = "Invalid email format";

  login(email.value, password.value)
    .then((res) => {
      router.push("/"); // Redirect to dashboard or home page after successful login
      console.log("Login successful:", res);
    })
    .catch((error) => {
      // Handle login error
      console.error("Login failed:", error);
      if (error.message.includes("email")) {
        emailError.value = "Email not found";
      }
      if (error.message.includes("password")) {
        passwordError.value = "Incorrect password";
      }
    });
  function validateEmail(email: string): boolean {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }
}

function resetInputValues() {
  email.value = state.isPrefilltheUserField ? "igromen1997@gmail.com" : "";
  password.value = state.isPrefilltheUserField ? "12345678" : "";
}
onMounted(() => {
  state.setResetFunctions(resetInputValues);
  console.log(state.resetFunctions);
  resetInputValues();
});
onUnmounted(() => state.removeSingleResetFunction(resetInputValues));
</script>
