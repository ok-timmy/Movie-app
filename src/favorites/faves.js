import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../../src/config/firebase.config";

export const getWatchList = async (user) => {
  const docRef = doc(db, "users", user);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const data = docSnap.data();
    sessionStorage.setItem("UserWL", data.favouriteMovies);
    console.log("Document data:", docSnap.data());
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }
};

export const addToWatchList = async (mov, user, router) => {
  if(!user) {
    router.push('/account/signin');
  }

  else {

    const docRef = doc(db, "users", user);
    
    await updateDoc(docRef, {
      favouriteMovies: arrayUnion(mov),
    });
    
    getWatchList(user);
  }

  // const prevMovies = docSnap.data();
  // console.log(prevMovies);
  // const washingtonRef = doc(db, "users", user);
  // const newExistingFaves = prevMovies.favouriteMovies.push(mov);
  // await updateDoc(washingtonRef, {
  //   favouriteMovies: newExistingFaves
  // });
};

export const removeFromWatchList = async (mov, user) => {
  const docRef = doc(db, "users", user);

  await updateDoc(docRef, {
    favouriteMovies: arrayRemove(mov),
  });

  getWatchList(user);
};
