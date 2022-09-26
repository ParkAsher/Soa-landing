// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app"
import "firebase/compat/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAAMnIKOjp43W7fkCs82xYgYtjFfwddrk4",
    authDomain: "reservationview-cb97c.firebaseapp.com",
    projectId: "reservationview-cb97c",
    storageBucket: "reservationview-cb97c.appspot.com",
    messagingSenderId: "282124093875",
    appId: "1:282124093875:web:fcc42d357572fed34423c6"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
