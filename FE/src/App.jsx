import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Router from "./routes/Router";
import React, { useEffect } from "react";
import { onMessage } from "firebase/messaging";
import { messaging } from "../public/firebaseConfig"; // Firebase 설정 파일에서 가져옴

const router = createBrowserRouter(Router);
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/firebase-messaging-sw.js", { scope: "/" })
    .then((registration) => {
      console.log("Service Worker registered with scope:", registration.scope);
    })
    .catch((error) => {
      console.log("Service Worker registration failed:", error);
    });
}

function App() {
  useEffect(() => {
    const unsubscribe = onMessage(messaging, (payload) => {
      console.log("Message received. ", payload);

      if (Notification.permission === "granted") {
        new Notification(payload.data.title, {
          body: payload.data.body,
        });
      } else if (Notification.permission !== "denied") {
        Notification.requestPermission().then((permission) => {
          if (permission === "granted") {
            new Notification(payload.data.title, {
              body: payload.data.body,
            });
          }
        });
      }
    });

    return () => unsubscribe();
  }, []);

  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
