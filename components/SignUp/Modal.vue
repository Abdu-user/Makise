<template>
  <div class="fixed flex justify-center items-center bg-black bg-opacity-50 inset-0 z-50 top-0 left-0 right-0 bottom-0 backdrop-blur-sm">
    <div
      v-if="isHappy"
      class="bg-accent rounded-lg shadow-lg p-6 sm:p-8 max-w-md w-full flex flex-col items-center"
    >
      <div class="flex items-center mb-3 relative">
        <Icon
          name="material-symbols-light:check-circle"
          class="text-green-500 w-10 h-10 absolute -left-16"
        />

        <h3 class="text-2xl font-bold text-primary mb-2 text-center">Verify Your Email</h3>
      </div>
      <p class="text-textParagraph text-center mb-6">
        We've sent a verification code to your email <span class="text-primary">{{ email }}</span> address.<br />
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
          class="mb-2 text-center"
          placeholder="Code"
        />

        <div class="flex justify-center gap-x-8 items-center mt-4">
          <CustomButton2
            @click="closeVerifyEmailModal"
            variant="outlined"
            type="button"
            size="lg"
          >
            Close
          </CustomButton2>
          <CustomButton2
            variant="primary"
            type="button"
            size="lg"
            @click="(handleVerifyCode(codeInput), btnClick++)"
          >
            Verify
          </CustomButton2>
        </div>
      </div>
    </div>

    <div
      v-else
      class="bg-accent rounded-lg shadow-lg p-6 sm:p-8 max-w-md w-full flex flex-col items-center"
    >
      <Icon
        name="heroicons:exclamation-circle"
        class="w-14 h-14 mb-3 text-red-500"
      />
      <h3 class="text-xl font-bold text-red-500 mb-2 text-center">Sign Up Failed</h3>
      <p class="text-highlight text-center mb-6">Error: {{ errorMessage }}</p>
      <!-- <button class="mt-2 px-6 py-2 bg-primary hover:bg-active text-white font-semibold rounded transition-colors">fffsf</button> -->
      <CustomButton
        @click="closeVerifyEmailModal"
        variety="secondary"
        type="button"
        size="md"
      >
        Close
      </CustomButton>
    </div>
  </div>
  <!-- End of Modal -->
</template>

<script setup lang="ts">
const router = useRouter();
const route = useRoute();
const btnClick = ref(0);

const props = defineProps({
  email: { type: String, required: true },
  password: { type: String, required: true },
  isHappy: { type: Boolean, required: true },
  errorMessage: { type: String, required: true },
});
const emit = defineEmits({
  closeModal: (payload: unknown) => true,
  onVerifyCodeSuccess: () => true,
});

const closeVerifyEmailModal = () => {
  emit("closeModal", {});
};

const codeInput = ref("");
const codeInputMessage = ref("");

async function handleVerifyCode(code: string) {
  if (code.trim() === "" || code.length < 6) {
    return (codeInputMessage.value = "Please enter a valid 6 digit code.");
  } else if (!/^\d+$/.test(code)) {
    return (codeInputMessage.value = "The code must contain only numbers.");
  }

  codeInputMessage.value = "";
  try {
    const res = await verifyCode(props.email, code);
    if (!res.success) throw res;
    router.push({ query: { ...route.query, "verify-email": undefined } });
    emit("onVerifyCodeSuccess");

    await createAppwriteUser(props.email, props.password);
    router.push("/");
  } catch (err) {
    throw err;
  }
}
</script>
