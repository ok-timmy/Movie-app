import firebase from 'firebase/app';
// import {getAuth} from 'firebase/auth';
import 'firebase/firestore';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
if (!firebase) {
 initializeApp(firebaseConfig);
//  const auth = getAuth(app);
 console.log(firebase);
}

export default firebase;