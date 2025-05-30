import { useGlobalSettingStore } from "../store/globalSetting";

export function capitalize(str: string): string {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function cons(...rest: any) {
  const state = useGlobalSettingStore();
  console.log(state);
  state.addConsoleMessage(JSON.stringify(rest, null, 2));
  console.log(...rest);
}
