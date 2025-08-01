<template>
  <div class="fixed bottom-4 left-4 z-50">
    <ClientOnly>
      <div
        v-if="state.isDebugPanelOpen"
        class="bg-activeWeak text-white rounded-lg shadow-lg p-4 min-w-[250px] max-w-xs flex flex-col gap-1"
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
        <template
          v-for="(category, index) in buttonGroups"
          :key="index"
        >
          <template
            v-for="(button, btnIndex) in category.buttons"
            :key="btnIndex"
          >
            <CustomButton
              v-if="button.if"
              :type="button.type"
              :variant="button.variant"
              :is-primary-color="button.isPrimaryColor"
              :size="button.size"
              @click="button.onClick"
              :class="(button as any).class"
            >
              {{ button.label }}
              <template v-if="(button as any).input">
                <CustomInput
                  :class="(button as any).input.class"
                  :type="(button as any).input.type"
                  :checked="(button as any).input.checked"
                />
                {{ (button as any).input.displayValue }}
              </template>
            </CustomButton>
          </template>
        </template>
        <CustomButton
          :variant="'primary'"
          @click="messagingState.focusSearchInput()"
        >
          focusInput ELement
        </CustomButton>
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
import { useGlobalSettingStore } from "~/store/globalSetting";
import { useAuth } from "~/composables/useSignUp";
import { cons } from "~/utils";
import { useMessagingStore } from "~/store/messaging";
import { Permission, Role } from "appwrite";
import { CustomButton } from "#components";

const state = useGlobalSettingStore();
const messagingState = useMessagingStore();

const { logout, current, login } = useAuth();

const getUser = async () => {
  const res = await current();
  console.log("Current user:", res);
};

const buttonGroups = [
  {
    category: "Auth & User Management",
    buttons: [
      {
        if: true,
        label: "Clear Auth",
        type: "button",
        variant: "primary" as "primary",
        isPrimaryColor: "primary" as "primary",
        size: "md",
        onClick: logout,
      },
      {
        if: true,
        label: "GetUser",
        type: "button",
        variant: "primary" as "primary",
        isPrimaryColor: "primary" as "primary",
        size: "md",
        variety: "secondary",
        onClick: getUser,
      },
      {
        if: state.user?.$id,
        label: "getUserById()",
        type: "button",
        variant: "primary" as "primary",
        isPrimaryColor: "primary" as "primary",
        size: "md",
        variety: "secondary",
        onClick: getUserById,
      },
      {
        if: true,
        label: "Logout",
        type: "button",
        variant: "primary" as "primary",
        isPrimaryColor: "theme" as "theme",
        size: "md",
        onClick: logout,
      },
      {
        if: true,
        label: "delete User",
        type: "button",
        variant: "primary" as "primary",
        isPrimaryColor: "theme" as "theme",
        size: "md",
        onClick: () => deleteUser("685e72247f8b4eacaf1b"),
      },
    ],
  },
  {
    category: "State & Debugging",
    buttons: [
      {
        if: true,
        label: "log pinia",
        type: "button",
        variant: "plain" as "plain",
        isPrimaryColor: "theme" as "theme",
        onClick: () => console.log(state.fromPage),
        size: "md",
      },
      {
        if: true,
        label: "logTheStates()",
        type: "button",
        variant: "primary" as "primary",
        isPrimaryColor: "theme" as "theme",
        size: "md",
        onClick: logTheStates,
      },
      {
        if: true,
        label: "messaging state",
        type: "button",
        variant: "primary" as "primary",
        isPrimaryColor: "theme" as "theme",
        size: "md",
        onClick: () => console.log(useMessagingStore()),
      },
    ],
  },
  {
    category: "Actions",
    buttons: [
      {
        if: true,
        label: "Login",
        type: "button",
        variant: "primary" as "primary",
        isPrimaryColor: "primary" as "primary",
        size: "md",
        variety: "secondary",
        onClick: tryToLogin,
      },
      {
        if: true,
        label: "sendNotification",
        type: "button",
        variant: "primary" as "primary",
        isPrimaryColor: "primary" as "primary",
        size: "md",
        variety: "secondary",
        onClick: sendNotification,
      },
      {
        if: true,
        label: "GiveUserPermission",
        type: "button",
        variant: "primary" as "primary",
        isPrimaryColor: "theme" as "theme",
        size: "md",
        onClick: GiveUserPermission,
      },
      {
        if: true,
        label: "ChangeTheKeyPair",
        type: "button",
        variant: "primary" as "primary",
        isPrimaryColor: "theme" as "theme",
        size: "md",
        onClick: ChangeTheKeyPair,
      },
      {
        if: true,
        label: "Prefill the user Field",
        type: "button",
        variant: "primary" as "primary",
        isPrimaryColor: "theme" as "theme",
        size: "md",
        onClick: toggleField,
        class: "flex",
        input: {
          class: "w-full pointer-events-none",
          type: "checkBox",
          checked: state.isPrefillTheUserField,
          displayValue: state.isPrefillTheUserField,
        },
      },
    ],
  },
].map((group) => ({
  ...group,
  buttons: group.buttons.filter((button) => button.if),
}));

function toggleModal() {
  state.toggleDebugPanel();

  state.setFeedback(
    state.isDebugPanelOpen ? "success" : "error",
    state.isDebugPanelOpen ? "Debug panel toggled successfully" : "Debug panel closed"
  );
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
async function sendNotification() {
  try {
    const notification = await fetch("/api/send-notification", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token:
          "eOx88WuzYJjughg9nsrrsD:APA91bEEmSde_OJNFfgPjX-XH8WNrucW3xifhWpAo1IJ_0jFeN1h0Mi22wQsRZII8vbfa5iuAxpj63woi-inxWkvWrVB3QtYEk6HBMhd799BAU0CYNm1FQA",
      }),
    });
    console.log(notification);
    state.setFeedback("success", "Message sent");
  } catch (error) {
    console.error("Error sending message:", JSON.stringify(error));
  }
}
async function getUserById(documentUserId: string) {
  const { $appwrite } = useNuxtApp();
  // console.log();
  const config = useRuntimeConfig();
  const databaseId = config.public.appwriteDatabaseId;
  const collectionId = config.public.appwriteCollectionId;
  const aUser = await $appwrite.databases.getDocument(databaseId, collectionId, documentUserId);
  console.log(aUser);
  // const res = await $appwrite.databases.updateDocument(databaseId, collectionId, documentUserId, {
  //   address: "address" + new Date().toISOString(),
  // });
  // console.log(aUser);
  // console.log(res);
}
async function GiveUserPermission() {
  const userId = state.user!?.$id;
  try {
    const res = await fetch("/api/update-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        documentId: userId,
        data: {},
        permissions: [Permission.read(Role.user(userId)), Permission.update(Role.user(userId)), Permission.delete(Role.user(userId))],
      }),
    });
    const data = await res.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

function ChangeTheKeyPair() {
  // useKeyPair();
}
function logTheStates() {
  console.log("Global State:", state);
  console.log("Messaging State:", useMessagingStore());
}
</script>

<style scoped>
/* Position the tail absolutely relative to the debug panel */
div[open] {
  position: relative;
}
</style>
