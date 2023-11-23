import { logout } from "./utils.js";

document.addEventListener("DOMContentLoaded", async () => {
  const logoutButton = document.getElementById("logout");

  logoutButton.addEventListener("click", logout);
});
