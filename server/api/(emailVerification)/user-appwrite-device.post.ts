import { Client, Account, Messaging } from "appwrite";

const client = new Client().setEndpoint("https://[YOUR_APPWRITE_ENDPOINT]").setProject("[PROJECT_ID]").setJWT("[USER_JWT]");

const messaging = new Messaging(client);

// export default defineEventHandler(async (event) => {

// const device = await messaging.createPushTarget({
//   provider: 'fcm',
//   deviceId: '[DEVICE_ID]', // usually from FCM on the client
//   providerUid: '[FCM_TOKEN]', // FCM token from the app
// });
