/**
 * Attempts to log in a user by sending a POST request with the user's credentials.
 *
 * @param {string} url The URL endpoint for user login.
 * @param {Object} data An object containing the user's login credentials.
 * @returns {Promise<Object|null>} A promise that resolves to the response data containing the access token, or null in case of failure.
 */
async function loginUser(url, data) {
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

      // Check if the error is specifically due to an incorrect password
      if (
        errorInfo.message === "Incorrect password" ||
        response.status === 401
      ) {
        throw new Error("The password you entered is incorrect.");
      } else {
        // For other types of errors
        throw new Error(`Error ${response.status}: ${errorInfo.message}`);
      }
    }

    const json = await response.json();
    const { accessToken } = json;
    localStorage.setItem("accessToken", accessToken);
    return json;
  } catch (error) {
    console.error("Login Error:", error);
    alert(`Login failed: ${error.message}`);
    return null; // Return null to indicate failure
  }
}

/**
 * Form element for user login.
 * @type {HTMLFormElement}
 */
const loginForm = document.getElementById("loginForm");

/**
 * Event listener for the 'submit' event of the login form.
 * This function prevents the default form submission, gathers the form data,
 * and calls the loginUser function with the input data.
 */
loginForm.addEventListener("submit", async function (event) {
  event.preventDefault(); // Prevent the default form submit action

  // Get the form data
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  if (!email.endsWith("@stud.noroff.no") && !email.endsWith("@noroff.no")) {
    alert("Please use a valid Noroff email address.");
    return;
  }

  // Create the data object
  const data = {
    email: email,
    password: password,
  };

  // Use the loginUser function to send the POST request
  const result = await loginUser(
    "https://api.noroff.dev/api/v1/social/auth/login",
    data
  );

  // Check if the login was successful
  if (result && result.accessToken) {
    // Redirect to the home page or dashboard as needed
    window.location.href = "/feed";
  }
});
