function logout() {
  // Remove the token
  localStorage.removeItem("accessToken");

  // Redirect to login page
  window.location.href = "../index.html";
}
