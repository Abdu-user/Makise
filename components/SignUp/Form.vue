<template>
  <ModalsAlert v-if="errorMessage || false"> </ModalsAlert>
  <div class="min-h-screen flex flex-col justify-center items-center md:justify-center bg-mainBg px-4 py-6 sm:px-0">
    <div class="w-full h-full max-md:flex-1 max-w-md bg-accent rounded-lg shadow-lg p-6 sm:p-8">
      <div class="relative flex items-center justify-center">
        <CustomButton2
          icon
          name="material-symbols-light:keyboard-backspace"
          class="absolute -top-3 -left-1"
          aria-label="back button"
          size="lg"
          @click="router.back"
        />
        <h2 class="text-2xl font-bold text-primary mb-6 text-center">Sign Up</h2>
      </div>
      <form
        class="space-y-6"
        @submit.prevent="handleSubmit"
      >
        <div>
          <CustomLabel
            :error="emailError"
            for="email"
            >Email</CustomLabel
          >
          <CustomInput
            id="email"
            type="email"
            autocomplete="email"
            v-model="email"
            variant="input"
            placeholder="you@example.com"
            :error="Boolean(emailError)"
          />
        </div>
        <div>
          <CustomLabel
            for="password"
            :error="passwordError"
            >Password</CustomLabel
          >

          <CustomPasswordInput
            id="password"
            autocomplete="new-password"
            v-model="password"
            :error="Boolean(passwordError)"
            placeholder="••••••••"
          />
        </div>
        <div>
          <CustomLabel
            for="confirmPassword"
            class="mb-2"
            :error="confirmPasswordError"
            >Confirm Password</CustomLabel
          >
          <CustomPasswordInput
            id="confirmPassword"
            autocomplete="new-password"
            v-model="confirmPassword"
            placeholder="••••••••"
            :error="Boolean(confirmPasswordError)"
          />
        </div>
        <CustomButton2
          type="submit"
          variant="primary"
          block
          size="lg"
        >
          Create Account
        </CustomButton2>
      </form>
      <p class="mt-6 text-center text-textParagraph text-base">
        Already have an account?
        <NuxtLink
          to="/sign-in"
          class="text-primary hover:underline"
          >Sign In</NuxtLink
        >
      </p>
    </div>
  </div>

  <!-- Modal Verify Modal -->
  <SignUpModal
    v-if="isVerifyModalOpen"
    :email="email"
    :password="password"
    :errorMessage="errorMessage"
    :isHappy="isHappy"
    @close-modal="closeVerifyEmailModal"
    @on-verify-code-success="
      isHappy = true;
      errorMessage = '';
    "
  />
</template>
<script setup lang="ts">
import useVuelidate from "@vuelidate/core";
import { required, email as emailValidator, minLength, sameAs } from "@vuelidate/validators";
import { useRoute, useRouter } from "vue-router";
const defErrorMessage = "An unexpected error occurred during sign up.";
import { ref, watch, onMounted } from "vue";
import { useGlobalSettingStore } from "~/store/globalSetting";
const state = useGlobalSettingStore();

const route = useRoute();
const router = useRouter();
onMounted(() => updateModal(route.query));
function updateModal(latestQuery: typeof route.query) {
  isVerifyModalOpen.value = !!latestQuery["verify-email"];
  isHappy.value = !(latestQuery["is-sending-email-failed"] ?? false);
  if (!isHappy.value && errorMessage.value === "") errorMessage.value = defErrorMessage;
}

const isVerifyModalOpen = ref(false);

const isHappy = ref(true);
const errorMessage = ref("");

const email = ref("");
const password = ref("");
const confirmPassword = ref("");

const emailError = ref("");
const passwordError = ref("");
const confirmPasswordError = ref("");

const resetInputRef = () => {
  email.value = state.isPrefilltheUserField ? "idfdwjoshv@gmail.com" : "";
  password.value = state.isPrefilltheUserField ? "12345678" : "";
  confirmPassword.value = state.isPrefilltheUserField ? "12345678" : "";
};
onMounted(() => (state.setResetFunctions(resetInputRef), resetInputRef()));
onUnmounted(() => state.removeSingleResetFunction(resetInputRef));

async function handleSubmit() {
  if (await validateForm()) return;
  try {
    const res = await sendCode(email.value);
    console.log(res);
    router.replace({ query: { ...route.query, "verify-email": "true" } });
    isHappy.value = true;
    errorMessage.value = "";
  } catch (err) {
    router.replace({ query: { ...route.query, "is-sending-email-failed": "true" } });
    isHappy.value = false;
    errorMessage.value = (err as string) || defErrorMessage;
  } finally {
    isVerifyModalOpen.value = true;
  }
}

const closeVerifyEmailModal = () => {
  isVerifyModalOpen.value = false;
  router.replace({ query: { ...route.query, "verify-email": undefined } });
};

watch(
  () => route.query,
  (newQuery, oldQuery) => updateModal(newQuery),
  { deep: true } // Important for watching deep changes within query
);
async function validateForm() {
  // Clear previous errors
  emailError.value = "";
  passwordError.value = "";
  confirmPasswordError.value = "";

  const rules = {
    email: { required, email: emailValidator },
    password: { required, minLength: minLength(4) },
    confirmPassword: { required, sameAsPassword: sameAs(password) },
  };

  const v$ = useVuelidate(rules, { email, password, confirmPassword });

  const isValid = await v$.value.$validate();
  if (!isValid) {
    if (v$.value.email.$errors.length) {
      v$.value.email.$errors.forEach((err) => {
        if (err.$validator === "required") emailError.value += "Email is required.\n";
        if (err.$validator === "email") emailError.value += "Enter a valid email address.\n";
      });
    }
    if (v$.value.password.$errors.length) {
      v$.value.password.$errors.forEach((err) => {
        if (err.$validator === "required") passwordError.value += "Password is required.\n";
        if (err.$validator === "minLength") passwordError.value += "Password must be at least 6 characters long.\n";
      });
    }
    if (v$.value.confirmPassword.$errors.length) {
      v$.value.confirmPassword.$errors.forEach((err) => {
        if (err.$validator === "required") confirmPasswordError.value += "Password confirmation is required.\n";
        if (err.$validator === "sameAsPassword") confirmPasswordError.value += "Passwords must match.\n";
      });
    }
    return true;
  }
  return false;
}
</script>
