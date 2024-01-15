import { registerUser } from '../auth/index.js';
import { displayMessage, clearMessage } from '../ui/shared/displayMessage.js';

// Assuming that the form element exists with an ID 'registerForm' in your HTML.
/**
 * Form element for user registration.
 * @type {HTMLFormElement}
 */
const registerForm = document.getElementById('registerForm');

/**
 * Event listener for the 'submit' event of the registration form.
 * This function prevents the default form submission, validates the form data,
 * and calls the registerUser function with the input data.
 */
registerForm.addEventListener('submit', async function (event) {
  event.preventDefault();

  const name = document.getElementById('registerUsername').value;
  const email = document.getElementById('registerEmail').value;
  const password = document.getElementById('registerPassword').value;

  const usernameInput = document.getElementById('registerUsername');
  const emailInput = document.getElementById('registerEmail');
  const passwordInput = document.getElementById('registerPassword');

  usernameInput.addEventListener('input', () => clearMessage('#message-includes'));
  emailInput.addEventListener('input', () => clearMessage('#message-endswith'));
  passwordInput.addEventListener('input', () => clearMessage('#message-length'));

  if (name.includes('.') || name.includes(' ')) {
    displayMessage(
      '#message-includes',
      'alert-danger',
      'Username should not contain punctuation or spaces apart from underscores.',
    );
    return;
  }
  if (!email.endsWith('@stud.noroff.no') && !email.endsWith('@noroff.no')) {
    displayMessage('#message-endswith', 'alert-danger', 'Please use a valid Noroff email address.');
    return;
  }
  if (password.length < 8) {
    displayMessage('#message-length', 'alert-danger', 'Password must be at least 8 characters.');
    return;
  }

  const data = {
    name: name,
    email: email,
    password: password,
  };

  const result = await registerUser(`https://api.noroff.dev/api/v1/social/auth/register`, data);

  if (result.status === 'success') {
    alert('Registration successful!');

    window.location.href = '/index.html';
  }
});
