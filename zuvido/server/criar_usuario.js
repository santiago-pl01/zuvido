import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"; // Import auth from firebase.js

const auth = getAuth();
createUserWithEmailAndPassword(auth, email, password) // Use auth here
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user; // Access user info
    // ...
  })
  .catch((error) => {
    const errorCode = error.code; // Handle errors
    const errorMessage = error.message;
    // ..
  });