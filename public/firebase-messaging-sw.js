importScripts("https://www.gstatic.com/firebasejs/11.10.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/11.10.0/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyAtuwE7fs1x65tn_Eki9gUXsbwNki7wDJw",
  authDomain: "makise517.netlify.app",
  projectId: "makise-517",
  storageBucket: "makise-517.firebasestorage.app",
  messagingSenderId: "1086287345427",
  appId: "1:1086287345427:web:596cd41f3e092812784ce6",
  measurementId: "G-NY41HBH002",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log("[firebase-messaging-sw.js] Received background message ", payload);
  const { title, body } = payload.notification;
  self.registration.showNotification(title, {
    body: body,
    icon: "/images/favicon.png",
    image: "/images/wide_angle_tetons.jpg",
    requireInteraction: true,
    vibrate: [200, 100, 200],
  });
});

// importScripts("https://www.gstatic.com/firebasejs/11.10.0/firebase-app-compat.js");
// importScripts("https://www.gstatic.com/firebasejs/11.10.0/firebase-messaging-compat.js");

// firebase.initializeApp({
//   apiKey: "AIzaSyAtuwE7fs1x65tn_Eki9gUXsbwNki7wDJw",
//   authDomain: "makise517.netlify.app",
//   projectId: "makise-517",
//   storageBucket: "makise-517.firebasestorage.app",
//   messagingSenderId: "1086287345427",
//   appId: "1:1086287345427:web:596cd41f3e092812784ce6",
//   measurementId: "G-NY41HBH002",
// });

// const messaging = firebase.messaging();

// console.log("notification start");
// self.registration.showNotification("Test", {
//   body: "This is a test notification.",
//   icon: "/images/favicon.png",
//   requireInteraction: true,
// });
// // (Optional) Fallback for push event (e.g., if using Web Push directly)
// self.addEventListener("push", function (event) {
//   const data = event.data ? event.data.json() : {};
//   const title = data.title || "Fallback Notification";
//   const options = { body: data.body || "This is a fallback notification." };
//   event.waitUntil(self.registration.showNotification(title, options));
// });
// // Handle manual 'message' from the page to show a test notification
// self.addEventListener("message", function (event) {
//   if (event.data && event.data.action === "TEST_NOTIFICATION") {
//     const { title, body } = event.data;
//     event.waitUntil(self.registration.showNotification(title, { body: body }));
//   }
// });

// // Optional: handle notification click (focus or open window)
// self.addEventListener("notificationclick", function (event) {
//   event.notification.close();
//   event.waitUntil(
//     clients.matchAll({ type: "window" }).then((clientList) => {
//       if (clientList.length > 0) {
//         return clientList[0].focus();
//       }
//       return clients.openWindow("/");
//     })
//   );
// });
// self.addEventListener("message", function (event) {
//   console.log("SW received message:", event.data); // ← add this
//   if (event.data && event.data.action === "TEST_NOTIFICATION") {
//     const { title, body } = event.data;
//     event.waitUntil(self.registration.showNotification(title, { body: body }));
//   }
// });

// console.log("notification end");
// // Handle background messages
// messaging.onBackgroundMessage((payload) => {
//   console.log("[firebase-messaging-sw.js] Received background message:", payload);
//   // Customize and show notification
//   const notificationTitle = payload.notification?.title || "Background Message Title";
//   const notificationOptions = {
//     body: payload.notification?.body || "Background Message body.",
//     icon: payload.notification?.icon || "/firebase-logo.png",
//   };
//   self.registration.showNotification(notificationTitle, notificationOptions);
// });
