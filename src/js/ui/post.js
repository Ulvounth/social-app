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
    const { title, body, author, created, media, reactions } = post;

    // Create the post card div
    const postCard = document.createElement("div");
    postCard.className =
      "post-card col mb-5 rounded shadow-lg position-relative";

    // Edit button
    if (author.name.includes("Ulvounth")) {
      const editButton = document.createElement("button");
      editButton.className =
        "edit-post btn btn-secondary position-absolute top-0 end-0 m-3";
      editButton.setAttribute("aria-label", "Edit post");
      const icon = document.createElement("i");
      icon.className = "fa-solid fa-pencil";
      editButton.appendChild(icon);
      postCard.appendChild(editButton);
    }

    // Post content div
    const postContent = document.createElement("div");
    postContent.className = "post-content p-5 rounded w-100";

    // Post title
    const postTitle = document.createElement("h1");
    postTitle.className = "mb-3";
    postTitle.textContent = title;
    postContent.appendChild(postTitle);

    // Post image
    if (media) {
      const img = document.createElement("img");
      img.src = media;
      img.className = "card-img";
      img.alt = "Post image";
      img.style = "max-width: 800px; max-height: 800px";
      postContent.appendChild(img);
    }

    // Post body
    const postBody = document.createElement("p");
    postBody.className = "p-4";
    postBody.textContent = body;
    postContent.appendChild(postBody);

    // Post footer
    const postFooter = document.createElement("footer");
    const postAuthor = document.createElement("small");
    postAuthor.className = "text-muted";
    postAuthor.textContent = `By ${author.name} - ${new Date(
      created
    ).toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" })}`;
    postFooter.appendChild(postAuthor);
    postContent.appendChild(postFooter);

    // Interaction buttons (Like and Comment)
    const interactionDiv = document.createElement("div");
    interactionDiv.className = "d-flex justify-content-end";

    // Likes count
    const likesSpan = document.createElement("span");
    likesSpan.className = "flex-grow-1 text-start";
    likesSpan.textContent = `${reactions.length} likes`;
    interactionDiv.appendChild(likesSpan);

    // Like button
    const likeButton = document.createElement("button");
    likeButton.className = "btn btn-primary btn-sm me-2";
    likeButton.setAttribute("aria-label", `Like post titled ${title}`);
    likeButton.textContent = "Like";
    interactionDiv.appendChild(likeButton);

    // Comment button
    const commentButton = document.createElement("button");
    commentButton.className = "btn btn-secondary btn-sm";
    commentButton.setAttribute("aria-label", `Comment on post titled ${title}`);
    commentButton.textContent = "Comment";
    interactionDiv.appendChild(commentButton);

    postContent.appendChild(interactionDiv);
    postCard.appendChild(postContent);

    // Delete button
    if (author.name.includes("Ulvounth")) {
      const deleteButton = document.createElement("button");
      deleteButton.className = "btn btn-danger mt-2";
      deleteButton.textContent = "Delete Post";
      postContent.appendChild(deleteButton);
    }

    postContainer.appendChild(postCard);
    documentTitle.textContent = title;

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
