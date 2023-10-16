// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js";
import { getFirestore, collection, addDoc, doc, updateDoc } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js";
import { query, where, getDocs, getDoc } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js";
import { signOut } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js";



// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC6g34S8DcLYchWA7rYN3Db467hndBNIgk",
  authDomain: "wisereads-293ea.firebaseapp.com",
  projectId: "wisereads-293ea",
  storageBucket: "wisereads-293ea.appspot.com",
  messagingSenderId: "421023848561",
  appId: "1:421023848561:web:9a86aad693fd609b11a3d0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

window.signup = async function (e) {
  e.preventDefault();

  // Validation for username
  if (/\s/.test(fName.value) || /\s/.test(lName.value)) {
    alert("Username cannot contain spaces");
    return;
  }

  // Validation for password
  const passwordRegex = /^(?=.*\d)(?=.*[A-Z])(?=.*[!@#$%^&*()_+])(?=.*[a-z]).{8,}$/;
  if (!passwordRegex.test(password.value)) {
    alert("Password must be at least 8 characters long and include at least one number, uppercase letter, and special character");
    return;
  }

  // Validation for email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.value)) {
    alert("Invalid email format");
    return;
  }

  // Clear old messages
  message.textContent = "";

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value);

    // add user data
    await addDoc(collection(db, "users"), {
      firstName: fName.value,
      lastName: lName.value,
      address: address.value,
      userId: userCredential.user.uid,
      favorite: [],
    });

    showUserDetails(userCredential.user.uid);
    saveSession(userCredential.user.uid);


    alert("Signup successful");
  } catch (error) {
    alert("Error: " + error.message);
  }
};


window.signin = async function (e) {
  e.preventDefault();
  
  const emailSignIn = document.getElementById("email"); // تأكد من أن الاسم متطابق مع العنصر الفعلي في صفحة HTML
  const passwordSignIn = document.getElementById("password"); // تأكد من أن الاسم متطابق مع العنصر الفعلي في صفحة HTML
  
  try {
    const userCredential = await signInWithEmailAndPassword(auth, emailSignIn.value, passwordSignIn.value);
    
    showUserDetails(userCredential.user.uid);
    saveSession(userCredential.user.uid);

    // إعادة توجيه المستخدم إلى الصفحة الرئيسية
    window.location.href = "/";
  } catch (error) {
    alert("Error: " + error.message);
  }
};


function saveSession(userId) {
  localStorage.setItem("userId", userId);
}

export function showUserDetails(userId) {
  const userRef = collection(db, "users");
  const userQuery = query(userRef, where("userId", "==", userId));

  getDocs(userQuery)
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const userData = doc.data();
        const userName = userData.firstName + " " + userData.lastName;

        // احصل على العنصر الذي تريد تحديثه
        const userDetailsElement = document.getElementById("login-side");

        if (userDetailsElement) {
          // إذا كان العنصر موجودًا، قم بتحديث محتواه
          userDetailsElement.innerHTML = `
            <p style="color: black; font-size:24px;">Welcome, ${userName}!</p>
            <button id="logout">Logout</button>
          `;

          // إضافة حدث لزر تسجيل الخروج
          const logoutButton = document.getElementById("logout");
          logoutButton.addEventListener("click", () => {
            // قم بتسجيل الخروج وقم بتحديث الصفحة
            signOut(auth).then(() => {
              location.reload();
            });
          });
        } else {
          console.error("Element with id 'login-side' not found");
        }
      });
    })
    .catch((error) => {
      console.error("Error getting user details: ", error);
    });
}


export function logout() {
  // قم بتسجيل الخروج
  signOut(auth).then(() => {
    // حذف بيانات الدخول المحفوظة
    localStorage.removeItem("userId");
    
    // إعادة توجيه المستخدم إلى صفحة تسجيل الدخول
    window.location.href = "/";
  }).catch((error) => {
    console.error("Error signing out: ", error);
  });
}

export async function updateUserInfo(userId, newData) {
  const userRef = doc(db, "users", userId);

  try {
    const docSnap = await getDoc(userRef);

    if (docSnap.exists()) {
      await updateDoc(userRef, newData);

      console.log("User information updated successfully!");
    } else {
      console.error("Document not found for user with ID:", userId);
      throw new Error("Document not found");
    }
  } catch (error) {
    console.error("Error updating user information:", error);
    throw error;
  }
}


export function showUserDetailsInForm() {
  const userId = localStorage.getItem("userId");

  if (userId) {
    const userRef = collection(db, "users");
    const userQuery = query(userRef, where("userId", "==", userId));

    getDocs(userQuery)
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const userData = doc.data();

          const newNameElement = document.getElementById("fullname");
          const newAddressElement = document.getElementById("address");

          // التحقق من وجود العناصر قبل محاولة الوصول إليها
          if (newNameElement && newAddressElement) {
            newNameElement.value = userData.firstName + " " + userData.lastName;
            newAddressElement.value = userData.address;
          } else {
            console.error("One or more form elements not found.");
          }
        });
      })
      .catch((error) => {
        console.error("Error getting user details: ", error);
        // يمكنك إضافة رمز خاص هنا للتعامل مع حالة عدم العثور على الوثيقة
        // على سبيل المثال، يمكنك إعادة توجيه المستخدم إلى صفحة تسجيل الدخول
      });
  } else {
    console.error("User ID not found in localStorage");
    // يمكنك إضافة رمز خاص هنا للتعامل مع عدم وجود معرف المستخدم في localStorage
    // على سبيل المثال، يمكنك إعادة توجيه المستخدم إلى صفحة تسجيل الدخول
  }
}

export async function changePassword(userId, newPassword) {
  try {
    await updatePassword(auth.currentUser, newPassword);

    console.log("Password changed successfully!");
  } catch (error) {
    console.error("Error changing password:", error);
    throw error;
  }
}


export function addToFavorites(userFavorites, userId, bookId) {
  // تحقق مما إذا كان الـ ID موجودًا بالفعل في المصفوفة
  if (!userFavorites.includes(bookId)) {
    userFavorites.push(bookId);
    // قم بتحديث بيانات المستخدم في Firebase أو أي نظام تخزين آخر
    updateUserInfo(userId, { favorite: userFavorites });
    // رسالة تأكيد أو يمكنك تنفيذ أي عملية إضافية
    alert('Book added to favorites!');
  } else {
    // إذا كان الـ ID موجودًا بالفعل
    alert('Book is already in favorites.');
  }
}
