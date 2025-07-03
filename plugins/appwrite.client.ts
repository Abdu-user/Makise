// plugins/appwrite.client.ts
import { Client, Account, Databases, Storage, Messaging } from "appwrite";

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();

  const endpoint = config.public.appwriteEndpoint;
  const projectId = config.public.appwriteProjectId;

  if (!endpoint || !projectId) {
    console.warn("[Appwrite] Missing endpoint or project ID");
    return;
  }

  const client = new Client().setEndpoint(endpoint).setProject(projectId);

  const account = new Account(client);
  const databases = new Databases(client);
  const storage = new Storage(client);
  const messaging = new Messaging(client);
  // const users = new Users(client);

  return {
    provide: {
      appwrite: {
        client,
        account,
        databases,
        storage,
        messaging,
      },
    },
  };
});
