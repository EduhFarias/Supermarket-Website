import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-analytics.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
apiKey: "AIzaSyC-zTwMNUprRROLEhroWgYtzRKx1HYBBew",
authDomain: "supermarket-website-46581.firebaseapp.com",
projectId: "supermarket-website-46581",
storageBucket: "supermarket-website-46581.appspot.com",
messagingSenderId: "1010138289790",
appId: "1:1010138289790:web:ca514540e9e174934eea2f",
measurementId: "G-5R4Q4F9XQY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const analytics = getAnalytics(app);