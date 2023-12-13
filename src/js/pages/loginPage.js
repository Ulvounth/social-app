import { loginUser } from '../auth/index.js';
import { displayMessage } from '../ui/shared/displayMessage.js';

/**
 * Form element for user login.
 * @type {HTMLFormElement}
 */
const loginForm = document.getElementById('loginForm');

/**
 * Event listener for the 'submit' event of the login form.
 * This function prevents the default form submission, gathers the form data,
 * and calls the loginUser function with the input data.
 */
loginForm.addEventListener('submit', async function (event) {
  event.preventDefault();

  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;

  if (!email.endsWith('@stud.noroff.no') && !email.endsWith('@noroff.no')) {
    displayMessage('#message', 'alert-danger', 'Please use a valid Noroff email address');
    return;
  }

  const data = {
    email: email,
    password: password,
  };

  const result = await loginUser('https://api.noroff.dev/api/v1/social/auth/login', data);

  if (result && result.accessToken) {
    window.location.href = '/pages/feed';
  }
});
