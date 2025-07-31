export async function useAccountKey(password: string) {
  const salt = await getSalt();
  if (!salt) {
    console.error("Salt is not available, cannot derive account key");
    return null;
  }
  const enc = new TextEncoder();
  const passwordKey = await crypto.subtle.importKey("raw", enc.encode(password), { name: "PBKDF2" }, false, ["deriveKey"]);

  const accountKey = await crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: salt,
      iterations: 100_000,
      hash: "SHA-256",
    },
    passwordKey,
    { name: "AES-GCM", length: 256 },
    true,
    ["encrypt", "decrypt"]
  );
  return accountKey;
}

export async function saveEncryptedPrivateKey(accountKey: CryptoKey, privateKeyPEM: string) {
  const encoder = new TextEncoder();
  const privateKeyBytes = encoder.encode(privateKeyPEM); // Exported format as string
  const iv = crypto.getRandomValues(new Uint8Array(12)); // 12-byte IV for AES-GCM

  try {
    const encryptedPrivateKeyBuffer = await crypto.subtle.encrypt(
      {
        name: "AES-GCM",
        iv,
      },
      accountKey,
      privateKeyBytes
    );

    // Browser-safe Base64 encode
    const toBase64 = (bytes: Uint8Array) => btoa(String.fromCharCode(...bytes));

    const encryptedPrivateKey = toBase64(new Uint8Array(encryptedPrivateKeyBuffer));
    const ivBase64 = toBase64(iv);

    // Store both encryptedPrivateKey and iv on the server
    const res = await useAppwriteDocumentUpdate((await useAuth().current()).$id, {
      encryptedPrivateKey,
      iv: ivBase64,
    });

    if (encryptedPrivateKey.length > 128) {
      console.error("Encrypted private key is too long, check your password or salt", encryptedPrivateKey.length);
    }
    return res;
  } catch (err) {
    console.error(err);
  }
}

export async function storeSalt() {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const saltString = btoa(String.fromCharCode(...salt)); // base64 encode manually
  await useAppwriteDocumentUpdate((await useAuth().current()).$id, {
    accountSalt: saltString,
  });
  console.log(saltString.length, "salt stored successfully", saltString, salt);
}

export async function getSalt() {
  const user = await useAuth().current();
  const userData = await useAppwriteDocumentGet(user.$id);
  if (!userData.accountSalt) {
    console.error("No salt found for the userData");
    return null;
  }
  // Decode the base64-encoded salt string and convert it to Uint8Array
  const binaryString = atob(userData.accountSalt);
  const salt = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    salt[i] = binaryString.charCodeAt(i);
  }
  console.log("Salt retrieved successfully", salt, salt.length);
  return salt;
}

export async function getDecryptedPrivateKey(password: string): Promise<string | null> {
  const salt = await getSalt();
  if (!salt) {
    console.error("No salt found");
    return null;
  }

  // Step 1: Derive the accountKey again from password
  const enc = new TextEncoder();
  const passwordKey = await crypto.subtle.importKey("raw", enc.encode(password), { name: "PBKDF2" }, false, ["deriveKey"]);
  const accountKey = await crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt,
      iterations: 100_000,
      hash: "SHA-256",
    },
    passwordKey,
    { name: "AES-GCM", length: 256 },
    false,
    ["decrypt"]
  );

  // Step 2: Fetch encryptedPrivateKey and iv from the server
  const user = await useAuth().current();
  const userData = await useAppwriteDocumentGet(user.$id);
  const encryptedBase64 = userData.encryptedPrivateKey;
  const ivBase64 = userData.iv;
  if (!encryptedBase64 || !ivBase64) {
    console.error("Encrypted private key or IV is missing", encryptedBase64, ivBase64);
    return null;
  }

  const encryptedBytes = Uint8Array.from(atob(encryptedBase64), (c) => c.charCodeAt(0));
  const iv = Uint8Array.from(atob(ivBase64), (c) => c.charCodeAt(0));

  // Step 3: Decrypt the private key
  try {
    const decrypted = await crypto.subtle.decrypt(
      {
        name: "AES-GCM",
        iv,
      },
      accountKey,
      encryptedBytes.buffer
    );

    const decoder = new TextDecoder();
    return decoder.decode(decrypted);
  } catch (err) {
    console.error("Failed to decrypt private key:", err);
    return null;
  }
}
