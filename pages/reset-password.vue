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

      <div class="grid gap-4">
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
