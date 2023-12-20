// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDYU-1LEO9bi3w0WBY1erXHOao9V0-CwZY",
  authDomain: "database-de-prueba.firebaseapp.com",
  projectId: "database-de-prueba",
  storageBucket: "database-de-prueba.appspot.com",
  messagingSenderId: "572957435210",
  appId: "1:572957435210:web:460dc001dc47bf9a840db3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)
export const db = getFirestore(app)