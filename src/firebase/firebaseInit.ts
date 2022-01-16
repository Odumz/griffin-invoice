// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// import "firebase/firestore";
import { getFirestore } from "firebase/firestore";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app"s Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDY0SjYuJCzr7HMnqnaN5sXOZus1uynQrQ",
  authDomain: "invoice-app-gt.firebaseapp.com",
  projectId: "invoice-app-gt",
  storageBucket: "invoice-app-gt.appspot.com",
  messagingSenderId: "6384370703",
  appId: "1:6384370703:web:5706fa7e4fd22e90f4cf7a",
};

// Initialize Firebase
const firebaseApp:any = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
// export default firebaseApp.firestore();
export default db;