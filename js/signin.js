 // Import the functions you need from the SDKs you need
 import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
 import { getAuth , signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js";

 // TODO: Add SDKs for Firebase products that you want to use
 // https://firebase.google.com/docs/web/setup#available-libraries

 // Your web app's Firebase configuration
 // For Firebase JS SDK v7.20.0 and later, measurementId is optional
 const firebaseConfig = {
    apiKey: "AIzaSyC6g34S8DcLYchWA7rYN3Db467hndBNIgk",
    authDomain: "wisereads-293ea.firebaseapp.com",
    projectId: "wisereads-293ea",
    storageBucket: "wisereads-293ea.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "1:421023848561:web:9a86aad693fd609b11a3d0"
 };

 // Initialize Firebase
 const app = initializeApp(firebaseConfig);
 const auth = getAuth();

 var email = document.getElementById("email");
 var password = document.getElementById("password");
 
 function signup(e) {
     e.preventDefault();
     
     if (password.value.length < 6) {
         alert("Password should be at least 6 characters long");
         return;
     }
 
     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
     if (!emailRegex.test(email.value)) {
         alert("Invalid email format");
         return;
     }
 

     createUserWithEmailAndPassword(auth, email.value, password.value)
         .then(function (userCredential) {
             const user = userCredential.user;
             alert("Account created successfully");
             console.log(user.uid);
         })
         .catch(function (error) {
             alert("Error creating account: " + error.message);
         });
 }