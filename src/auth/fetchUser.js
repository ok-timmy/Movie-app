import firebase, { app, db } from "../../src/config/firebase.config";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";

export const adduser = async (n, e, img) => {
  await setDoc(doc(db, "users", e), {
    name: n,
    email: e,
    profilePicture: img || "",
    favouritesMovies: [],
  });
};

export async function GetUserData(activeData) {
  console.log(activeData);
  const docRef = doc(db, "users", activeData.email);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const docData = docSnap.data();
    console.log("Document data:", docSnap.data());
    const docDataStr =  JSON.stringify(docData)
    console.log(docDataStr);
    sessionStorage.setItem("UserDatabase", docDataStr);
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
    //Add the user as a New user to Firestore Then fetch the User Data and Set it to Session storage
    await adduser(activeData.displayName, activeData.email, activeData.photoURL); 
    const docRefNew = doc(db, "users", activeData.email);
    const docSnap = await getDoc(docRefNew);
    const docData = docSnap.data();
    console.log(docData);
    sessionStorage.setItem("UserDatabase", JSON.stringify(docData));
  }
}
