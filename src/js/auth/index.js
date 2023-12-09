/**
 * Attempts to log in a user by sending a POST request with the user's credentials.
 *
 * @param {string} url The URL endpoint for user login.
 * @param {Object} data An object containing the user's login credentials.
 * @returns {Promise<Object|null>} A promise that resolves to the response data containing the access token, or null in case of failure.
 */
export async function loginUser(url, data) {
  try {
    const postData = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };

    const response = await fetch(url, postData);

    if (!response.ok) {
      // If the HTTP status code is not 2xx, throw an error to catch it later
      const errorInfo = await response.json();

      // Check if the error is specifically due to an incorrect password
      if (errorInfo.message === 'Incorrect password' || response.status === 401) {
        throw new Error('The password you entered is incorrect.');
      } else {
        // For other types of errors
        throw new Error(`Error ${response.status}: ${errorInfo.message}`);
      }
    }

    const json = await response.json();
    const { accessToken } = json;
    localStorage.setItem('accessToken', accessToken);
    return json;
  } catch (error) {
    console.error('Login Error:', error);
    alert(`Login failed: ${error.message}`);
    return null; // Return null to indicate failure
  }
}

/**
 * Logs out the current user by removing the access token from local storage and redirecting to the login page.
 */
export function logout() {
  localStorage.removeItem('accessToken');
  window.location.href = '/index.html';
}

/**
 * Registers a new user by sending a POST request to the specified URL with the provided data.
 *
 * @param {string} url The URL endpoint for user registration.
 * @param {Object} data An object containing the user registration details.
 * @returns {Promise<Object|null>} A promise that resolves to the response data as an object, or null in case of failure.
 */
export async function registerUser(url, data) {
  try {
    const postData = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
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
    return {
      data: json,
      status: 'success',
    };
  } catch (error) {
    console.error('Registration Error:', error);
    alert(`Registration failed: ${error.message}`);
    return null; // Return null or appropriate value to indicate failure
  }
}

/**
 * Retrieves the access token from local storage and decodes it to get the payload data.
 * @returns {Object|null} The decoded access token payload, or null if the token is invalid.
 */
export function decodedAccessToken() {
  const token = localStorage.getItem('accessToken');
  try {
    const parts = token.split('.');
    if (parts.length !== 3) {
      throw new Error('Invalid JWT token');
    }
    const decodedPayload = atob(parts[1].replace(/_/g, '/').replace(/-/g, '+'));
    return JSON.parse(decodedPayload);
  } catch (error) {
    console.error('Failed to decode access token:', error);
    return null;
  }
}
