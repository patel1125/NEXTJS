import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "YOUR_KEY",
  authDomain: "YOUR_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const getItems = async () => {
  const snapshot = await getDocs(collection(db, "items"));
  return snapshot.docs.map(doc => ({
    id: doc.id,
    title: doc.data().title,
  }));
};

export const addItem = async (title) => {
  const docRef = await addDoc(collection(db, "items"), { title });
  return { id: docRef.id, title };
};

export const deleteItem = async (id) => {
  await deleteDoc(doc(db, "items", id));
  return true;
};