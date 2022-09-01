
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBH_92c0-wXC7krROT3enUEOxAJ69SwXxw",
  authDomain: "fir-frontend-8ca36.firebaseapp.com",
  projectId: "fir-frontend-8ca36",
  storageBucket: "fir-frontend-8ca36.appspot.com",
  messagingSenderId: "328525466639",
  appId: "1:328525466639:web:ef7153a62cde91f306a77a"
};


export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);