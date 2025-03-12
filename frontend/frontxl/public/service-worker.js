console.log("Service Worker Loaded...");

self.addEventListener("push", (e) => {
  const data = e.data.json();
  console.log("Push received...", data);
  const message =
    data.message || "You have a new message. Please check it out!";

  self.registration.showNotification("New Notification", {
    body: message,
    icon: "http://image.ibb.co/frYOFd/tmlogo.png",
    badge: "http://image.ibb.co/frYOFd/tmlogo.png",
  });
});
