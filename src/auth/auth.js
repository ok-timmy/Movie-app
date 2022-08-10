import firebase, { app, db } from "../../src/config/firebase.config";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { collection, doc, setDoc } from "firebase/firestore";
import { adduser, GetUserData } from "./fetchUser";
import { useRouter } from "next/router";
import  userContext from "../../Context/context"
import { useContext } from "react";

const provider = new GoogleAuthProvider();
  const auth = getAuth();
  

export function SignInWithEmail(_email, _password, router, login) {
  // const auth = getAuth();
  signInWithEmailAndPassword(auth, _email, _password)
    .then(async (userCredential) => {
      // Signed in
      const user = userCredential.user;
      const userDatabase = await GetUserData(user);
      login(user, userDatabase, user.providerId);
      router;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
    });
}

export function SignUpWithEmail(_name, _email, _password, router) {
  // const auth = getAuth();
  createUserWithEmailAndPassword(auth, _email, _password)
    .then((userCredential) => {
      // Signed in
      // const user = userCredential.user;
      console.log(userCredential);
      adduser(_name, _email); // Create a new Document for the new user to the database
      router.push("/account/sign-in");
    })
    .catch((error) => {
      console.log(error.code);
      console.log(error.message);
      // const errorCode = error.code;
      // const errorMessage = error.message;
    });
}

export async function SignedUpWithGoogle(router, login) {
  // const router = useRouter();
  // const {login} = useContext(userContext);
  
   await signInWithPopup(auth, provider)
    .then( (result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      // console.log(token);
      console.log(user);
      const userDatabase =  GetUserData(user);
      // return user;
      login(user, userDatabase, token);
      router.push("/account/profile");
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.log(errorMessage);
      // ...
    });
}
