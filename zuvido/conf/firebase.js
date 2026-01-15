// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBIMC1XtFgw8H6nrfnecjr79vFOxpKLi8Y",
  authDomain: "zuvido-96f7c.firebaseapp.com",
  projectId: "zuvido-96f7c",
  storageBucket: "zuvido-96f7c.firebasestorage.app",
  messagingSenderId: "302636661144",
  appId: "1:302636661144:web:e98139dc23350c1373d3ed",
  measurementId: "G-CM3T7NG0L6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);