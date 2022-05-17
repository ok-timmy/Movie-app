import firebase from 'firebase/app';
// import {getAuth} from 'firebase/auth';
import 'firebase/firestore';
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

export const firebaseConfig = {
  apiKey: "AIzaSyB-EXVgXvuXHPk-Ps9jGILmfFgvLG4APFI",
  authDomain: "social-app-d0643.firebaseapp.com",
  databaseURL: "https://social-app-d0643-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "social-app-d0643",
  storageBucket: "social-app-d0643.appspot.com",
  messagingSenderId: "76213751970",
  appId: "1:76213751970:web:5d31f914a284c0206f47fb",
  measurementId: "G-SN9EYM6KWM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// if (!firebase) {
//  console.log(firebase);
// }
export const db = getFirestore(app);
// export default firebase;