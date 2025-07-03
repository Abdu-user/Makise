import { useGlobalSettingStore } from "~/store/globalSetting";

export function inDevelopment() {
  const state = useGlobalSettingStore();
  state.setFeedback("error", "This feature is in development", 3000);
}
