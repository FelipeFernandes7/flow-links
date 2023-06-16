import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBJRPrZy13T0fqsaHlP-tniIlMq6PlQ1d4",
  authDomain: "react-links-34305.firebaseapp.com",
  projectId: "react-links-34305",
  storageBucket: "react-links-34305.appspot.com",
  messagingSenderId: "508792098362",
  appId: "1:508792098362:web:28049d5545a7b400906f03",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
