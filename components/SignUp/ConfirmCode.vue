<template>
  <div class="flex justify-center items-center backdrop-blur-md">
    <CustomContainer
      :variant="'UIContainer'"
      class="bg-accent rounded-lg shadow-lg p-6 sm:p-8 max-w-md w-full flex flex-col items-center"
    >
      <div class="flex items-center mb-3 relative">
        <Icon
          name="material-symbols-light:check-circle"
          class="text-green-500 w-10 h-10 absolute -left-16"
        />

        <h3 class="text-2xl font-bold text-primary mb-2 text-center">Verify Your Email</h3>
      </div>
      <p class="text-center mb-6">
        We've sent a verification code to your email <span class="text-primary">{{ signUpState.email }}</span> address.<br />
        Please check your inbox and follow the instructions to complete your registration.
      </p>
      <div class="w-full">
        <CustomLabel
          :error="codeInputMessage"
          for="verify-code"
          :is-animating-n="btnClick"
        >
        </CustomLabel>
        <CustomInput
          id="verify-code"
          type="text"
          autocomplete="one-time-code"
          v-model="codeInput"
          class="my-2 text-center"
          placeholder="Code"
          :size="'lg'"
        />

        <div class="flex justify-center gap-x-8 items-center mt-4">
          <CustomButton
            :is-primary-color="'primary'"
            variant="outlined"
            type="button"
            size="lg"
            @click="router.back"
          >
            Go Back
          </CustomButton>
          <CustomButton
            :is-primary-color="'primary'"
            variant="primary"
            type="button"
            size="lg"
            @click="(handleVerifyCode(codeInput), btnClick++)"
          >
            Verify
          </CustomButton>
        </div>
      </div>
    </CustomContainer>
  </div>
  <!-- End of Modal -->
</template>

<script setup lang="ts">
import { createEncryption } from "~/composables/useEncryption";
import { useGlobalSettingStore } from "~/store/globalSetting";
import { useSIgnUpStore } from "~/store/signUpStore";

const router = useRouter();
const route = useRoute();
const btnClick = ref(0);
const state = useGlobalSettingStore();

const signUpState = useSIgnUpStore();

const codeInput = ref("");
const codeInputMessage = ref("");

async function handleVerifyCode(code: string) {
  if (code.trim() === "" || code.length < 6) {
    return (codeInputMessage.value = "Please enter a valid 6 digit code.");
  } else if (!/^\d+$/.test(code)) {
    return (codeInputMessage.value = "The code must contain only numbers.");
  }

  codeInputMessage.value = "";
  deletePrivateKey();
  try {
    const res = await verifyCode(signUpState.email, code);
    if (!res.success) throw res;
    router.push({ query: { ...route.query, "verify-email": undefined } });

    await createAppwriteUser(signUpState.email, signUpState.password);
    await createEncryption(signUpState.password);

    router.push("/profile");
    signUpState.resetSignUpState();
  } catch (err) {
    console.log("Error during verification:", err);

    state.setFeedback("error", `${err}`);
    throw err;
  }
}
</script>
