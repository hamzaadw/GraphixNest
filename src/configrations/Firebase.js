// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref, uploadBytes } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDQKSbJnX2Q-i2ZoDfCpVKwxdvQFLQuoFA",
  authDomain: "ecom2-ff87c.firebaseapp.com",
  projectId: "ecom2-ff87c",
  storageBucket: "ecom2-ff87c.appspot.com",
  messagingSenderId: "628943936577",
  appId: "1:628943936577:web:165c9b9426b6efd6a2fac0",
  measurementId: "G-2QGGVG16MR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const storage = getStorage();
const storageRef = ref(storage, 'some-child');


export {app,analytics,db,storage,storageRef};