// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAp2-KiGHPijddU35PKQIQxd4MkUNcUsjw",
  authDomain: "netflix-clone-app-f5d30.firebaseapp.com",
  projectId: "netflix-clone-app-f5d30",
  storageBucket: "netflix-clone-app-f5d30.appspot.com",
  messagingSenderId: "101981932617",
  appId: "1:101981932617:web:08001e95918d9f4fc08398",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const auth = getAuth();

export default app;
export { auth, db };
