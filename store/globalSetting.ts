import type { Models } from "appwrite";
import { defineStore } from "pinia";
import type { UserProfileType } from "~/types/type";

const STORAGE_KEY = "globalSetting";

export const useGlobalSettingStore = defineStore("globalSetting", {
  state: () => ({
    isDebugPanelOpen: false, // Default only
    isNavOpen: false,
    isEditingProfile: false,
    isPrefilltheUserField: false,
    consoleMessages: [] as string[],
    user: null as Models.User<Models.Preferences> | null,
    userData: null as UserProfileType | null,
    loading: false,
    error: "",
    resetFunctions: [] as (() => void)[],
    fromPage: "",
    route: "",
  }),
  actions: {
    toggleIsNavOpen() {
      this.isNavOpen = !this.isNavOpen;
      this.saveToLocalStorage();
    },
    toggleIsEditingProfile() {
      this.isEditingProfile = !this.isEditingProfile;
      this.saveToLocalStorage();
    },
    toggleDebugPanel() {
      this.isDebugPanelOpen = !this.isDebugPanelOpen;
      this.saveToLocalStorage();
    },
    toggleIsPrefillUserField() {
      this.isPrefilltheUserField = !this.isPrefilltheUserField;
      this.saveToLocalStorage();
    },
    addConsoleMessage(message: string) {
      this.consoleMessages.unshift(message);
    },

    saveToLocalStorage() {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          isDebugPanelOpen: this.isDebugPanelOpen,
          isNavOpen: this.isNavOpen,
          isEditingProfile: this.isEditingProfile,
          isPrefilltheUserField: this.isPrefilltheUserField,
        })
      );
    },
    loadSettings() {
      const data = localStorage.getItem(STORAGE_KEY);
      if (data) {
        const parsed = JSON.parse(data);
        this.isDebugPanelOpen = parsed.isDebugPanelOpen ?? false;
        this.isNavOpen = parsed.isNavOpen ?? false;
        this.isEditingProfile = parsed.isEditingProfile ?? false;
        this.isPrefilltheUserField = parsed.isPrefilltheUserField ?? false;
      }
    },
    _loading(loading: boolean) {
      this.loading = loading;
    },
    _error(error: string) {
      this.error = error;
    },
    setUser(user: Models.User<Models.Preferences> | null) {
      this.user = user;
    },
    setUserData(userData: UserProfileType | null) {
      this.userData = userData;
    },
    setFromPage(fromPage: string) {
      this.fromPage = fromPage;
    },
    setResetFunctions(cb: () => void) {
      this.resetFunctions.push(cb);
    },
    removeSingleResetFunction(cb: () => void) {
      this.resetFunctions = this.resetFunctions.filter((oldCb) => oldCb !== cb);
    },
    clearUser() {
      this.user = null;
      this.userData = null;
    },
    clearConsoleMessages() {
      this.consoleMessages = [];
    },
    clearError() {
      this.error = "";
    },
    clearLoading() {
      this.loading = false;
    },
    async initialize() {
      this.loadSettings();
      // Additional initialization logic can be added here
    },
    callResetFunctions() {
      for (let i = 0; i < this.resetFunctions.length; i++) {
        const cb = this.resetFunctions[i];
        cb();
      }
    },
    async reset() {
      this.isDebugPanelOpen = false;
      this.isNavOpen = false;
      this.consoleMessages = [];
      this.user = null;
      this.userData = null;
      this.loading = false;
      this.error = "";
      this.saveToLocalStorage();
    },
  },
});
