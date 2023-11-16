// LOGIN
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
    console.log(response);
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
    const accessToken = json.accessToken;
    localStorage.setItem("accessToken", accessToken);
    console.log(json);
    return json;
  } catch (error) {
    console.error("Login Error:", error);
    alert(`Login failed: ${error.message}`);
    return null; // Return null to indicate failure
  }
}

const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", async function (event) {
  event.preventDefault(); // Prevent the default form submit action

  // Get the form data
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

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
    alert("Login successful!");
    // Redirect to the home page or dashboard as needed
    window.location.href = "/feed";
  }
});
