<template>
  <div class="fixed bottom-4 left-4 z-50">
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
            :variant="'primary'"
            :is-primary-color="'primary'"
            size="md"
            @click="logout"
          >
            Clear Auth
          </CustomButton>
          <CustomButton
            :variant="'primary'"
            :is-primary-color="'primary'"
            type="button"
            variety="secondary"
            size="md"
            @click="getUser"
            >GetUser</CustomButton
          >
          <CustomButton
            :variant="'primary'"
            :is-primary-color="'primary'"
            type="button"
            variety="secondary"
            size="md"
            @click="getUserById(state.user?.$id!)"
            >getUserById()</CustomButton
          >
          <CustomButton
            :is-primary-color="'theme'"
            variant="plain"
            @click="console.log(state.fromPage)"
          >
            log pinia
          </CustomButton>
          <CustomButton
            :variant="'primary'"
            :is-primary-color="'primary'"
            type="button"
            variety="secondary"
            size="md"
            @click="tryToLogin"
            >Login</CustomButton
          >
          <CustomButton
            :variant="'primary'"
            :is-primary-color="'primary'"
            type="button"
            variety="secondary"
            size="md"
            @click="sendNotification"
            >sendNotification</CustomButton
          >
          <CustomButton
            :is-primary-color="'theme'"
            type="button"
            :variant="'primary'"
            size="md"
            @click="logout"
            >Logout</CustomButton
          >
          <CustomButton
            :is-primary-color="'theme'"
            type="button"
            :variant="'primary'"
            size="md"
            @click="GiveUserPermission()"
            >GiveUserPermission</CustomButton
          >
          <CustomButton
            :is-primary-color="'theme'"
            type="button"
            :variant="'primary'"
            size="md"
            @click="deleteUser('685e72247f8b4eacaf1b')"
            >delete User</CustomButton
          >
          <CustomButton
            :is-primary-color="'theme'"
            type="button"
            :variant="'primary'"
            size="md"
            @click="console.log(useMessagingStore())"
            >messaging state</CustomButton
          >
          <CustomButton
            :is-primary-color="'theme'"
            type="button"
            :variant="'primary'"
            size="md"
            @click="ChangeTheKeyPair"
            >ChangeTheKeyPair</CustomButton
          >

          <CustomButton
            :variant="'primary'"
            :is-primary-color="'theme'"
            type="button"
            size="md"
            @click="toggleField()"
            class="flex"
            >Prefill the user Field
            <CustomInput
              class="w-full pointer-events-none"
              type="checkBox"
              :checked="state.isPrefillTheUserField"
            />
            {{ state.isPrefillTheUserField }}
          </CustomButton>
          <ThemeToggleButton />
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
import { useGlobalSettingStore } from "~/store/globalSetting";
import { useAuth } from "~/composables/useSignUp";
import { cons } from "~/utils";
import { useMessagingStore } from "~/store/messaging";
import { Permission, Role } from "appwrite";
import { debugKeyPairs } from "~/composables/useKeyPair";
const state = useGlobalSettingStore();

const { logout, current, login } = useAuth();
const getUser = async () => {
  const res = await current();
  console.log("Current user:", res);
};

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
  useKeyPair();
}
</script>

<style scoped>
/* Position the tail absolutely relative to the debug panel */
div[open] {
  position: relative;
}
</style>
