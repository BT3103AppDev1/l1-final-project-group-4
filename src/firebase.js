// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBK3yq2rFJqiRx_n6aWH15pu4Zb3fL5V3Y",
  authDomain: "elsa-grooming.firebaseapp.com",
  projectId: "elsa-grooming",
  storageBucket: "elsa-grooming.appspot.com",
  messagingSenderId: "550759390196",
  appId: "1:550759390196:web:f4bfb8b15a0dee76e437a1",
  measurementId: "G-3MK49GG31W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {app, auth};