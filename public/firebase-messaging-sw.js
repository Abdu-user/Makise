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

for (let i = 0; i < 10; i++) {
  console.log("check2");
}

const messaging = firebase.messaging();

// ✅ Simple in-memory cache (reset if SW is reloaded)
const messageCache = {};

messaging.onBackgroundMessage(async function (payload) {
  console.log("[firebase-messaging-sw.js] Received background message", payload);

  if (payload?.date?.type === "pushNotification") {
    const { title, body, link, time, senderUsername } = payload.data || {};
    // Check for missing fields
    const missing = [];
    if (!title) missing.push("title");
    if (!body) missing.push("body");
    if (!link) missing.push("link");
    if (!time) missing.push("time");
    if (!senderUsername) missing.push("senderUsername");
    if (missing.length > 0) {
      console.error("Missing required notification fields:", missing.join(", "), payload);
      return;
    }
    const tag = `sender-${senderUsername}`;

    // Store message in cache
    if (!messageCache[tag]) messageCache[tag] = [];
    messageCache[tag].push({ body, time });

    // Keep only last 10 messages
    const messages = messageCache[tag].slice(-10);

    // Compose the notification body with timestamps
    const bodyText = messages.map((msg) => `${msg.body}`).join("\n");

    // Remove any previous notification for this tag
    const existing = await self.registration.getNotifications({ tag });
    existing.forEach((n) => n.close());

    // Show the new grouped notification
    self.registration.showNotification(`${title} • ${formatTime(time)}`, {
      body: bodyText,
      icon: "/images/favicon.png",
      tag,
      renotify: true,
      requireInteraction: true,
      // color:'#f4eff8',
      vibrate: [200, 100, 200],
      data: {
        url: link,
        tag,
      },
    });
  }
});

// ✅ Format ISO time into hh:mm
function formatTime(isoTime) {
  try {
    // Fix invalid formats like: 2025-07-06T10:34:22.123Z+05:00
    let fixed = isoTime.replace(/Z[+-]\d{2}:\d{2}$/, "Z");

    const date = new Date(fixed);
    if (isNaN(date)) return "??:??";

    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  } catch (err) {
    return "??:??";
  }
}

// ✅ Open client tab when notification is clicked
self.addEventListener("notificationclick", function (event) {
  event.notification.close();

  let targetUrl = event.notification.data?.url;
  if (!targetUrl) {
    console.error("Not url a event.notification.data?.url", event);
    targetUrl = "https://makise517.netlify.app/contacts";
  }
  let messageTag = event?.notification?.data?.tag;
  if (!messageTag) {
    console.error("Not url a event.notification.data?.tag", event);
  } else {
    delete messageCache[messageTag];
  }

  console.log("Updated with the client.postMessage");
  console.log(targetUrl, event);

  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if (client.url === targetUrl && "focus" in client) {
          client.postMessage({ type: "MESSAGE_UPDATE" });
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(targetUrl);
      }
    })
  );
});
