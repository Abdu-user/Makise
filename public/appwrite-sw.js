self.addEventListener("push", function (event) {
  const data = event.data?.json() || {};

  const title = data.notification?.title || "New Notification";
  const options = {
    body: data.notification?.body || "",
    icon: "/icon.png",
    data: data.data || {},
  };

  event.waitUntil(self.registration.showNotification(title, options));
});
