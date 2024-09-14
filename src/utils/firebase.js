// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD4w-8qLXdwa8bG10YqF5nQFTfHE-jPZg8",
  authDomain: "netflixgpt-73f3b.firebaseapp.com",
  projectId: "netflixgpt-73f3b",
  storageBucket: "netflixgpt-73f3b.appspot.com",
  messagingSenderId: "328348579569",
  appId: "1:328348579569:web:a8eeaa8e580ec1984cdb50",
  measurementId: "G-HBWPRXHR6E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
