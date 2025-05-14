import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";

// ✅ Correct Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAxjamr6VLtp5qKz7LkcQYhTPiX25KjgDQ",
  authDomain: "login-page-27d1d.firebaseapp.com",
  projectId: "login-page-27d1d",
  storageBucket: "login-page-27d1d.appspot.com", // ✅ Corrected bucket name
  messagingSenderId: "1057257887833",
  appId: "1:1057257887833:web:016a6ac9f20713807cf948"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Email/Password Sign Up
const signUpWithEmail = async (event) => {
  event.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const confirmPassword = document.getElementById("confirmPassword").value.trim();

  if (password !== confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log("User signed up:", userCredential.user);
    alert("Signup successful! Redirecting...");
    setTimeout(() => window.location.href = "login.html", 1500);
  } catch (error) {
    console.error("Signup error:", error);
    alert(error.message);
  }
};

// Google Sign Up
const signUpWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    console.log("Google signup:", result.user);
    alert("Signup with Google successful!");
    setTimeout(() => window.location.href = "project.html", 1500);
  } catch (error) {
    console.error("Google signup error:", error);
    alert(error.message);
  }
};

// Attach event listeners
document.addEventListener("DOMContentLoaded", () => {
  const signUpButton = document.getElementById("signUpBtn");
  const googleButton = document.getElementById("googleSignUpBtn");

  if (signUpButton) signUpButton.addEventListener("click", signUpWithEmail);
  if (googleButton) googleButton.addEventListener("click", signUpWithGoogle);
});
