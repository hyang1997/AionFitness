export const environment = {};
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDGsewAL6eOJiLIaRXRNaY3dAYwFxcKK1Q",
  authDomain: "aionfitness.firebaseapp.com",
  projectId: "aionfitness",
  storageBucket: "aionfitness.appspot.com",
  messagingSenderId: "10091355590",
  appId: "1:10091355590:web:a5fbb94bf9727764bde6c7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);