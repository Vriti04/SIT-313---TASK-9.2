// Import the functions you need from the SDKs you need
import {initializeApp } from "firebase/app";
import {getFirestore } from "@firebase/firestore"
import {getStorage} from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAFpEocCYEVh50CCKg0T_fFmcAxX0rJdNw",
  authDomain: "task-7d.firebaseapp.com",
  projectId: "task-7d",
  storageBucket: "task-7d.appspot.com",
  messagingSenderId: "658822370602",
  appId: "1:658822370602:web:4d03ddd78fcf03df1e7a53",
  measurementId: "G-L0KSD6DXT2"
};

// Initialize Firebase
const app =initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage= getStorage(app);
                                  