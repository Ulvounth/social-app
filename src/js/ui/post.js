import { fetchPost } from "../services/index.js";

const postContainer = document.getElementById("post");
const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get("postId");

/**
 * Fetches and displays a specific post in the post container.
 * It uses the `postId` to fetch the post data and then renders it within the `postContainer`.
 * If no `postContainer` is found, the function does nothing.
 */
async function displayPost() {
  const post = await fetchPost(postId);
  if (postContainer) {
    const { title, body, author, created } = post; // Destructuring the post object
    postContainer.innerHTML = `
        <div class="gallery-image">
          <h5 class="card-title">${title}</h5>
          <p class="card-text">${body}</p>
          <footer>
            <small>By ${author.name} ${created}</small>
          </footer>
        </div>
      `;
  }
}

displayPost();
