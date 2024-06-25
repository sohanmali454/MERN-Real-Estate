// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "mern-estate-66cc0.firebaseapp.com",
    projectId: "mern-estate-66cc0",
    storageBucket: "mern-estate-66cc0.appspot.com",
    messagingSenderId: "516776139994",
    appId: "1:516776139994:web:c10c36e30cb22413c699e3"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);