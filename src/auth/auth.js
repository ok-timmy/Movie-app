import firebase, {app} from "../../src/config/firebase.config";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore"; 



const adduser = async(n, e, img) => {
    await setDoc(doc(db, "users", e), {
      name: n,
      email: e,
      profilePicture: img || "",
      favouritesMovies: [],
    });
  }


export function SignInWithEmail (_email, _password, router) {
    // const router = useRouter();
    const auth = getAuth();
    signInWithEmailAndPassword(auth, _email, _password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        sessionStorage.setItem('Token', response.user.accessToken);
        sessionStorage.setItem("User", user.email);
        // console.log(user);
        router.back();
        // reroute();
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage)
      });
  };

  export function SignInWithGoogle (router)  {
    // const router = useRouter();
    const provider = new GoogleAuthProvider();

    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((userCredential) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // console.log(user);
        // sessionStorage.setItem('Token', user.accessToken);
        sessionStorage.setItem("User", user.email);
        // router.push("/");
        router.back();
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  export function SignUpWithEmail (_email, _password, router) {  
    const auth = getAuth(); 
    createUserWithEmailAndPassword(auth, _email, _password)
      .then((userCredential) => {
        // Signed in
        // const user = userCredential.user;
        console.log(userCredential);
         adduser(name, email);
        //  sessionStorage.setItem("Token", userCredential.accessToken);
        //  router.reload(window.location.pathname);
        router.push("/account/sign-in");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  };

  export function SignedUpWithGoogle(router) {
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log(user);
        adduser(user.displayName, user.email, user.photoURL);
        router.back();
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };