// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDdor8ZRAoIKlF2isepR1FLLqtGB3WAvuM",
  authDomain: "intelligent-users.firebaseapp.com",
  projectId: "intelligent-users",
  storageBucket: "intelligent-users.appspot.com",
  messagingSenderId: "276150383116",
  appId: "1:276150383116:web:2bff91cc035fbf94ad3429",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;
