import { fetchPost } from "../services/index.js";

const postContainer = document.getElementById("post");
const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get("postId");

async function displayPost() {
  const post = await fetchPost(postId);
  if (postContainer) {
    postContainer.innerHTML = `
                  <div class="gallery-image">
                      <h5 class="card-title">${post.title}</h5>
                      <p class="card-text">${post.body}</p>
                      <footer>
                          <small>By ${post.author.name} ${post.created}</small>
                      </footer>
                  </div>
          `;
  }
}

displayPost();
