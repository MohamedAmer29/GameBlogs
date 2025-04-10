import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyDuNG76qzTbNg2vqVFP5aABdVG9hhQdSCo",
  authDomain: "fireblog-d576e.firebaseapp.com",
  projectId: "fireblog-d576e",
  storageBucket: "fireblog-d576e.firebasestorage.app",
  messagingSenderId: "878022604978",
  appId: "1:878022604978:web:38e0a91ca6d184f62df1ab",
};

const app = initializeApp(firebaseConfig);

export const db = initializeApp(firebaseConfig);
export const db2 = getFirestore(app);
