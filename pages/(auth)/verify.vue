<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
    <div class="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
      <div class="flex justify-center mb-4">
        <svg
          class="w-16 h-16 text-green-500"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          viewBox="0 0 24 24"
        >
          <circle
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="2"
            fill="none"
          />
          <path
            d="M9 12l2 2l4-4"
            stroke="currentColor"
            stroke-width="2"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
      <h1 class="text-2xl font-bold mb-2 text-gray-800">Email Verified!</h1>
      <p class="text-gray-600 mb-6">
        Your email address has been successfully verified.<br />
        Thank you for confirming your account.
      </p>
      <router-link to="/login">
        <button class="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded transition">
          Continue to Login
        </button>
      </router-link>
    </div>
  </div>
</template>
<script setup lang="ts">
import { verifyUpdate } from "~/composables/useSignUp";
const route = useRoute();
verifyUpdate(route.query.userId as string, route.query.secret as string);
</script>
