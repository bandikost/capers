
import "firebase/database";
import firebase from "firebase/compat/app";
import "firebase/compat/database";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref } from "firebase/storage";


const firebaseConfig = {
    apiKey: "AIzaSyBp1x8lQCSbuPwbK_sXJ7eGkGpN9c7ONY8",
    authDomain: "capers-a3171.firebaseapp.com",
    databaseURL: "https://capers-a3171-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "capers-a3171",
    storageBucket: "capers-a3171.appspot.com",
    messagingSenderId: "794243042023",
    appId: "1:794243042023:web:668504b8bdcbe9b7c63042",
    measurementId: "G-7YW48MQCSP"
  };

firebase.initializeApp(firebaseConfig);

export const auth = getAuth();
export const storage = getStorage()
export const db = getFirestore();
export default firebase;