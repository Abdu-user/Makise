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
    themeMode: "auto" as "light" | "dark" | "auto",
    feedback: {
      exists: false,
      state: "idle" as "idle" | "success" | "error",
      message: "",
      duration: 3000, // Default duration for feedback messages
    },
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
          themeMode: this.themeMode,
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
        this.themeMode = parsed.themeMode ?? "auto";
      }
    },

    getPreferenceData() {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      this.setDarkMode(prefersDark);
    },
    setDarkMode(isDarkMode: boolean) {
      if (isDarkMode) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    },
    loadThemeMode() {
      console.log(this.themeMode);
      if (this.themeMode === "dark") this.setDarkMode(true);
      else if (this.themeMode === "light") this.setDarkMode(false);
      else this.getPreferenceData();
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
    setThemeMode(themeMode: typeof this.themeMode) {
      this.themeMode = themeMode;
      this.saveToLocalStorage();
    },
    setFeedback(state: typeof this.feedback.state, message: string = "", duration: number = 3000) {
      this.feedback.state = state;
      this.feedback.message = message;
      this.feedback.exists = message !== "";
      this.feedback.duration = duration;
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
      this.loadThemeMode();
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
