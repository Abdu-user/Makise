import { initializeApp } from "firebase/app";
import { getMessaging, onMessage, getToken } from "firebase/messaging";
import { getAnalytics } from "firebase/analytics";

// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();
  if (!config.public.firebaseApiKey) {
    console.warn("[Firebase] Missing Firebase API Key");
    return;
  }
  const firebaseConfig = {
    apiKey: config.public.firebaseApiKey as string,
    authDomain: config.public.firebaseAuthDomain as string,
    projectId: config.public.firebaseProjectId as string,
    storageBucket: config.public.firebaseStorageBucket as string,
    messagingSenderId: config.public.firebaseMessagingSenderId as string,
    appId: config.public.firebaseAppId as string,
    measurementId: config.public.firebaseMeasurementId as string,
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);

  // Initialize Firebase Cloud Messaging and get a reference to the service
  const messaging = getMessaging(app);

  // Somewhere in your app (e.g., a plugin or page)
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("/firebase-messaging-sw.js")
      .then((registration) => {
        console.log("Service Worker registered:", registration);
      })
      .catch((err) => {
        console.error("Service Worker registration failed:", err);
      });
  }

  onMessage(messaging, (payload) => {
    console.log("[App] Foreground message received:", payload);

    const p = payload.notification;
    if (!p?.body) console.error("NO title in the Firebase notification");
    if (!p?.title) console.error("No body in the Firebase notification");
    const title = p?.title;
    const body = p?.body;

    new Notification(title!, {
      body: body,
      icon: "/images/favicon.png",
      // @ts-ignore
      image: "/images/wide_angle_tetons.jpg",
      requireInteraction: true,
      // @ts-ignore
      vibrate: [200, 100, 200],
    });
  });

  return {
    provide: {
      messaging,
      onMessage,
      getToken,
    },
  };
});
