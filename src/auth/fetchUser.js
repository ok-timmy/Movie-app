import firebase, { app, db } from "../../src/config/firebase.config";
import { collection, doc, getDoc } from "firebase/firestore";

export async function GetUserData(activeEmail, fn) {
  const docRef = doc(db, "users", activeEmail);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const docData = docSnap.data();
    console.log("Document data:", docSnap.data());
    sessionStorage.setItem("UserDatabase", JSON.stringify(docData));
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
    //Add the user as a New user to Firestore Then fetch the User Data and Set it to Session storage
    await fn(_name, _email, _photo); 
    const docRefNew = doc(db, "users", _email);
    const docSnap = await getDoc(docRefNew);
    const docData = docSnap.data();
    sessionStorage.setItem("UserDatabase", JSON.stringify(docData));
  }
}
