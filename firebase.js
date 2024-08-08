// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'

import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBba2tMRHLw06zPJgYw3MvDd650BSv6bmw",
  authDomain: "inventory-management-4c9b1.firebaseapp.com",
  projectId: "inventory-management-4c9b1",
  storageBucket: "inventory-management-4c9b1.appspot.com",
  messagingSenderId: "264453736508",
  appId: "1:264453736508:web:bc12c0fcbef116a1709b39",
  measurementId: "G-V5W4DS4QCY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)

const firestore = getFirestore(app)

export { firestore } 
