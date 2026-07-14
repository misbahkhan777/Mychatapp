// Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-storage.js";

// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyAUPNoiAxJLmY6mHkM8xqppzQq8hKqadU0",
  authDomain: "my-chat-60512.firebaseapp.com",
  projectId: "my-chat-60512",
  storageBucket: "my-chat-60512.firebasestorage.app",
  messagingSenderId: "369751926711",
  appId: "1:369751926711:web:3c7b313bba54e78e7b6a32"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);