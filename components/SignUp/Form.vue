<template>
  <CustomContainer
    :variant="'UIContainer'"
    :class="`p-8 rounded-lg shadow-lg w-full mx-auto max-w-md md:sticky bottom-0 ${props.class}`"
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
      <h2 class="text-2xl font-bold text-primary mb-6 text-center">{{ $t("signUp.title") }}</h2>
    </div>
    <form
      class="space-y-6"
      @submit.prevent="handleSubmit"
    >
      <div>
        <CustomLabel
          :error="emailError"
          for="email"
          :is-animating-n="isAnimatingN"
        >
          {{ $t("signUp.emailLabel") }}
        </CustomLabel>
        <CustomInput
          :size="'lg'"
          id="email"
          type="email"
          autocomplete="email"
          v-model="signUpState.email"
          variant="input"
          :placeholder="'you@gmail.com'"
          :error="Boolean(emailError)"
        />
      </div>
      <div>
        <CustomLabel
          for="password"
          :error="passwordError"
          :is-animating-n="isAnimatingN"
        >
          {{ $t("signUp.passwordLabel") }}
        </CustomLabel>

        <CustomPasswordInput
          :size="'lg'"
          id="password"
          autocomplete="new-password"
          v-model="signUpState.password"
          :error="Boolean(passwordError)"
          :placeholder="$t('signUp.passwordPlaceholder')"
        />
      </div>
      <div>
        <CustomLabel
          for="confirmPassword"
          class="mb-2"
          :error="confirmPasswordError"
          :is-animating-n="isAnimatingN"
        >
          {{ $t("signUp.confirmPasswordLabel") }}
        </CustomLabel>
        <CustomPasswordInput
          :size="'lg'"
          id="confirmPassword"
          autocomplete="new-password"
          v-model="signUpState.confirmPassword"
          :placeholder="$t('signUp.confirmPasswordPlaceholder')"
          :error="Boolean(confirmPasswordError)"
        />
      </div>
      <CustomButton
        :is-primary-color="'primary'"
        type="submit"
        variant="primary"
        block
        size="lg"
      >
        {{ $t("signUp.buttonText") }}
      </CustomButton>
    </form>
    <p class="mt-6 text-center text-textParagraph text-base">
      {{ $t("signUp.alreadyAccountPrompt") }}
      <CustomNuxtLink
        to="/sign-in"
        replace
        :variant="'link'"
      >
        {{ $t("signUp.signInLink") }}
      </CustomNuxtLink>
    </p>
  </CustomContainer>

  <!-- Modal Verify Modal -->
</template>
<script setup lang="ts">
import useVuelidate from "@vuelidate/core";
import { required, email as emailValidator, minLength, sameAs } from "@vuelidate/validators";
import { useRoute, useRouter } from "vue-router";
// Use i18n for default error message
// const defErrorMessage = "An unexpected error occurred during sign up.";
import { ref, watch, onMounted } from "vue";
import { useGlobalSettingStore } from "~/store/globalSetting";
import { useSIgnUpStore } from "~/store/signUpStore";
import { useI18n } from "vue-i18n"; // Import useI18n

const props = defineProps({ class: String });

const state = useGlobalSettingStore();
const isAnimatingN = ref(0);

const route = useRoute();
const router = useRouter();
const { t } = useI18n(); // Initialize t for translations

const isHappy = ref(true);
const errorMessage = ref("");

const signUpState = useSIgnUpStore();

const emailError = ref("");
const passwordError = ref("");
const confirmPasswordError = ref("");

const resetInputRef = () => {
  signUpState.email = state.isPrefillTheUserField ? "idfdwjoshv@gmail.com" : "";
  signUpState.password = state.isPrefillTheUserField ? "87654321" : "";
  signUpState.confirmPassword = state.isPrefillTheUserField ? "87654321" : "";
};
onMounted(() => (state.setResetFunctions(resetInputRef), resetInputRef()));
onUnmounted(() => state.removeSingleResetFunction(resetInputRef));

async function handleSubmit() {
  if (await isValidForm()) return isAnimatingN.value++;
  if (await doesUserAlreadyExist()) return;

  try {
    const res = await sendCode(signUpState.email);

    if (typeof res === "object" && !res.success) throw res.error;
    state.setFeedback("success", t("signUp.feedback.codeSent", { email: signUpState.email }));
    router.push("/confirm-code");
    isHappy.value = true;
    errorMessage.value = "";
  } catch (err) {
    errorMessage.value = (err as string) || t("signUp.errors.unexpected");
  } finally {
  }
}

async function doesUserAlreadyExist() {
  const { $appwrite } = useNuxtApp();
  try {
    const user = await $appwrite.account.create("unique()", signUpState.email, signUpState.password);
    deleteUser(user.$id);
    return false;
  } catch (err) {
    console.log(err);
    state.setFeedback("error", t("signUp.errors.userExists")); // Use a generic error for now, or parse Appwrite specific errors
    return true;
  }
}

async function isValidForm() {
  // Clear previous errors
  emailError.value = "";
  passwordError.value = "";
  confirmPasswordError.value = "";

  const rules = {
    email: { required, email: emailValidator },
    password: { required, minLength: minLength(4) },
    confirmPassword: { required, sameAsPassword: sameAs(signUpState.password) },
  };

  const v$ = useVuelidate(rules, {
    email: signUpState.email,
    password: signUpState.password,
    confirmPassword: signUpState.confirmPassword,
  });

  const isValid = await v$.value.$validate();
  if (!isValid) {
    if (v$.value.email.$errors.length) {
      v$.value.email.$errors.forEach((err) => {
        if (err.$validator === "required") emailError.value += t("signUp.errors.emailRequired") + "\n";
        if (err.$validator === "email") emailError.value += t("signUp.errors.invalidEmailFormat") + "\n";
      });
    }
    if (v$.value.password.$errors.length) {
      v$.value.password.$errors.forEach((err) => {
        if (err.$validator === "required") passwordError.value += t("signUp.errors.passwordRequired") + "\n";
        if (err.$validator === "minLength") passwordError.value += t("signUp.errors.passwordMinLength") + "\n";
      });
    }
    if (v$.value.confirmPassword.$errors.length) {
      v$.value.confirmPassword.$errors.forEach((err) => {
        if (err.$validator === "required") confirmPasswordError.value += t("signUp.errors.confirmPasswordRequired") + "\n";
        if (err.$validator === "sameAsPassword") confirmPasswordError.value += t("signUp.errors.passwordsMustMatch") + "\n";
      });
    }
    return true;
  }
  return false;
}
</script>
