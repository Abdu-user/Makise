// const sdk = require('node-appwrite');
import * as sdk from "node-appwrite";
import { defineNuxtConfig } from "nuxt/config";

// Init SDK
const client = new sdk.Client();

const messaging = new sdk.Messaging(client);

client
  .setEndpoint(process.env.APPWRITE_ENDPOINT!)
  .setProject(process.env.APPWRITE_PROJECT_ID!)
  .setKey(process.env.APPWRITE_SECRET_API_KEY!);

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { text } = body;
  const message = await messaging.createPush(
    "unique()", // messageId
    "[TITLE]", // title
    "[BODY]", // body
    [], // topics (optional)
    [], // users (optional)
    [], // targets (optional)
    {}, // data (optional)
    "[ACTION]" // action (optional)

    // "[ICON]", // icon (optional)
    // "[SOUND]", // sound (optional)
    // "[COLOR]", // color (optional)
    // "[TAG]", // tag (optional)
    // 1, // badge (optional)
    // false, // contentAvailable (optional)
    // // false, // critical (optional)
    // "normal", // priority (optional)
    // true, // draft (optional)
    // // "" // scheduledAt (optional)
  );
});
