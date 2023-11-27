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
    const { title, body, created, media, author, reactions, id } = post;

    const postDiv = document.createElement("div");
    postDiv.className =
      "post-card col mb-5 p-4 rounded shadow-lg position-relative";

    // Post title
    const postTitle = document.createElement("h1");
    postTitle.className = "mb-3";
    postTitle.textContent = title;
    postDiv.appendChild(postTitle);

    // Create the post image if it exists
    if (media) {
      const img = document.createElement("img");
      img.src = media;
      img.className = "card-img";
      img.style = "max-width: 800px; max-height: 800px";
      img.alt = "Post image";
      postDiv.appendChild(img);
    }

    // Create the edit button if the author is "Ulvounth"
    if (author.name.includes("Ulvounth")) {
      const editButton = document.createElement("button");
      editButton.className =
        "edit-post btn btn-secondary position-absolute top-0 end-0 m-3";
      editButton.setAttribute("aria-label", `Edit post titled ${title}`);
      const icon = document.createElement("i");
      icon.className = "fa-solid fa-pencil";
      editButton.appendChild(icon);
      postDiv.appendChild(editButton);
    }

    // Create link element
    const postLink = document.createElement("a");
    postLink.href = `post.html?postId=${id}`;
    postLink.className = "text-decoration-none text-dark";

    // Create post content div
    const postContentDiv = document.createElement("div");
    postContentDiv.className = "post-content p-5 rounded w-100";

    // Post body
    const postBody = document.createElement("p");
    postBody.className = "p-4";
    postBody.textContent = body;
    postContentDiv.appendChild(postBody);

    // Post footer for author and date
    const postFooter = document.createElement("footer");
    const postAuthor = document.createElement("small");
    postAuthor.className = "text-muted";
    postAuthor.textContent = `By ${author.name} - ${new Date(
      created
    ).toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" })}`;
    postFooter.appendChild(postAuthor);
    postContentDiv.appendChild(postFooter);

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

    postContentDiv.appendChild(interactionDiv);
    postLink.appendChild(postContentDiv);
    postDiv.appendChild(postLink);

    // Check if the delete button should be added
    if (author.name.includes("Ulvounth")) {
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete Post";
      deleteButton.className = "btn btn-danger mt-2 btn-sm";
      deleteButton.setAttribute("aria-label", `Delete post titled ${title}`);
      deleteButton.addEventListener("click", () => deletePost(id));
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
