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
    const { title, body, created, media, reactions } = post; // Destructuring

    // Create the main post element
    const postElement = document.createElement("div");
    postElement.className =
      "post-card col mb-5 rounded shadow-lg position-relative";

    // Create edit button if applicable
    if (user.name === post.author.name) {
      const editButton = document.createElement("button");
      editButton.className =
        "edit-post btn btn-secondary position-absolute top-0 end-0 m-3";
      editButton.setAttribute("aria-label", `Edit post titled ${title}`);
      editButton.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        editPost(post);
      });

      const icon = document.createElement("i");
      icon.className = "fa-solid fa-pencil";
      editButton.appendChild(icon);
      postElement.appendChild(editButton);
    }

    // Create post content div
    const postContentDiv = document.createElement("div");
    postContentDiv.className = "post-content p-5 rounded w-100";

    // Create and append post title
    const postTitle = document.createElement("h1");
    postTitle.className = "mb-3";
    postTitle.textContent = title;
    postContentDiv.appendChild(postTitle);

    // Create and append post image if it exists
    if (media) {
      const img = document.createElement("img");
      img.src = media;
      img.className = "card-img-top";
      img.style = "max-width: 800px; max-height: 800px";
      img.alt = "Post image";
      postContentDiv.appendChild(img);
    }

    // Create and append post body
    const postBody = document.createElement("p");
    postBody.className = "p-4";
    postBody.textContent = body;
    postContentDiv.appendChild(postBody);

    // Create and append post footer
    const postFooter = document.createElement("footer");
    const postAuthor = document.createElement("small");
    postAuthor.className = "text-muted";
    postAuthor.textContent = `By ${user.name} - ${new Date(
      created
    ).toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" })}`;
    postFooter.appendChild(postAuthor);
    postContentDiv.appendChild(postFooter);

    // Create and append interaction buttons
    const interactionDiv = document.createElement("div");
    interactionDiv.className = "d-flex justify-content-end";

    const likesSpan = document.createElement("span");
    likesSpan.className = "flex-grow-1 text-start";
    likesSpan.textContent = `${reactions.length} likes`;
    interactionDiv.appendChild(likesSpan);

    const likeButton = document.createElement("button");
    likeButton.className = "btn btn-primary btn-sm me-2";
    likeButton.textContent = "Like";
    interactionDiv.appendChild(likeButton);

    const commentButton = document.createElement("button");
    commentButton.className = "btn btn-secondary btn-sm";
    commentButton.textContent = "Comment";
    interactionDiv.appendChild(commentButton);

    postContentDiv.appendChild(interactionDiv);

    // Create delete button if applicable
    if (user.name === post.author.name) {
      const deleteButton = document.createElement("button");
      deleteButton.className = "btn btn-danger mt-2 btn-sm";
      deleteButton.textContent = "Delete Post";
      deleteButton.addEventListener("click", () => deletePost(post.id));
      postContentDiv.appendChild(deleteButton);
    }

    postElement.appendChild(postContentDiv);
    profilePostContainer.appendChild(postElement);
  });
});
