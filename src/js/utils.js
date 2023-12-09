/**
 * Displays the modal for editing a post.
 *
 * @param {Object} post - The post object to be edited.
 */
function editPost(post) {
  editModal(post);
  let modal = new bootstrap.Modal(document.getElementById(`editPostModal-${post.id}`));
  modal.show();
}

/**
 * Creates and inserts the HTML for the edit post modal into the DOM.
 *
 * @param {Object} post - The post object to be edited, used to prefill modal form fields.
 */
function editModal(post) {
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
                <textarea class="form-control" id="postBody" required>${post.body}</textarea>
              </div>
              <div class="mb-3">
                <label for="postMedia" class="form-label">Media URL</label>
                <input type="url" class="form-control" id="postMedia" value="${post.media || ''}">
              </div>
              <button type="submit" class="btn btn-primary">Edit Post</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', modalHTML);

  // Now set up the form submission
  editModalSubmission(post, formId, modalId);
}

/**
 * Set up form submission logic for editing a post.
 * Attaches an event listener to the form within the modal, handling the form submission,
 * validation, and sending a PUT request with the updated post data.
 *
 * @param {Object} post - The original post object being edited.
 * @param {string} formId - The ID of the form element within the modal.
 * @param {string} modalId - The ID of the modal element.
 */
function editModalSubmission(post, formId, modalId) {
  const form = document.getElementById(formId);
  form.onsubmit = async function (e) {
    e.preventDefault();

    // Get the values from the form
    const title = document.getElementById('postTitle').value;
    const body = document.getElementById('postBody').value;
    const media = document.getElementById('postMedia').value;

    const accessToken = localStorage.getItem('accessToken');

    try {
      const response = await fetch(`https://api.noroff.dev/api/v1/social/posts/${post.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ title, body, media }),
      });

      if (response.ok) {
        // Handle successful update here...
        const modalElement = document.getElementById(modalId);
        const modalInstance = bootstrap.Modal.getInstance(modalElement);
        modalInstance.hide();
        modalElement.remove(); // Clean up the modal from DOM after closing
        window.location.reload();
      }
    } catch (error) {
      console.error('Error updating post:', error);

      alert('Error updating post, please try again.');
    }
  };
}

/**
 * Utility function to create an HTML element with specified attributes and properties.
 *
 * @param {string} tag - The HTML tag to create.
 * @param {Object} props - An object containing key-value pairs of attributes and properties to set on the element.
 * @returns {HTMLElement} The created HTML element.
 */
function createElement(tag, props) {
  const element = document.createElement(tag);

  if (props) {
    Object.keys(props).forEach((key) => {
      element[key] = props[key];
    });
  }

  return element;
}

export { editPost, editModal, editModalSubmission, createElement };
