import type { MessageType } from "~/types/type";

export async function getMessageById(contactUsername: string, messageId: string) {
  try {
    const res = await fetch(`/api/get-messages?contactUsername=${contactUsername}&messageLimit=50&messageId=${messageId}`, {
      cache: "reload",
    });

    const message = await res.json();
    return message as MessageType;

    // console.log("Single message:", messageId, fetchedMessage);
    // You can return it or update state as needed
  } catch (error) {
    console.error(error);
    throw error;
  }
}
