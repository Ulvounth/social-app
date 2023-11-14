const API_BASE_URL = "https://api.noroff.dev";

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

// Select the form element
const registerForm = document.getElementById("registerForm");

// Add an event listener for the 'submit' event
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
