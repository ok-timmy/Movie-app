import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../src/config/firebase.config";

export const addToFavourites = async (mov, user) => {
  const docRef = doc(db, "users", user);
  const docSnap = await getDoc(docRef);
  const prevMovies = docSnap.data();
  const existingFaves = prevMovies.favouriteMovies;
  // _document.data.value.mapValue.fields.favouriteMovies.arrayValue.values;
  console.log(prevMovies);
  const washingtonRef = doc(db, "users", user);
  const newExistingFaves = prevMovies.favouriteMovies.push(mov);
  await updateDoc(washingtonRef, {
    favouriteMovies: newExistingFaves
  });
};