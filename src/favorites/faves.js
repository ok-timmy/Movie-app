import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../src/config/firebase.config";

export const getWatchList = async (user) => {
  const docRef = doc(db, "users", user);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const data = docSnap.data();
    sessionStorage.setItem("UserDatabase", JSON.stringify(data));
    console.log("Document data:", docSnap.data());
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }
};

export const addToWatchList = async (mov, user, router) => {
  try {
    if (user === null) {
      router.push("/account/sign-in");
    } else {
      const docRef = doc(db, "users", user);
      console.log(docRef);

      await updateDoc(docRef, {
        favouriteMovies: arrayUnion(mov),
      }).then(getWatchList(user));
    }
  } catch (err) {
    console.log(err);
  }
};

export const removeFromWatchList = async (mov, user) => {
  const docRef = doc(db, "users", user);

  await updateDoc(docRef, {
    favouriteMovies: arrayRemove(mov),
  });

  getWatchList(user);
};
