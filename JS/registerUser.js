/**
 * Base URL for the API.
 * @type {string}
 */
const API_BASE_URL = "https://api.noroff.dev";

/**
 * Registers a new user by sending a POST request to the specified URL with the provided data.
 *
 * @param {string} url The URL endpoint for user registration.
 * @param {Object} data An object containing the user registration details.
 * @returns {Promise<Object|null>} A promise that resolves to the response data as an object, or null in case of failure.
 */
async function registerUser(url, data) {
  try {
    const postData = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    const response = await fetch(url, postData);

    if (!response.ok) {
      // If the HTTP status code is not 2xx, throw an error to catch it later
      const errorInfo = await response.json();
      throw new Error(`Error ${response.status}: ${JSON.stringify(errorInfo)}`);
    }

    const json = await response.json();
    return json;
  } catch (error) {
    console.error("Registration Error:", error);
    alert(`Registration failed: ${error.message}`);
    return null; // Return null or appropriate value to indicate failure
  }
}

// Assuming that the form element exists with an ID 'registerForm' in your HTML.
/**
 * Form element for user registration.
 * @type {HTMLFormElement}
 */
const registerForm = document.getElementById("registerForm");

/**
 * Event listener for the 'submit' event of the registration form.
 * This function prevents the default form submission, validates the form data,
 * and calls the registerUser function with the input data.
 */
registerForm.addEventListener("submit", async function (event) {
  // Prevent the default form submit action
  event.preventDefault();

  // Get the form data
  const name = document.getElementById("registerUsername").value;
  const email = document.getElementById("registerEmail").value;
  const password = document.getElementById("registerPassword").value;

  // Basic validation (Further validation can be added according to requirements)
  if (name.includes(".") || name.includes(" ")) {
    alert(
      "Username should not contain punctuation or spaces apart from underscores."
    );
    return;
  }
  if (!email.endsWith("@stud.noroff.no") && !email.endsWith("@noroff.no")) {
    alert("Please use a valid Noroff email address.");
    return;
  }
  if (password.length < 8) {
    alert("Password must be at least 8 characters.");
    return;
  }

  // Create the request object
  const data = {
    name: name,
    email: email,
    password: password,
  };

  const result = await registerUser(
    `${API_BASE_URL}/api/v1/social/auth/register`,
    data
  );

  // Check if the registration was successful
  if (result && result.status === "success") {
    alert("Registration successful!");
    // Redirect to login or profile page as needed
    // window.location.href = '/login';
  }
});
