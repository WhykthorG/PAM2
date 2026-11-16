// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBclInxbT_Lb9bN8UmVqWAK1nbgcYfLnIg",
  authDomain: "teste-4c408.firebaseapp.com",
  projectId: "teste-4c408",
  storageBucket: "teste-4c408.firebasestorage.app",
  messagingSenderId: "884410317559",
  appId: "1:884410317559:web:02cd3a768f7454021d71f2",
  measurementId: "G-JWKKFGS443"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase services used across the app
export const auth = getAuth(app);
export const db = getFirestore(app);