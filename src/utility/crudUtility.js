//a backend kölünválasztva
import {db,storage} from "./firebaseApp";
import {collection, addDoc,doc,deleteDoc,query,getDoc,limit,getDocs,
  where,arrayUnion,arrayRemove,serverTimestamp, updateDoc,orderBy,onSnapshot } from "firebase/firestore";
import {ref, deleteObject} from "firebase/storage"
//import { deleteAvatar } from "./uploadFile";
import { getAuth, deleteUser, signOut } from 'firebase/auth';



//aszinkron:Az onSnapshot függvény egy eseményfigyelő, amely figyeli 
//a Firestore adatbázisban történő változásokat, akkor az onSnapshot meghívódik, és frissíti az aktuális adatokkal.
export const readCategories = (setCategories) => {
  const collectionRef = collection(db, "categories");
  const q = query(collectionRef, orderBy('name', 'asc'))                                       
  const unsubscribe = onSnapshot(q, (snapshot) => {
    setCategories(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
  });
  return unsubscribe;
};

export const addPost =async (formData) => {
 console.log(formData);

  const collectionRef= collection(db, "posts");
  const newItem={...formData,timestamp:serverTimestamp()}
  const newDocRef=await addDoc(collectionRef,newItem)
  //console.log("az új documentum azonosítója:",newDocRef.id)
};

export const readPosts = (setPosts,selectedCateg) => {
  const collectionRef = collection(db, "posts");
  const q =selectedCateg.length==0 ?  
    query(collectionRef, orderBy('timestamp', 'desc'))
    : 
    query(collectionRef,where('category','in',selectedCateg))
  const unsubscribe = onSnapshot(q, (snapshot) => {
    setPosts(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
  });
  return unsubscribe;
};

export const readPost = async (id, setPost) => {
  const docRef = doc(db, "posts", id);
  try{
    const docSnap = await getDoc(docRef);
      setPost({ ...docSnap.data(), id: docSnap.id });
  } catch (error) {
    console.error("Hiba a dokumentum olvasása közben:", error);
  }
};

export const deletePost=async (id)=>{
  //console.log('id:',id)
  const docRef= doc(db, "posts", id);
  await deleteDoc(docRef)
}
    
export const updatePost=async (id,{title,category,story})=>{
  const docRef= doc(db, "posts", id);
  //setDoc(docRef, {title})//felülír minden mezőt, s ha nem sorolok fel mindent, akkor kitörli, s csak a megadott mezők kerülnek be
  await updateDoc(docRef, {title,category,story})//csak azt a mezőt írja felül amit megadok
}
   

/*
    

export const popularPosts=async (setPopulars)=>{
  const collectionRef = collection(db, "posts");
  const q = query(collectionRef, orderBy("likes","desc"), limit(3));
  const unsubscribe = onSnapshot(q, (snapshot) => {
    setPopulars(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
  });
  return unsubscribe;

}
*/