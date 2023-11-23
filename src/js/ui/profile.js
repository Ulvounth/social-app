import {
  decodedAccessToken,
  editPost,
  editModal,
  editModalSubmission,
} from "../utils.js";
import { fetchUserPosts, deletePost } from "../services/api.js";

document.addEventListener("DOMContentLoaded", async () => {
  const profileUsername = document.getElementById("profile-username");
  const profilePostContainer = document.getElementById("profile-posts");

  const user = decodedAccessToken();

  profileUsername.innerText = user.name;
  const posts = await fetchUserPosts(user.name);

  posts.forEach((post) => {
    const postElement = document.createElement("div");
    const { title, body, created, media, reactions } = post; // Destructuring the post object with additional fields
    const postImage = media
      ? `<img src="${media}" class="card-img-top" alt="Post image">`
      : "";

    // Adding edit and delete buttons conditionally
    const editButtonHTML = `<button class="edit-post btn btn-secondary position-absolute top-0 end-0 m-3">
              <i class="fa-solid fa-pencil"></i>
            </button>`;

    const deleteButtonHTML = `<button class="btn btn-danger mt-2 btn-sm">Delete Post</button>`;

    postElement.innerHTML = `
        <div class="post-card col mb-5 rounded shadow-lg position-relative">
          ${editButtonHTML}
          <div class="post-content p-5 rounded w-100">
            <h1 class="mb-3">${title}</h1>
            ${postImage}
            <p class="p-4">${body}</p>
            <footer>
            <small class="text-muted">By ${user.name} - ${new Date(
      created
    ).toLocaleString("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    })}</small>

            </footer>
            <div class="d-flex justify-content-end">
              <button class="btn btn-primary btn-sm me-2">Like</button>
              <button class="btn btn-secondary btn-sm">Comment</button>
            </div>
            ${deleteButtonHTML}
          </div>
        </div>
        `;

    // Add event listeners for edit and delete buttons if they exist
    const editButton = postElement.querySelector(".edit-post");
    if (editButton) {
      editButton.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        editPost(post);
      });
    }

    const deleteButton = postElement.querySelector(".btn-danger");
    if (deleteButton) {
      deleteButton.addEventListener("click", () => deletePost(post.id));
    }

    profilePostContainer.appendChild(postElement);
  });
});
