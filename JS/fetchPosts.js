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
          <h5>${post.title}</h5>
          <p>${post.body}</p>
        </div>
      `;
    // Append the post HTML to the posts container
    postsContainer.appendChild(postElement);
  });
}
// Call the function with the API URL
fetchWithToken(API_BASE_URL + "/api/v1/social/posts");