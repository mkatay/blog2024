// Import the functions you need from the SDKs you need
import { firebaseConfig } from "./firebaseConfig";
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getStorage} from 'firebase/storage'
import {getAuth} from "firebase/auth";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//referenciák:
export const db = getFirestore(app);//referencia az adatbázishoz
export const auth = getAuth(app);
export const storage=getStorage(app)



  
  