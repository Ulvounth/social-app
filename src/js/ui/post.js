import { fetchPost, deletePost } from "../services/api.js";
import { editPost, editModal, editModalSubmission } from "../utils.js";

const postContainer = document.getElementById("post");
const documentTitle = document.querySelector("title");
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
    const { title, body, author, created, media, reactions } = post; // Destructuring the post object with additional fields
    const postImage = media
      ? `<img src="${media}" class="card-img-top" alt="Post image">`
      : "";

    // Adding edit and delete buttons conditionally
    const editButtonHTML = author.name.includes("Ulvounth")
      ? `<button class="edit-post btn btn-secondary position-absolute top-0 end-0 m-3" aria-label="Edit post">
       <i class="fa-solid fa-pencil"></i>
     </button>`
      : "";

    const deleteButtonHTML = author.name.includes("Ulvounth")
      ? `<button class="btn btn-danger mt-2">Delete Post</button>`
      : "";

    postContainer.innerHTML = `
        <div class="post-card col mb-5 rounded shadow-lg position-relative">
          ${editButtonHTML}
          <div class="post-content p-5 rounded w-100">
            <h1 class="mb-3">${title}</h1>
            ${postImage}
            <p class="p-4">${body}</p>
            <footer>
            <small class="text-muted">By ${post.author.name} - ${new Date(
      post.created
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

    documentTitle.innerHTML = `${title}`;

    // Add event listeners for edit and delete buttons if they exist
    const editButton = postContainer.querySelector(".edit-post");
    if (editButton) {
      editButton.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        editPost(post);
      });
    }

    const deleteButton = postContainer.querySelector(".btn-danger");
    if (deleteButton) {
      deleteButton.addEventListener("click", () => deletePost(post.id));
    }
  }
}

displayPost();
