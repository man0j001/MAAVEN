// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD_55hkoVmZgUfeZQjqxnZIVmVrSBM74Tk",
  authDomain: "ecart-86502.firebaseapp.com",
  projectId: "ecart-86502",
  storageBucket: "ecart-86502.appspot.com",
  messagingSenderId: "236416694998",
  appId: "1:236416694998:web:5c241bfcaffc779d91e777",
  measurementId: "G-G14ED9T63V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);
export default app;