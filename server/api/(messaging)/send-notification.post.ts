// ~ Send Notification via firebase
// import admin from "firebase-admin";
// import serviceAccount from "~/makise-517-firebase-adminsdk-fbsvc-c05bc142d2.json" assert { type: "json" };

// admin.initializeApp({
//   // @ts-ignore
//   credential: admin.credential.cert(serviceAccount),
// });
// export default defineEventHandler(async (event) => {
//   const body = await readBody(event);
//   const registrationToken = body.token;

//   const message = {
//     data: {
//       title: "New Message!",
//       body: "You have a newddd notification from Firebase.",
//     },

//     token: registrationToken,
//   };

//   admin
//     .messaging()
//     .send(message)
//     .then((response) => {
//       console.log("Successfully sent message:", response);
//     })
//     .catch((error) => {
//       console.error("Error sending message:", error);
//     });
// });
