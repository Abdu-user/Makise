<template>
  <CustomContainer
    :variant="'UIContainer'"
    class="p-5"
  >
    <div class="flex items-center">
      <BackButton class="mb-4 w-10 h-10 p-1 mr-4 mt-4" />
      <h1 class="text-2xl">
        Recover your
        <span class="text-primary">{{ bigNames.appName }} </span>
        Account
      </h1>
    </div>
    <div class="px-4 pt-5">
      <form @submit="recoverAccount">
        <CustomLabel>
          Email
          <CustomInput
            v-model="inputValue"
            :type="'email'"
            :variant="'input'"
            class="h-11 pl-3"
            required
          />
        </CustomLabel>
        <CustomButton
          :variant="'primary'"
          :is-primary-color="'primary'"
          type="submit"
          :block="true"
          class="mt-3"
        >
          Submit
        </CustomButton>
      </form>
      <p class="max-w-md mx-auto mt-5">
        If you have forgotten your password, please enter your email address above. We will send you an email with instructions on how to
        reset your password.
      </p>
    </div>
  </CustomContainer>
</template>

<script setup lang="ts">
import { sendRecovery } from "~/composables/useRecovery";
import { bigNames } from "~/mainFrame";
const inputValue = ref("");
function recoverAccount() {
  sendRecovery(inputValue.value);
}
</script>

<style scoped></style>
