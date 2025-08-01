<template>
  <CustomContainer
    :variant="'mainContainer'"
    class="min-h-screen grid justify-center items-center p-4 py-8 gap-8"
  >
    <CustomContainer
      :variant="'UIContainer'"
      class="p-5"
    >
      <h1 class="text-2xl mb-4">Reset Password</h1>
      <div
        class="border-l-4 p-4 rounded-lg shadow-sm space-y-3"
        style="background-color: var(--bg-light); border-color: var(--warning); color: var(--text)"
      >
        <div class="flex items-start gap-2">
          <span class="text-xl">⚠️</span>
          <h2 class="text-lg font-semibold">Warning: You May Lose Access to Previous Messages</h2>
        </div>

        <p>Your private messages are securely encrypted using your current password. If you reset your password:</p>

        <ul class="list-disc list-inside space-y-1 pl-2">
          <li>
            <span style="color: var(--danger); font-weight: 600">❌ You will not be able to read your past messages.</span>
          </li>
          <li>
            <span style="color: var(--success); font-weight: 600"
              >✅ You will still be able to send and receive new messages after the reset.</span
            >
          </li>
        </ul>

        <p>If you have saved your encryption key (private key), you can re-import it later to regain access.</p>
        <p
          class="text-sm font-medium"
          style="color: var(--text-muted)"
        >
          Please continue only if you're aware of this and accept the risk.
        </p>
      </div>

      <div class="grid gap-4 mt-5">
        <label for="newPassword"> New Password </label>
        <CustomPasswordInput
          id="newPassword"
          v-model="password"
          type="password"
          placeholder="New password"
          class="h-12 pl-4"
          required
        />
        <Label for="confirmPassword"> Confirm Password </Label>
        <CustomPasswordInput
          id="confirmPassword"
          v-model="confirmPassword"
          type="password"
          placeholder="Confirm password"
          class="h-12 pl-4"
          required
        />
        <CustomButton
          :variant="'primary'"
          :is-primary-color="'primary'"
          block
          @click="validatePassword"
          :size="'lg'"
        >
          Reset Password
        </CustomButton>
      </div>
      <p class="max-w-md mt-4">
        Enter a new password to reset your account password. After resetting, you can log in with the new password.
      </p>
    </CustomContainer>
  </CustomContainer>
</template>

<script setup lang="ts">
import { useGlobalSettingStore } from "~/store/globalSetting";
import CustomLabel from "./components/custom-label.vue";

const password = ref("");
const confirmPassword = ref("");
const state = useGlobalSettingStore();
const router = useRouter();

function validatePassword() {
  if (password.value !== confirmPassword.value) {
    state.setFeedback("error", "Passwords do not match. Please try again.");
    return;
  }
  if (password.value.length < 8) {
    state.setFeedback("error", "Password must be at least 8 characters long.");
    return;
  }
  // if (!/[A-Z]/.test(password.value) || !/[a-z]/.test(password.value) || !/\d/.test(password.value)) {
  //   state.setFeedback("error", "Password must contain at least one uppercase letter, one lowercase letter, and one number.");
  //   return;
  // }
  resetPassword(password.value)
    .then(() => {
      state.setFeedback("success", "Password reset successfully. You can now log in with your new password.");
      router.push("/sign-in");
    })
    .catch((error) => {
      state.setFeedback("error", `Failed to reset password: ${error.message}`);
    });
}
</script>
