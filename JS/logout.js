function logout() {
  // Remove the token
  localStorage.removeItem("accessToken");

  // Redirect to login page
  window.location.href = "../index.html";
}

// Attach the logout function to the logout button or link
document.getElementById("logoutButton").addEventListener("click", logout);
