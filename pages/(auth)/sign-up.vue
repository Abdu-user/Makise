<template>
  <div class="min-h-screen flex flex-col justify-stretch items-stretch md:justify-center md:items-center bg-mainBg px-4 py-6 sm:px-0">
    <div class="w-full h-full max-md:flex-1 max-w-md bg-accent rounded-lg shadow-lg p-6 sm:p-8">
      <div class="mb-6">
        <!-- Back button -->
        <ClientOnly>
          <CustomButton2
            icon
            name="material-symbols-light:keyboard-backspace"
            class="relative -top-0 -left-3"
            aria-label="back button"
            size="lg"
            @click="router.back"
          />
        </ClientOnly>
      </div>
      <h2 class="text-2xl font-bold text-primary mb-6 text-center">Sign Up</h2>
      <form
        class="space-y-6"
        @submit.prevent="handleSubmit"
      >
        <div>
          <label
            class="block text-highlight font-medium mb-2"
            for="email"
            >Email</label
          >
          <input
            id="email"
            type="email"
            v-model="email"
            class="w-full px-4 py-3 border border-primary rounded focus:outline-none focus:ring-2 focus:ring-active bg-white text-base"
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label
            class="block text-highlight font-medium mb-2"
            for="password"
            >Password</label
          >
          <input
            id="password"
            type="password"
            v-model="password"
            class="w-full px-4 py-3 border border-primary rounded focus:outline-none focus:ring-2 focus:ring-active bg-white text-base"
            placeholder="••••••••"
          />
        </div>
        <div>
          <label
            class="block text-highlight font-medium mb-2"
            for="confirmPassword"
            >Confirm Password</label
          >
          <input
            id="confirmPassword"
            type="password"
            v-model="confirmPassword"
            class="w-full px-4 py-3 border border-primary rounded focus:outline-none focus:ring-2 focus:ring-active bg-white text-base"
            placeholder="••••••••"
          />
        </div>
        <button
          type="submit"
          class="w-full py-3 px-4 bg-primary hover:bg-active text-white font-semibold rounded transition-colors text-base"
        >
          Create Account
        </button>
      </form>
      <p class="mt-6 text-center text-highlight text-base">
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
  <div
    v-if="isVerifyModalOpen"
    class="fixed flex justify-center items-center bg-black bg-opacity-50 inset-0 z-50 top-0 left-0 right-0 bottom-0 backdrop-blur-sm"
  >
    <div
      v-if="isHappy"
      class="bg-accent rounded-lg shadow-lg p-6 sm:p-8 max-w-md w-full flex flex-col items-center"
    >
      <ClientOnly>
        <Icon
          name="mdi:check-circle"
          class="text-green-500 w-10 h-10"
        />
      </ClientOnly>

      <h3 class="text-xl font-bold text-primary mb-2 text-center">Verify Your Email</h3>
      <p class="text-highlight text-center mb-6">
        We've sent a verification code to your email address.<br />
        Please check your inbox and follow the instructions to complete your registration.
      </p>
      <div class="w-full">
        <input
          type="text"
          v-model="codeInput"
          class="w-full px-4 py-3 border border-primary rounded focus:outline-none focus:ring-2 focus:ring-active bg-white text-base mb-4 text-center"
        />

        <div class="flex justify-center gap-x-8 items-center mt-4">
          <CustomButton
            @click="closeVerifyEmailModal"
            variety="secondary"
            type="button"
            size="md"
            class="hover:bg-primary/10"
          >
            Close
          </CustomButton>
          <CustomButton
            variety="primary"
            type="button"
            size="md"
            @click="handleVerifyCode(codeInput)"
          >
            Resend Code
          </CustomButton>
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
import useVuelidate from "@vuelidate/core";
import { required, email as emailValidator, minLength, sameAs } from "@vuelidate/validators";
import { useRoute, useRouter } from "vue-router";
const defErrorMessage = "An unexpected error occurred during sign up.";
import { computed, ref, watch, onMounted } from "vue";
import CustomButton from "~/components/CustomButton.vue";
import { useGlobalSettingStore } from "~/store/globalSetting";
const state = useGlobalSettingStore();

const route = useRoute();
const router = useRouter();
const query = route.query;

watch(
  () => route.query,
  (newQuery, oldQuery) => updateModal(newQuery),
  { deep: true } // Important for watching deep changes within query
);
onMounted(() => updateModal(route.query));
function updateModal(latestQuery: typeof route.query) {
  isVerifyModalOpen.value = !!latestQuery["verify-email"];
  isHappy.value = !(latestQuery["is-sending-email-failed"] ?? false);
  if (!isHappy.value && errorMessage.value === "") errorMessage.value = defErrorMessage;
}

const isVerifyModalOpen = ref(false);
const closeVerifyEmailModal = () => {
  isVerifyModalOpen.value = false;
  router.push({ query: { ...route.query, "verify-email": undefined } });
};

const isHappy = ref(true);
const errorMessage = ref("");

const email = ref(state.isPrefilltheUserField ? "igromen1997@gmail.com" : "");
const password = ref(state.isPrefilltheUserField ? "12345678" : "");
const confirmPassword = ref(state.isPrefilltheUserField ? "12345678" : "");

const codeInput = ref("");
const codeInputMessage = ref("");

async function handleSubmit() {
  const rules = {
    email: { required, email: emailValidator },
    password: { required, minLength: minLength(6) },
    confirmPassword: { required, sameAsPassword: sameAs(password) },
  };

  const v$ = useVuelidate(rules, { email, password, confirmPassword });

  const isValid = await v$.value.$validate();
  if (!isValid) {
    alert("Please fix the errors in the form.");
    return;
  }
  try {
    sendCode(email.value);
    router.push({ query: { ...route.query, "verify-email": "true" } });
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
async function handleVerifyCode(code: string) {
  if (code.trim() === "" || code.length < 6) {
    codeInputMessage.value = "Please enter a valid code.";
    return;
  } else if (!/^\d+$/.test(code)) {
    codeInputMessage.value = "The code must contain only numbers.";
    return;
  }

  codeInputMessage.value = "";

  const res = await verifyCode(email.value, code);
  if (!res.success) return;
  router.push({ query: { ...route.query, "verify-email": undefined } });
  isHappy.value = true;
  errorMessage.value = "";
  try {
    await createAppwriteUser(email.value, password.value);
    router.push("/");
  } catch (err) {
    throw err;
  }
}
</script>
