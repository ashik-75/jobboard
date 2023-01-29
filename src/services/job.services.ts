import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";

export async function addJobInfo(document: any) {
  const response = await addDoc(collection(db, "jobs"), document);

  return response;
}

export async function updateJobInfo(document: any) {
  console.log({ document });
  const documentRef = doc(db, "jobs", document?.jobId);

  const response = await updateDoc(documentRef, document.jobInfo);

  return response;
}

export async function deleteJob(jobId: string) {
  const response = await deleteDoc(doc(db, "jobs", jobId));

  return response;
}

export async function getJobs({ pageParam }: any) {
  console.log({ pageParam });
  const documentsRef = collection(db, "jobs");
  let q = undefined;

  if (pageParam) {
    q = query(
      documentsRef,
      orderBy("createdAt", "desc"),
      limit(2),
      startAfter(pageParam)
    );
  } else {
    q = query(documentsRef, orderBy("createdAt", "desc"), limit(2));
  }
  const jobs = await getDocs(q);

  return jobs;
}

export async function getJob({ queryKey }: { queryKey: any[] }) {
  const jobId = queryKey?.[1];
  const jobs = await getDoc(doc(db, "jobs", jobId));

  return jobs;
}
