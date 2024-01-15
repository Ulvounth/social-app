import { logout } from '../auth/index.js';

/**
 * Attaches an event listener to the logout button. When clicked, it triggers the logout process.
 */
document.addEventListener('DOMContentLoaded', async () => {
  const logoutButton = document.getElementById('logout');

  // Attaches the logout function as an event listener to the logout button
  logoutButton.addEventListener('click', logout);
});
