import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

export const firebaseConfig = {
  apiKey: "AIzaSyDR0yoHfRMVgy__QD0PHbFqi65eDH5ZXq4",
  authDomain: "habit-tracker-mobile-4fade.firebaseapp.com",
  projectId: "habit-tracker-mobile-4fade",
  storageBucket: "habit-tracker-mobile-4fade.appspot.com",
  messagingSenderId: "132172467389",
  appId: "1:132172467389:web:5f4c4aa453cdb5f0a13bd4",
  measurementId: "G-4QGQ17926L",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
