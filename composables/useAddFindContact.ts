import { useGlobalSettingStore } from "~/store/globalSetting";
import type { AddContactResultsType } from "~/types/messaging";

export async function findContactFetch(searchQuery: string, addContact: boolean = false) {
  const state = useGlobalSettingStore();
  return await fetch("/api/add-contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ contactUserName: searchQuery.trim(), userId: state.user?.$id, addContact }),
  });
}
export async function findContact(searchQuery: string, addContact: boolean | undefined = undefined) {
  try {
    const res = await findContactFetch(searchQuery, addContact);
    const contact = await res.json();
    return contact as AddContactResultsType;
  } catch (error) {
    console.error(error);
  }
}
