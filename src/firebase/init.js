import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBuQAWxNO89yfnOMz7gUl3sl2bBWzBe0l8',
  authDomain: 'week7-christian.firebaseapp.com',
  projectId: 'week7-christian',
  storageBucket: 'week7-christian.appspot.com',
  messagingSenderId: '1014881697248',
  appId: '1:1014881697248:web:0a34dbfcda86659d677f85'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

export default db;
