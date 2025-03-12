function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

// Function to register service worker and subscribe
const sendPushSubscription = async () => {
  try {
    // Register service worker
    const register = await navigator.serviceWorker.register(
      "/service-worker.js"
    );
    console.log("Service Worker registered");

    // Subscribe to push notifications
    const subscription = await register.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(
        "BCzQma9y5I-oufjbs4ZKiqNhQeuSbp6OCSuvBHliaW3UE0RFmW0PFIVzA1yQUXMnOoXTrKbWfNVde_ZQoJg7rO0"
      ),
    });

    localStorage.setItem(
      "pushNotifuSubscription",
      JSON.stringify(subscription)
    );
    console.log("Push subscription:", subscription);

    // Send subscription to your backend (make sure your backend is ready to receive it)
    const response = await fetch("http://localhost:8080/sendTokenForWebPush/", {
      method: "POST",
      body: JSON.stringify(subscription),
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("Subscription sent to backend:", response);
  } catch (error) {
    console.error("Error in push subscription:", error);
  }
};

// Function to request notification permission
const requestNotificationPermission = async () => {
  try {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      console.log("Notification permission granted!");
      sendPushSubscription(); // Only send push subscription after permission is granted
    } else {
      console.log("Notification permission denied");
    }
  } catch (error) {
    console.error("Notification permission error:", error);
  }
};

export {
  sendPushSubscription,
  urlBase64ToUint8Array,
  requestNotificationPermission,
};
