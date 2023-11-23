function logout() {
  // Remove the token
  localStorage.removeItem("accessToken");

  // Redirect to login page
  window.location.href = "../index.html";
}

function decodedAccessToken() {
  const token = localStorage.getItem("accessToken");
  try {
    const parts = token.split(".");
    if (parts.length !== 3) {
      throw new Error("Invalid JWT token");
    }
    const decodedPayload = atob(parts[1].replace(/_/g, "/").replace(/-/g, "+"));
    return JSON.parse(decodedPayload);
  } catch (error) {
    console.error("Failed to decode access token:", error);
    return null;
  }
}

function editPost(post) {
  editModal(post);
  let modal = new bootstrap.Modal(
    document.getElementById(`editPostModal-${post.id}`)
  );
  modal.show();
}

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

/**
 * Set up form submission logic for editing a post.
 *
 * This function attaches an event listener to the form within the modal,
 * which handles the form submission, performs validation, and sends a PUT request
 * with the updated post data.
 *
 * @param {Object} post The original post object that is being edited.
 * @param {string} formId The ID of the form element within the modal.
 * @param {string} modalId The ID of the modal element.
 */
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

export { decodedAccessToken, logout, editPost, editModal };
