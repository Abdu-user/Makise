import type { MessageType } from "~/types/type";

export async function getMessageById(contactUsername: string, messageId: string) {
  try {
    const res = await fetch(`/api/get-messages?contactUsername=${contactUsername}&messageLimit=50&messageId=${messageId}`, {
      cache: "reload",
    });

    const message = await res.json();
    return message as MessageType;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
