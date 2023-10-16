import { showUserDetails, logout, updateUserInfo, showUserDetailsInForm,changePassword} from "./app.js";

document.addEventListener("DOMContentLoaded", function () {
  const userId = localStorage.getItem("userId");

  if (userId) {
    // قم بعرض محتوى الصفحة للمستخدم المسجل
    console.log("User ID:", userId);
    showUserDetails(userId);
  } else {
    if (window.location.pathname != "/") {
      window.location.href = "register.html";
    }
    // قم بتوجيه المستخدم إلى صفحة تسجيل الدخول إذا لم يكن قد قام بتسجيل الدخول
  }
  const logoutButton = document.getElementById("logout");
  if (logoutButton) {
    logoutButton.addEventListener("click", (e) => {
      logout();
    });
  }
  const accountDetailsForm = document.getElementById("account-details-form");

if (accountDetailsForm) {
  console.log("Calling showUserDetailsInForm");
  showUserDetailsInForm();

accountDetailsForm.addEventListener("submit", async function (event) {
  event.preventDefault();

  const userId = localStorage.getItem("userId");

  const newNameElement = document.getElementById("fullname");
  const newAddressElement = document.getElementById("address");

  // التحقق من وجود العناصر قبل محاولة الوصول إليها
  if (newNameElement && newAddressElement) {
    const newName = newNameElement.value;
    const newAddress = newAddressElement.value;

    try {
      await updateUserInfo(userId, { firstName: newName, address: newAddress });
      alert("User information updated successfully!");
    } catch (error) {
      console.error("Error updating user information:", error);
      alert("Error updating user information. Please try again.");
    }
  } else {
    console.error("One or more form elements not found.");
  }
});
}
const changePasswordForm = document.getElementById("change-password");

if (changePasswordForm) {
  changePasswordForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const newPasswordElement = document.getElementById("new-password");
    const confirmPasswordElement = document.getElementById("confirm-password");

    if (newPasswordElement && confirmPasswordElement) {
      const newPassword = newPasswordElement.value;
      const confirmPassword = confirmPasswordElement.value;

      if (newPassword !== confirmPassword) {
        alert("Passwords do not match. Please try again.");
        return;
      }

      try {
        await changePassword(userId, newPassword);
        alert("Password changed successfully!");
      } catch (error) {
        console.error("Error changing password:", error);
        alert("Error changing password. Please try again.");
      }
    } else {
      console.error("One or more form elements not found.");
    }
  });
}


});

