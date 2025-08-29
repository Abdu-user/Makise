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

      <h2 class="text-2xl font-bold text-primary mb-6 text-center">{{ $t("signIn.title") }}</h2>
    </div>
    <form @submit.prevent="onSignIn">
      <div class="mb-4">
        <CustomLabel
          class="mb-2"
          :error="emailError"
          for="email"
        >
          {{ $t("signIn.emailLabel") }}
        </CustomLabel>
        <CustomInput
          :size="'lg'"
          id="email"
          v-model="email"
          type="email"
          autocomplete="email"
          required
          :placeholder="$t('signIn.emailPlaceholder')"
          variant="input"
        />
      </div>
      <div class="mb-6">
        <CustomLabel
          class="mb-2"
          :error="passwordError"
          for="password"
        >
          {{ $t("signIn.passwordLabel") }}</CustomLabel
        >
        <CustomPasswordInput
          :size="'lg'"
          id="password"
          v-model="password"
          required
          :aria-placeholder="$t('signIn.passwordPlaceholder')"
          :placeholder="$t('signIn.passwordPlaceholder')"
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
        {{ $t("signIn.buttonText") }}
      </CustomButton>
      <p class="mt-4 text-center text-sm text-textParagraph">
        <NuxtLink
          href="/recovery"
          replace
          class="text-primary hover:underline outline-none focus:outline-primary rounded-lg focus:outline-2 focus:outline-offset-[6px]"
          >{{ $t("signIn.forgotPassword") }}</NuxtLink
        >
      </p>
    </form>
    <p class="mt-4 text-center text-sm text-textParagraph">
      {{ $t("signIn.noAccountPrompt") }}
      <NuxtLink
        href="/sign-up"
        replace
        class="text-primary hover:underline outline-none focus:outline-primary rounded-lg focus:outline-2 focus:outline-offset-[6px]"
        >{{ $t("signIn.signUpLink") }}</NuxtLink
      >
    </p>
    <GoogleSignButton />
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
import { useI18n } from "vue-i18n"; // Import useI18n
import { getDecryptedPrivateKey, getSalt } from "~/composables/encryption/useAccountKey";
import { getPrivateKey } from "~/composables/useKeyPair";
import { useAuth } from "~/composables/useSignUp";
import { useGlobalSettingStore } from "~/store/globalSetting";

const { t } = useI18n(); // Initialize t for translations
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

  if (!email.value) emailError.value = t("signIn.errors.emailRequired");

  if (!validateEmail(email.value)) emailError.value = t("signIn.errors.invalidEmailFormat");

  login(email.value, password.value)
    .then(async (res) => {
      const conditionalRedirect = state.fromPage ? state.fromPage : "/profile";
      router.push(conditionalRedirect);

      saveDeviceToken();
      await refreshUserData();
      try {
        await isEncryptionReadyIfNot_createAgain();
      } catch (error) {
        console.error("failed with encryption of salt, and privateKey ", error);
      }

      state.setFeedback("success", t("signIn.feedback.success"));
    })
    .catch((error) => {
      if (error.message.includes("email")) emailError.value = t("signIn.errors.emailNotFound");
      else if (error.message.includes("password")) passwordError.value = t("signIn.errors.incorrectPassword");
      else {
        notifyError.value = error.message;
      }
      state.setFeedback("error", t("signIn.feedback.failed"));
    });

  function validateEmail(email: string): boolean {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }
}

function resetInputValues() {
  email.value = "";
  password.value = "";
}

onMounted(() => {
  state.setResetFunctions(resetInputValues);
  resetInputValues();
});

onUnmounted(() => state.removeSingleResetFunction(resetInputValues));

async function isEncryptionReadyIfNot_createAgain() {
  deletePrivateKey();
  const user = await useAuth().current();
  const userData = await useAppwriteDocumentGet(user.$id);
  const { encryptedPrivateKey, publicKey: savedPublicKey } = userData;

  if (encryptedPrivateKey && savedPublicKey && (await getSalt())) {
    const decryptedPrivateKey = await getDecryptedPrivateKey(password.value);
    savePrivateKey(decryptedPrivateKey);
  } else {
    try {
      createEncryption(password.value);
    } catch (error) {
      console.error("Error during encryption setup:", error);
      throw new Error("Encryption setup failed: " + error);
    }
  }
}
</script>
