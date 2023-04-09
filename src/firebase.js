// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import { getFirestore } from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBKpXFGWZxQIYn0PCW413XNrjsUcMLM9b4",
  authDomain: "react-chat-69c9d.firebaseapp.com",
  projectId: "react-chat-69c9d",
  storageBucket: "react-chat-69c9d.appspot.com",
  messagingSenderId: "331186782768",
  appId: "1:331186782768:web:b73fd5a37aee64ee5ea3f5",
  measurementId: "G-R1EKG0LCVT"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const analytics = getAnalytics(app);
export const storage = getStorage();
export const db = getFirestore();
