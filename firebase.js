// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import {getStorage } from 'firebase/storage'  ;   


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBbnFw1EOlj07wITlTwQ93yiM-SgWaYMuM",
  authDomain: "instagram-clone-24f3f.firebaseapp.com",
  projectId: "instagram-clone-24f3f",
  storageBucket: "instagram-clone-24f3f.appspot.com",
  messagingSenderId: "787372413112",
  appId: "1:787372413112:web:4af928dc9cd5de3999a44d"
};


// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
// initialize firestore db
const db = getFirestore();  
const storage = getStorage() ; 


export {app , db , storage} ; 

// if not initalize app before will initialize new app , otherwise using the current app that already initialized.
 