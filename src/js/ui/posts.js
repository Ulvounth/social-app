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
    postDiv.className = "post-card col mb-3 position-relative";
    const postImage = post.media
      ? `<img src="${post.media}" class="card-img-top" alt="Post image">`
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
          <div class="gallery-image">
            <h5 class="card-title">${post.title}</h5>
            ${postImage}
            <p class="card-text p-4">${post.body}</p>
            <div class="post-meta">
              <small class="text-muted">By ${post.author.name} - ${new Date(
      post.created
    ).toLocaleTimeString()}</small>
            </div>
            <div class="post-actions">
              <span class="like-count">${post.reactions.length} likes</span>
              <button class="btn btn-primary btn-sm">Like</button>
              <button class="btn btn-secondary btn-sm">Comment</button>
            </div>
          </div>
        </a>
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

  function editModal(post) {
    console.log(post);
    // Generate a unique ID for the modal and form
    const modalId = `editPostModal-${post.id}`;
    const formId = `editPostForm-${post.id}`;

    const modalHTML = `
      <div class="modal fade" id="${modalId}" tabindex="-1" aria-labelledby="editPostLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="editPostLabel">Edit Post</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <form id="${formId}">
                <div class="mb-3">
                  <label for="postTitle" class="form-label">Title</label>
                  <input type="text" class="form-control" id="postTitle" value="${
                    post.title
                  }" required>
                </div>
                <div class="mb-3">
                  <label for="postBody" class="form-label">Body</label>
                  <textarea class="form-control" id="postBody" required>${
                    post.body
                  }</textarea>
                </div>
                <div class="mb-3">
                  <label for="postMedia" class="form-label">Media URL</label>
                  <input type="url" class="form-control" id="postMedia" value="${
                    post.media || ""
                  }">
                </div>
                <button type="submit" class="btn btn-primary">Edit Post</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML("beforeend", modalHTML);

    // Now set up the form submission
    setupFormSubmission(post, formId, modalId);
  }

  function setupFormSubmission(post, formId, modalId) {
    const form = document.getElementById(formId);
    form.onsubmit = async function (e) {
      e.preventDefault();

      // Get the values from the form
      const title = document.getElementById("postTitle").value;
      const body = document.getElementById("postBody").value;
      const media = document.getElementById("postMedia").value;

      const accessToken = localStorage.getItem("accessToken");

      try {
        const response = await fetch(
          `https://api.noroff.dev/api/v1/social/posts/${post.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({ title, body, media }),
          }
        );

        if (response.ok) {
          // Handle successful update here...
          // For example, refresh the post list or update the UI accordingly
          const modalElement = document.getElementById(modalId);
          const modalInstance = bootstrap.Modal.getInstance(modalElement);
          modalInstance.hide();
          modalElement.remove(); // Clean up the modal from DOM after closing
        } else {
          // Handle errors, such as displaying a message to the user
        }
      } catch (error) {
        console.error("Error updating post:", error);
      }
    };
  }

  function editPost(post) {
    editModal(post);
    let modal = new bootstrap.Modal(
      document.getElementById(`editPostModal-${post.id}`)
    );
    modal.show();
  }
}
document.addEventListener("DOMContentLoaded", async () => {
  const posts = await fetchPosts();

  displayPosts(posts);
});
