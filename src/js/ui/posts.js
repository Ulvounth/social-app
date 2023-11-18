import { fetchPosts, deletePost } from "../services/index.js";

const filterSelect = document.getElementById("filter-posts-select");
const filterSearch = document.getElementById("filter-posts-search");

filterSelect.addEventListener("change", async (e) => {
  const posts = await fetchPosts(e.target.value);
  displayPosts(posts);
});

filterSearch.addEventListener("input", async (e) => {
  const posts = await fetchPosts(e.target.value);
  const filteredPosts = posts.filter((post) => {
    return (
      post.body.toLowerCase().includes(e.target.value) ||
      post.author.name.toLowerCase().includes(e.target.value)
    );
  });
  displayPosts(filteredPosts);
});

async function displayPosts(posts) {
  const postsContainer = document.getElementById("posts");
  postsContainer.innerHTML = ""; // Clear previous content

  posts.forEach((post) => {
    const postDiv = document.createElement("div");
    postDiv.className = "col mb-3";
    postDiv.innerHTML = `
        <div class="gallery-image">
            <h5 class="card-title">${post.title}</h5>
            <p class="card-text">${post.body}</p>
            <footer>
                <small>By ${post.author.name} ${post.created}</small>
            </footer>
            <a href="post.html?postId=${post.id}" class="btn btn-primary mt-2">View Post</a>
        </div>
    `;

    // Check if the delete button should be added
    if (post.author.name.includes("Ulvounth")) {
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete Post";
      deleteButton.className = "btn btn-danger mt-2";
      deleteButton.addEventListener("click", () => deletePost(post.id));
      postDiv.querySelector(".gallery-image").appendChild(deleteButton);
    }

    postsContainer.appendChild(postDiv);
  });
}

document.addEventListener("DOMContentLoaded", async () => {
  const posts = await fetchPosts();
  displayPosts(posts);
});
