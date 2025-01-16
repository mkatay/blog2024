//a backend kölünválasztva
import {db} from "./firebaseApp";
import {collection, addDoc,doc,deleteDoc,query,getDoc,
  where,serverTimestamp, updateDoc,orderBy,onSnapshot} from "firebase/firestore";
import { useEffect } from 'react';
import usePagination from "react-firebase-pagination";


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
//az összes post kiolvasása:--már nincs használva za oldallapozás bevezetése után
export const readPosts = (setPosts,selectedCateg) => {
  const collectionRef = collection(db, "posts");
  const q =selectedCateg.length==0 ?  
    query(collectionRef, orderBy('timestamp', 'desc'))
    : 
    query(collectionRef,where('category','in',selectedCateg),orderBy('timestamp', 'desc'))
  const unsubscribe = onSnapshot(q, (snapshot) => {
    setPosts(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
  });
  return unsubscribe;
};
;

/////////////////////////////az oldallapozáshoz kell:///////////////////////////////////////

// Az alap query a `timestamp` szerint rendezi a posztokat***az oldalazáshoz volt használva
export const getMainQuery = (selectedCateg) => {
  const collectionRef = collection(db, "posts");
  if (selectedCateg.length === 0) {
      return query(collectionRef, orderBy('timestamp', 'desc'));
  } else {
      return query(collectionRef, where('category', 'in', selectedCateg), orderBy('timestamp', 'desc'));
  }
};

/////////////////////////////////////////////////////////////////////////////////
export const readPost = (id, setPost) => {
  const docRef = doc(db, "posts", id);
  const unsubscribe=onSnapshot(docRef, (snapshot) => {
      setPost({...snapshot.data(), id: snapshot.id });
    })
    return unsubscribe
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
   
export const toggleLike=async (postId,uid)=>{
  const docRef = doc(db, "posts", postId);
  const docSnap = await getDoc(docRef);
  const likesArr = docSnap.data().likes || []; // Ha nincs likes attribútum, üres tömböt használunk
  if (likesArr.includes(uid)) {
      // Ha az uid már benne van, töröljük
      await updateDoc(docRef, {likes: likesArr.filter((id) => id !== uid)});
      console.log("Unlike történt");
  } else {
      // Ha az uid nincs benne, hozzáadjuk
      await updateDoc(docRef, {likes: [...likesArr, uid]});
      console.log("Like történt")
  }
};



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