<template>
  <div class="fixed bottom-4 right-4 z-50">
    <ClientOnly>
      <div
        v-if="state.isDebugPanelOpen"
        class="bg-activeWeak text-white rounded-lg shadow-lg p-4 min-w-[250px] max-w-xs flex flex-col"
      >
        <div
          class="flex justify-between items-center mb-2 overflow-y-auto"
          style="max-height: 60vh"
        >
          <p
            v-for="consoleMessage in state.consoleMessages"
            :key="consoleMessage"
            class="text-xs text-gray-300 mb-1"
          >
            {{ consoleMessage }}
          </p>
        </div>
        <div class="flex justify-between items-center mb-2">
          <span class="font-bold">Debug Panel</span>
          <button
            @click="toggleModal"
            class="text-gray-400 hover:text-white"
          >
            &times;
          </button>
        </div>
        <div class="text-sm">
          <!-- <slot> Debug info goes here. </slot> -->
          <CustomButton
            type="button"
            variety="primary"
            size="md"
            @click="logout"
          >
            Clear Auth
          </CustomButton>
          <CustomButton
            type="button"
            variety="secondary"
            size="md"
            @click="getUser"
            >GetUser</CustomButton
          >
          <CustomButton2
            variant="plain"
            @click="console.log(state.fromPage)"
          >
            log pinia
          </CustomButton2>
          <CustomButton
            type="button"
            variety="secondary"
            size="md"
            @click="tryToLogin"
            >Login</CustomButton
          >
          <CustomButton2
            type="button"
            variety="secondary"
            size="md"
            @click="logout"
            >Logout</CustomButton2
          >

          <CustomButton2
            type="button"
            variety="secondary"
            size="md"
            @click="toggleField()"
            class="flex"
            >Prefill the user Field
            <CustomInput
              class="w-full pointer-events-none"
              type="checkBox"
              :checked="state.isPrefilltheUserField"
            />
            {{ state.isPrefilltheUserField }}
          </CustomButton2>
        </div>
        <!-- Tail -->
        <div class="w-6 h-6 absolute right-4 -bottom-3">
          <svg
            viewBox="0 0 24 24"
            class="w-full h-full text-active"
          >
            <polygon
              points="12,24 24,0 0,0"
              fill="currentColor"
            />
          </svg>
        </div>
      </div>
      <button
        v-else
        @click="toggleModal"
        class="bg-active text-white rounded-full shadow-lg p-2 flex items-center hover:bg-highlight transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-active disabled:opacity-50 disabled:cursor-not-allowed justify-center text-sm font-semibold"
      >
        <svg
          class="w-10 h-10 mr-1"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          viewBox="0 0 24 24"
        >
          <path d="M13 16h-1v-4h-1m1-4h.01" />
          <circle
            cx="12"
            cy="12"
            r="10"
          />
        </svg>
        Debug
      </button>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
// @ts-ignore
import colors from "~/colors.ts";
import CustomButton from "./Custom/Button.vue";
import CustomButton2 from "./Custom/Button2.vue";
import { useGlobalSettingStore } from "~/store/globalSetting";
import { useAuth } from "~/composables/useSignUp";
import { cons } from "~/utils";
const state = useGlobalSettingStore();

const { logout, current, login } = useAuth();
const getUser = async () => {
  const res = await current();
  console.log("Current user:", res);
};

function toggleModal() {
  state.toggleDebugPanel();
}

function tryToLogin() {
  login("igromen1997@gmail.com", "12345678")
    .then(() => {
      cons("Login successful");
    })
    .catch((error) => {
      cons("Login failed:", error);
    });
}
function logGlobalState() {
  console.log("Global state:", state.user);
}
function toggleField() {
  state.toggleIsPrefillUserField();
  state.callResetFunctions();
  console.log(state.resetFunctions);
}
onMounted(() => {});
</script>

<style scoped>
/* Position the tail absolutely relative to the debug panel */
div[open] {
  position: relative;
}
</style>
