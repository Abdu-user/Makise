import sodium from "libsodium-wrappers";
import type { ContactType } from "~/types/messaging";
import { saveEncryptedPrivateKey, useAccountKey } from "./encryption/useAccountKey";
export default async function useKeyPair(password: string) {
  const { generateKeyPair } = useEncryption();
  const keyPair = generateKeyPair();
  const { $appwrite } = useNuxtApp();
  const publicKey: number[] = [];
  keyPair.publicKey.forEach((k) => {
    publicKey.push(Number(k));
  });

  const base64PublicKey = sodium.to_base64(keyPair.publicKey);
  const base64PrivateKey = sodium.to_base64(keyPair.privateKey);

  try {
    await useAppwriteDocumentUpdate((await $appwrite.account.get()).$id, {
      publicKey: base64PublicKey,
    });
    const accountKey = await useAccountKey(password);
    if (accountKey) {
      await saveEncryptedPrivateKey(accountKey, base64PrivateKey);
    } else {
      console.error("Failed to get account key for encryption", accountKey, password, base64PrivateKey);
    }
  } catch (err) {
    console.error(err);
  }
}
export async function encryptMessageText(contact: ContactType, text: string) {
  const { encryptMessage } = useEncryption();

  //^ 1. Get recipient's public key (from Appwrite `users` collection)
  if (!contact.publicKey) {
    console.error(`This ${contact.id} doesn't have a public key`);
    return text;
  }
  const recipientPublicKey = sodium.from_base64(contact.publicKey); //^ Uint8Array

  //^ 2. Get your private key from localStorage
  const myPrivateKey = getPrivateKey();
  if (!myPrivateKey) {
    console.warn("Private key is not found in localStorage, returning raw text");
    return text;
  }
  //^ 3. Encrypt
  const encrypted = encryptMessage(text || "hello world", myPrivateKey, recipientPublicKey);

  //^ 4. Send encrypted.cipher and encrypted.nonce in message payload
  const encryptedCipher = JSON.stringify({
    cipher: encrypted.cipher,
    nonce: encrypted.nonce,
  });
  const decryptedMessage = decryptMessageText(encryptedCipher, contact.publicKey);
  console.log(decryptedMessage);

  return encryptedCipher;
}
export function decryptMessageText(text: string, contactPublicKey: string) {
  let message;
  try {
    message = JSON.parse(text);
  } catch (err) {
    // ❌ Not valid JSON, return as-is
    return text;
  }

  if (!message.cipher || !message.nonce) {
    // ❌ Not an encrypted message, return raw text
    return text;
  }
  if (!contactPublicKey) {
    console.error("ContactPublicKey is undefined");
    return text;
  }
  const { decryptMessage } = useEncryption();

  // On receiving a message:
  const encrypted = {
    cipher: message.cipher,
    nonce: message.nonce,
  };

  // ^ 1. Get sender's public key from Appwrite user profile
  const senderPublicKey = sodium.from_base64(contactPublicKey);

  // ^ 2. Get your private key
  const myPrivateKey = getPrivateKey();
  if (!myPrivateKey) {
    console.warn("Private key is not found in localStorage, returning raw text");
    return text;
  }

  // ^ 3. Decrypt
  const plainText = decryptMessage(encrypted, myPrivateKey, senderPublicKey);
  // ^ console.log(myPrivateKey, senderPublicKey, plainText);

  return plainText;
}
export async function debugKeyPairs(contactPublicKey: string, myPublicKey: string) {
  await sodium.ready;

  const senderPublicKey = sodium.from_base64(contactPublicKey);
  const receiverPublicKey = sodium.from_base64(myPublicKey);
  console.log(senderPublicKey, contactPublicKey, receiverPublicKey, myPublicKey);
}

export function getPrivateKey() {
  const savedPrivateKey = localStorage.getItem("privateKey");
  if (savedPrivateKey) {
    return sodium.from_base64(savedPrivateKey);
  } else {
    console.error("Private key not found in localStorage");
    return null;
  }
}
export function savePrivateKey(decryptedPrivateKey: string | null) {
  if (decryptedPrivateKey) {
    localStorage.setItem("privateKey", decryptedPrivateKey);
  } else {
    throw new Error("Decrypted private key is falsy: " + decryptedPrivateKey);
  }
}
