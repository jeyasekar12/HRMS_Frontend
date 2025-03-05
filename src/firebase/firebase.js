// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import  {getAuth} from "firebase/auth"

import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA5UTGHK3I6wKau6FQDc1z8ygXT60yYjsk",
  authDomain: "emplyee-d5657.firebaseapp.com",
  projectId: "emplyee-d5657",
  storageBucket: "emplyee-d5657.firebasestorage.app",
  messagingSenderId: "36689441247",
  appId: "1:36689441247:web:a203411c413ff180cfd46a",
  measurementId: "G-DZ9YXNVWEZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// const auth = getAuth(app);
// const Provider= new GoogleAuthProvider();

export {app, analytics};
export const auth = getAuth()

export const db= getFirestore();
export default app;




