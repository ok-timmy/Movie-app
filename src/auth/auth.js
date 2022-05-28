import firebase, { app, db } from "../../src/config/firebase.config";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { collection, doc, setDoc } from "firebase/firestore";
import { GetUserData } from "./fetchUser";

const adduser = async (n, e, img) => {
  await setDoc(doc(collection, "users", e), {
    name: n,
    email: e,
    profilePicture: img || "",
    favouritesMovies: [],
  });
};

export function SignInWithEmail(_email, _password, router) {
  const auth = getAuth();
  signInWithEmailAndPassword(auth, _email, _password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      GetUserData(user.email);
      login(user, user.providerId )
      router.fallback();
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
    });
}

export function SignUpWithEmail(_name, _email, _password, router) {
  const auth = getAuth();
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

export function SignedUpWithGoogle(router, login) {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();

  signInWithPopup(auth, provider)
    .then((result) => {
      // console.log(auth);
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      // console.log(token);
      console.log(user);
      GetUserData(user.email, adduser(user.displayName, user.email, user.photoURL));
      login(user, token);

      router.fallback();
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
