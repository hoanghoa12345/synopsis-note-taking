import app from "@/services/firebase";
import {
  getFirestore,
  DocumentData,
  addDoc,
  collection,
  Timestamp,
  query,
  orderBy,
  onSnapshot,
  QuerySnapshot,
  QueryDocumentSnapshot,
  where,
  getDoc,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { useState } from "react";
import { useUser } from "./use-auth";

export const DOCUMENT_PATH = "notionDocument";

export type TDocumentData = {
  title: string;
  userId?: string;
  isArchived: boolean;
  parentDocument?: string | null;
  content: string;
  coverImage: string;
  icon?: string;
  isPublished: boolean;
  creationTime: Timestamp;
};

export type TDocument = TDocumentData & {
  id: string;
};

export const useDocuments = () => {
  const [documents, setDocuments] = useState<DocumentData | null>(null);
  const [document, setDocument] = useState<DocumentData | null>(null);
  const [trashDocuments, setTrashDocuments] = useState<DocumentData | null>(
    null
  );
  const db = getFirestore(app);
  const { user } = useUser();
  const documentRef = collection(db, DOCUMENT_PATH);

  const getSearchDocs = () => {
    const q = query(
      documentRef,
      orderBy("creationTime", "desc"),
      where("userId", "==", user?.uid),
      where("isArchived", "==", false)
    );

    onSnapshot(q, (querySnapshot: QuerySnapshot) => {
      setDocuments(
        querySnapshot.docs.map((doc: QueryDocumentSnapshot) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
    });
  };

  const getSidebar = async (parentDocument: string | null = null) => {
    const q = query(
      documentRef,
      orderBy("creationTime", "desc"),
      where("userId", "==", user?.uid),
      where("isArchived", "==", false),
      where("parentDocument", "==", parentDocument)
    );

    // const querySnapshot = await getDocs(q);
    // querySnapshot.forEach((doc) => {
    //   setDocuments((prev) => [
    //     ...prev,
    //     {
    //       id: doc.id,
    //       ...doc.data(),
    //     },
    //   ]);
    // })

    onSnapshot(q, (querySnapshot: QuerySnapshot) => {
      setDocuments(
        querySnapshot.docs.map((doc: QueryDocumentSnapshot) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
    });
    // console.log("Get document sidebar");
  };

  const createDocument = (docData: TDocumentData) =>
    addDoc(documentRef, docData);

  const archivedDocument = (id: string) => {
    const documentUpdateRef = doc(db, DOCUMENT_PATH, id);
    return updateDoc(documentUpdateRef, {
      isArchived: true,
    });
  };

  const getById = async (id: string) => {
    const docRef = doc(db, DOCUMENT_PATH, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      // console.log("Document data:", id);

      setDocument({
        id: docSnap.id,
        ...docSnap.data(),
      });
    } else {
      // console.log("No such document!");
    }
  };

  const getTrash = () => {
    const q = query(
      documentRef,
      orderBy("creationTime", "desc"),
      where("userId", "==", user?.uid),
      where("isArchived", "==", true)
    );

    onSnapshot(q, (querySnapshot: QuerySnapshot) => {
      setTrashDocuments(
        querySnapshot.docs.map((doc: QueryDocumentSnapshot) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
    });
  };

  const restoreDoc = (documentId: string) => {
    const documentUpdateRef = doc(db, DOCUMENT_PATH, documentId);
    return updateDoc(documentUpdateRef, {
      isArchived: false,
    });
  };

  const removeDoc = async (documentId: string) => {
    const removedDocRef = doc(db, DOCUMENT_PATH, documentId);
    return deleteDoc(removedDocRef);
  };

  const updateTitle = (documentId: string, title: string) => {
    const documentUpdateRef = doc(db, DOCUMENT_PATH, documentId);
    return updateDoc(documentUpdateRef, {
      title: title,
    });
  };

  const updateIcon = (documentId: string, icon: string) => {
    const documentUpdateRef = doc(db, DOCUMENT_PATH, documentId);
    return updateDoc(documentUpdateRef, {
      icon: icon,
    });
  };

  const removeIcon = (documentId: string) => {
    const documentUpdateRef = doc(db, DOCUMENT_PATH, documentId);
    return updateDoc(documentUpdateRef, {
      icon: null,
    });
  };

  const updateContent = (documentId: string, content: string) => {
    const documentUpdateRef = doc(db, DOCUMENT_PATH, documentId);
    return updateDoc(documentUpdateRef, {
      content: content,
    });
  };

  const updateCover = (documentId: string, coverImage: string) => {
    const documentUpdateRef = doc(db, DOCUMENT_PATH, documentId);
    return updateDoc(documentUpdateRef, {
      coverImage,
    });
  };

  const removeCover = (documentId: string) => {
    const documentUpdateRef = doc(db, DOCUMENT_PATH, documentId);
    return updateDoc(documentUpdateRef, {
      coverImage: null,
    });
  };

  const getDocDetail = (documentId?: string) => {
    if (!documentId) return () => {};
    const docRef = doc(db, DOCUMENT_PATH, documentId);
    // console.log("get detail", documentId);
    return onSnapshot(docRef, { includeMetadataChanges: true }, (doc) => {
      setDocument({
        id: doc.id,
        ...doc.data(),
      });
    });
  };

  return {
    documents,
    document,
    trashDocuments,
    createDocument,
    getSidebar,
    archivedDocument,
    getById,
    getTrash,
    restoreDoc,
    removeDoc,
    getSearchDocs,
    updateTitle,
    updateIcon,
    removeIcon,
    updateContent,
    updateCover,
    removeCover,
    getDocDetail,
  };
};
