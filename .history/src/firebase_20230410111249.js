
import "firebase/database";
import firebase from "firebase/compat/app";
import "firebase/compat/database";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref } from "firebase/storage";


const firebaseConfig = {
    apiKey: "AIzaSyAGuhCv6SRtGvfSBjAzRMzkubwHp_-sI5Q",
    authDomain: "forum-db93c.firebaseapp.com",
    databaseURL: "https://forum-db93c-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "forum-db93c",
    storageBucket: "forum-db93c.appspot.com",
    messagingSenderId: "19249672480",
    appId: "1:19249672480:web:95b8651fd03eddffabe745",
    measurementId: "G-YZ67H6BT9K"
  };

firebase.initializeApp(firebaseConfig);

export const auth = getAuth();
export const storage = getStorage()
export const db = getFirestore();
export default firebase;