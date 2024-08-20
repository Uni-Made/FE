import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyCrJzmO13sikWXDYPIIskaDSIZzMx0wy_Y",
  authDomain: "uni-made.firebaseapp.com",
  projectId: "uni-made",
  storageBucket: "uni-made.appspot.com",
  messagingSenderId: "634204091482",
  appId: "1:634204091482:web:8b601ba6a88aac23245463",
  measurementId: "G-FERJJZW73B",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const messaging = getMessaging(app);

export { app, analytics, messaging, getToken, onMessage };