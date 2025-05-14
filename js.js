
//   // Import the functions you need from the SDKs you need
//   import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
//   // TODO: Add SDKs for Firebase products that you want to use
//   // https://firebase.google.com/docs/web/setup#available-libraries

//   // Your web app's Firebase configuration
//   const firebaseConfig = {
//     apiKey: "AIzaSyAxjamr6VLtp5qKz7LkcQYhTPiX25KjgDQ",
//     authDomain: "login-page-27d1d.firebaseapp.com",
//     projectId: "login-page-27d1d",
//     storageBucket: "login-page-27d1d.firebasestorage.app",
//     messagingSenderId: "1057257887833",
//     appId: "1:1057257887833:web:016a6ac9f20713807cf948"
//   };

//   // Initialize Firebase
//   const app = initializeApp(firebaseConfig);
// Import necessary Firebase modules
// import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
// import { getAuth, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";

// // Your Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyAxjamr6VLtp5qKz7LkcQYhTPiX25KjgDQ",
//   authDomain: "login-page-27d1d.firebaseapp.com",
//   projectId: "login-page-27d1d",
//   storageBucket: "login-page-27d1d.firebasestorage.app",
//   messagingSenderId: "1057257887833",
//   appId: "1:1057257887833:web:016a6ac9f20713807cf948"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// // Get the authentication instance
// const auth = getAuth(app);

// // Function for email/password signup
// const signUpWithEmail = async () => {
//   const email = document.querySelector('input[placeholder="Email"]').value;
//   const password = document.querySelector('input[placeholder="Password"]').value;
//   const confirmPassword = document.querySelector('input[placeholder="Confirm-Password"]').value;

//   if (password !== confirmPassword) {
//     alert("Passwords do not match!");
//     return;
//   }

//   try {
//     const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//     const user = userCredential.user;
//     console.log('User signed up:', user);
//     alert('Signup successful!');
//   } catch (error) {
//     console.error('Error during signup:', error);
//     alert(error.message);
//   }
// };

// // Event listener for the Sign-Up button
// document.querySelector('.login_main button').addEventListener('click', signUpWithEmail);

// // Google Sign-Up function
// const signUpWithGoogle = async () => {
//   const provider = new GoogleAuthProvider();

//   try {
//     const result = await signInWithPopup(auth, provider);
//     const user = result.user;
//     console.log('Google user signed up:', user);
//     alert('Signup with Google successful!');
//   } catch (error) {
//     console.error('Error during Google signup:', error);
//     alert(error.message);
//   }
// };

// // Event listener for the Google Sign-Up button
// document.querySelector('.web_login button').addEventListener('click', signUpWithGoogle);
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAxjamr6VLtp5qKz7LkcQYhTPiX25KjgDQ",
  authDomain: "login-page-27d1d.firebaseapp.com",
  projectId: "login-page-27d1d",
  storageBucket: "login-page-27d1d.firebasestorage.app",
  messagingSenderId: "1057257887833",
  appId: "1:1057257887833:web:016a6ac9f20713807cf948"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// **Function for Email/Password Signup**
const signUpWithEmail = async (event) => {
  event.preventDefault(); // Prevent form from refreshing page

  const email = document.querySelector('input[placeholder="Email"]').value;
  const password = document.querySelector('input[placeholder="Password"]').value;
  const confirmPassword = document.querySelector('input[placeholder="Confirm-Password"]').value;

  if (password !== confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log('User signed up:', userCredential.user);
    alert('Signup successful! Redirecting to login page...');
    
    // **Ensure redirection happens after a delay**
    setTimeout(() => {
      window.location.href = "login.html";
    }, 1500); // Delay to ensure alert is seen
  } catch (error) {
    console.error('Error during signup:', error);
    alert(error.message);
  }
};

// **Function for Google Signup**
const signUpWithGoogle = async () => {
  const provider = new GoogleAuthProvider();

  try {
    const result = await signInWithPopup(auth, provider);
    console.log('Google user signed up:', result.user);
    alert('Signup with Google successful! Redirecting to login page...');

    // **Ensure redirection happens after a delay**
    setTimeout(() => {
      window.location.href = "login.html";
    }, 1500);
  } catch (error) {
    console.error('Error during Google signup:', error);
    alert(error.message);
  }
};

// **Ensure Event Listeners Are Attached Correctly**
document.addEventListener("DOMContentLoaded", () => {
  const signUpButton = document.querySelector('.login_main button');
  const googleSignUpButton = document.querySelector('.web_login button');

  if (signUpButton) {
    signUpButton.addEventListener('click', signUpWithEmail);
  } else {
    console.error("Signup button not found!");
  }

  if (googleSignUpButton) {
    googleSignUpButton.addEventListener('click', signUpWithGoogle);
  } else {
    console.error("Google signup button not found!");
  }
});
