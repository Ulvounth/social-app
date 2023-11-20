/**
 * Creates and inserts a modal for post creation into the DOM.
 * The modal includes a form for entering post details such as title, body, and media URL.
 * After inserting the modal into the DOM, it sets up form submission handling.
 */
function createModal() {
  const modalHTML = `
        <div class="modal fade" id="createPostModal" tabindex="-1" aria-labelledby="createPostModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="createPostModalLabel">Create Post</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form id="createPostForm">
                            <div class="mb-3">
                                <label for="postTitle" class="form-label">Title</label>
                                <input type="text" class="form-control" id="postTitle" required>
                            </div>
                            <div class="mb-3">
                                <label for="postBody" class="form-label">Body</label>
                                <textarea class="form-control" id="postBody" required></textarea>
                            </div>
                            <div class="mb-3">
                                <label for="postMedia" class="form-label">Media URL</label>
                                <input type="url" class="form-control" id="postMedia">
                            </div>
                            <button type="submit" class="btn btn-primary">Create Post</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    `;

  document.body.insertAdjacentHTML("beforeend", modalHTML);

  setupFormSubmission();
}

document.getElementById("createPost").addEventListener("click", function () {
  createModal();
  let createPostModal = new bootstrap.Modal(
    document.getElementById("createPostModal")
  );
  createPostModal.show();
});

/**
 * Sets up the form submission logic for creating a new post.
 * It attaches an event listener to the 'createPostForm' inside the modal,
 * which handles the form submission. The function prevents default form submission,
 * gathers form data, and sends a POST request to the server. On successful post creation,
 * it hides the modal.
 */
function setupFormSubmission() {
  document
    .getElementById("createPostForm")
    .addEventListener("submit", async function (e) {
      e.preventDefault();

      const title = document.getElementById("postTitle").value;
      const body = document.getElementById("postBody").value;
      const media = document.getElementById("postMedia").value;
      const accessToken = localStorage.getItem("accessToken");

      try {
        const response = await fetch(
          "https://api.noroff.dev/api/v1/social/posts/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({ title, body, media }),
          }
        );

        if (response.ok) {
          var createPostModal = bootstrap.Modal.getInstance(
            document.getElementById("createPostModal")
          );
          createPostModal.hide();
          // Optionally, refresh the list of posts or add the new post to the DOM
        } else {
          // Handle errors
        }
      } catch (error) {
        console.error("Error creating post:", error);
      }
    });
}
