// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCdGK8L3c6vrDGxC8lxjB4BDpw6LasaVaQ",
  authDomain: "shop-fa9db.firebaseapp.com",
  projectId: "shop-fa9db",
  storageBucket: "shop-fa9db.appspot.com",
  messagingSenderId: "562429686987",
  appId: "1:562429686987:web:af768c6a6c65fbe0aa974e",
  measurementId: "G-HVM10ZH4QK",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;
