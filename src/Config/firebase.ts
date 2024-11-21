// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBXsGjqHkBIOwlmg-GUnOyS4xpiiQkW4Co",
  authDomain: "thirdheart-b1751.firebaseapp.com",
  databaseURL: "https://thirdheart-b1751-default-rtdb.firebaseio.com",
  projectId: "thirdheart-b1751",
  storageBucket: "thirdheart-b1751.firebasestorage.app",
  messagingSenderId: "844060854183",
  appId: "1:844060854183:web:665a1961aaf657c1399882",
  measurementId: "G-2QWXPV6VXM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const analytics = getAnalytics(app);

export { database, analytics };