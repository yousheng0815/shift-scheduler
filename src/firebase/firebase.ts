import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAcu7XEv9betEjYVx8Ng64ss-UGSY74MDA",
  authDomain: "shift-scheduler-123a1.firebaseapp.com",
  databaseURL: "https://shift-scheduler-123a1-default-rtdb.firebaseio.com",
  projectId: "shift-scheduler-123a1",
  storageBucket: "shift-scheduler-123a1.firebasestorage.app",
  messagingSenderId: "614919982013",
  appId: "1:614919982013:web:651d1e1c1371324651a0d4",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();
