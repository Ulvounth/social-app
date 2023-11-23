import { fetchPosts, deletePost } from "../services/api.js";
import { editModalSubmission, editPost, editModal } from "../utils.js";

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

/**
 * Display posts on the page.
 *
 * @param {Array} posts An array of post objects to be displayed.
 */
async function displayPosts(posts) {
  const postsContainer = document.getElementById("posts");
  postsContainer.innerHTML = ""; // Clear previous content

  posts.forEach((post) => {
    const postDiv = document.createElement("div");
    postDiv.className =
      "post-card col mb-5 rounded shadow-lg position-relative";
    const postImage = post.media
      ? `<img src="${post.media}" class="card-img" alt="Post image">`
      : "";

    const editButtonHTML = post.author.name.includes("Ulvounth")
      ? `<button class="edit-post btn btn-secondary position-absolute top-0 end-0 m-3">
            <i class="fa-solid fa-pencil"></i>
          </button>`
      : "";

    postDiv.innerHTML = `
        ${editButtonHTML}
        <a href="post.html?postId=${
          post.id
        }" class="text-decoration-none text-dark">
          <div class="post-content p-5 rounded w-100">
            <h1 class="mb-3">${post.title}</h1>
            ${postImage}
            <p class="p-4">${post.body}</p>
            <div class="mb-3">
            <small class="text-muted">By ${post.author.name} - ${new Date(
      post.created
    ).toLocaleString("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    })}</small>

            </div>
            <div class="d-flex">
              <span class="flex-grow-1 text-start">${
                post.reactions.length
              } likes</span>
              <button class="btn btn-primary btn-sm me-2">Like</button>
              <button class="btn btn-secondary btn-sm">Comment</button>
            </div>
          </div>
        </a>
      `;

    // Check if the delete button should be added
    if (post.author.name.includes("Ulvounth")) {
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete Post";
      deleteButton.className = "btn btn-danger mt-2 btn-sm";
      deleteButton.addEventListener("click", () => deletePost(post.id));
      postDiv.querySelector(".post-content").appendChild(deleteButton);
    }

    postsContainer.appendChild(postDiv);

    // If there is an edit button, attach the click event listener to it
    const editButtons = postDiv.getElementsByClassName("edit-post");
    if (editButtons.length > 0) {
      editButtons[0].addEventListener("click", (e) => {
        e.preventDefault(); // Prevents navigation when clicking the button
        e.stopPropagation(); // Stops the click from reaching the <a> tag
        editPost(post); // Call editPost function with the current post
      });
    }
  });
}
document.addEventListener("DOMContentLoaded", async () => {
  const posts = await fetchPosts();

  displayPosts(posts);
});
