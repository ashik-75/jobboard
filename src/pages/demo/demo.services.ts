import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../../firebase";

export async function getNotes() {
  const documentsRef = collection(db, "notes");
  const q = query(documentsRef, orderBy("createdAt", "desc"));
  const results = await getDocs(q);

  return results;
}

export async function getNote({ queryKey }: any) {
  const noteId = queryKey?.[1];
  const documentRef = doc(db, "notes", noteId);
  const result = await getDoc(documentRef);

  return { id: result.id, ...result.data() };
}

export async function addNote(payload: any) {
  const documentsRef = collection(db, "notes");
  const results = await addDoc(documentsRef, payload);

  return results;
}
