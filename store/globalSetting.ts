import type { Models } from "appwrite";
import { defineStore } from "pinia";
import type { UserProfileType } from "~/types/type";

const STORAGE_KEY = "globalSetting";

export const useGlobalSettingStore = defineStore("globalSetting", {
  state: () => ({
    isDebugPanelOpen: false, // Default only
    isNavOpen: false,
    isEditingProfile: false,
    isPrefillTheUserField: false,
    disabledExpensiveUrlFetch: false,
    isScrollLinksExist: false,
    loading: false,
    isLoginButtonDropdownOpen: false,
    consoleMessages: [] as string[],
    user: null as Models.User<Models.Preferences> | null,
    userData: null as UserProfileType | null,
    error: "",
    resetFunctions: [] as (() => void)[],
    fromPage: "",
    routeName: "",
  }),
  actions: {
    toggleIsNavOpen(isNavOpen: boolean | undefined = undefined) {
      if (isNavOpen !== undefined) {
        this.isNavOpen = isNavOpen;
      } else {
        this.isNavOpen = !this.isNavOpen;
      }
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
      this.isPrefillTheUserField = !this.isPrefillTheUserField;
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
          isPrefillTheUserField: this.isPrefillTheUserField,
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
        this.isPrefillTheUserField = parsed.isPrefillTheUserField ?? false;
      }
    },

    async getPreferenceData() {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

      if (prefersDark) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
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
      console.warn("setFromPage could be replaced with direct state assignment: store.fromPage = ...");
      this.fromPage = fromPage;
    },
    setResetFunctions(cb: () => void) {
      this.resetFunctions.push(cb);
    },
    setRouteName(routeName: string) {
      console.warn("setRouteName could be replaced with direct state assignment: store.routeName = ...");
      this.routeName = routeName;
    },
    setIsScrollLinksExist(bool: boolean) {
      console.warn("setIsScrollLinksExist could be replaced with direct state assignment: store.isScrollLinksExist = ...");
      this.isScrollLinksExist = bool;
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
