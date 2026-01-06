// npm install firebase
// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
// ----> import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyBIMC1XtFgw8H6nrfnecjr79vFOxpKLi8Y",
  authDomain: "zuvido-96f7c.firebaseapp.com",
  projectId: "zuvido-96f7c",
  storageBucket: "zuvido-96f7c.firebasestorage.app",
  messagingSenderId: "302636661144",
  appId: "1:302636661144:web:e98139dc23350c1373d3ed",
  measurementId: "G-CM3T7NG0L6"
};

const app = initializeApp(firebaseConfig);

// Conexão com o Firestore
export const db = getFirestore(app);

// ----> const analytics = getAnalytics(app);

// npm install -g firebase-tools
// firebase login
// firebase init
// firebase deploy