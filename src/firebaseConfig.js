// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC7JP8KSc6ykKynzJ_of_UuhlocsDpuAVo",
  authDomain: "bug-track-v2.firebaseapp.com",
  projectId: "bug-track-v2",
  storageBucket: "bug-track-v2.appspot.com",
  messagingSenderId: "282120890236",
  appId: "1:282120890236:web:41bb36ea15a81ed7c666f9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);

//
