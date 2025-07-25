import sodium from "libsodium-wrappers";

export function useEncryption() {
  const generateKeyPair = () => {
    return sodium.crypto_box_keypair();
  };

  const encryptMessage = (message: string, senderPrivateKey: Uint8Array, recipientPublicKey: Uint8Array) => {
    const nonce = sodium.randombytes_buf(sodium.crypto_box_NONCEBYTES);
    const cipher = sodium.crypto_box_easy(message, nonce, recipientPublicKey, senderPrivateKey);

    return {
      cipher: sodium.to_base64(cipher),
      nonce: sodium.to_base64(nonce),
    };
  };

  const decryptMessage = (encrypted: { cipher: string; nonce: string }, recipientPrivateKey: Uint8Array, senderPublicKey: Uint8Array) => {
    try {
      const cipherBytes = sodium.from_base64(encrypted.cipher);
      const nonceBytes = sodium.from_base64(encrypted.nonce);

      const decrypted = sodium.crypto_box_open_easy(cipherBytes, nonceBytes, senderPublicKey, recipientPrivateKey);

      return sodium.to_string(decrypted);
    } catch (error) {
      return JSON.stringify(encrypted);
    }
  };

  return {
    generateKeyPair,
    encryptMessage,
    decryptMessage,
  };
}
