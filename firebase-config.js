// Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-storage.js";

// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyDGeS50_vGp37ZvMmHprXZK9id1K4-hUrU",
  authDomain: "mychatapp-c57b3.firebaseapp.com",
  projectId: "mychatapp-c57b3",
  storageBucket: "mychatapp-c57b3.firebasestorage.app",
  messagingSenderId: "1048692472594",
  appId: "1:1048692472594:web:92c1360d65a890dd9551cb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);