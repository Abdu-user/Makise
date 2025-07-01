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
export function generateRandomUsername(): string {
  const adjectives = ["Swift", "Silent", "Brave", "Clever", "Lucky", "Mighty", "Happy", "Calm"];
  const animals = ["Lion", "Tiger", "Wolf", "Eagle", "Shark", "Bear", "Fox", "Hawk"];
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const animal = animals[Math.floor(Math.random() * animals.length)];
  const number = Math.floor(1000 + Math.random() * 9000);
  return `${adjective}${animal}${number}`;
}
