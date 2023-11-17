const API_BASE_URL = "https://api.noroff.dev";

async function fetchWithToken(url) {
  try {
    const token = localStorage.getItem("accessToken");
    const getData = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(url, getData);
    console.log(response);
    const json = await response.json();
    console.log(json);
    renderPosts(json);
  } catch (error) {
    console.log(error);
  }
}
// Function to create HTML for each post and append it to the #posts div
function renderPosts(posts) {
  const postsContainer = document.getElementById("posts");
  // Clear any existing content
  postsContainer.innerHTML = "";
  // Iterate over the posts array
  posts.forEach((post) => {
    const postElement = document.createElement("div");
    postElement.innerHTML = `
        <div class="gallery-image">
        <h2><i class="fa-solid fa-user"></i> ${post.author.name}</h2>
          <h5>${post.title}</h5>
          <p>${post.body}</p>
        </div>
      `;
    postElement.setAttribute("data-post-id", post.id); // Set the post ID as an attribute

    // Add an event listener to each post element
    postElement.addEventListener("click", () => {
      fetchAndDisplayPost(post.id);
    });
    // Append the post HTML to the posts container
    postsContainer.appendChild(postElement);
  });
}
// Call the function with the API URL
fetchWithToken(
  API_BASE_URL +
    "/api/v1/social/posts?_author=true&_comments=true&_reactions=true"
);

async function fetchAndDisplayPost(postId) {
  const url = `${API_BASE_URL}/api/v1/social/posts/${postId}?_author=true&_comments=true&_reactions=true`;
  try {
    const token = localStorage.getItem("accessToken");
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const post = await response.json();
    renderSpecificPost(post); // Function to render the specific post details
  } catch (error) {
    console.error("Fetching specific post failed:", error);
    // Handle errors appropriately
  }
}

function renderSpecificPost(post) {
  // Example: rendering post details in a specific div
  const specificPostContainer = document.getElementById("postSpecific");
  specificPostContainer.innerHTML = `
            <h3>${post.title}</h3>
            <p>Author: ${post.author.name}</p>
            <p>${post.body}</p>
            <!-- Render comments and reactions as needed -->
          `;
  // Optionally show a modal or bring the user's focus to the rendered content
}
