import { createElement } from '../utils.js';
import { reactToPost } from '../services/api.js';
const likedPosts = localStorage.getItem('likedPosts');
/**
 * Updates the post UI after a like action.
 * @param {Object} updatedPostData - The updated data of the post after liking.
 * @param {string} postId - The ID of the post being updated.
 */
function updatePostUI(updatedPostData, id) {
  // Assuming each post has a unique ID and the like count is displayed in an element with a specific class
  const likeCountElement = document.querySelector(`#post-${id} .like-count`);
  const likeButtonElement = document.querySelector(`#post-${id} .like-button`);

  if (likeCountElement) {
    likeCountElement.textContent = `${updatedPostData.count} likes`;
  }

  if (likeButtonElement) {
    // Update the button appearance to show it's been liked, e.g., change color or icon
    likeButtonElement.textContent = 'Liked';
    likeButtonElement.disabled = true;
  }
}

export function createLikeButton(title, id, reaction) {
  const likeButton = createElement('button', {
    className: 'btn btn-primary btn-sm me-2 like-button',
    textContent: 'Like',
    ariaLabel: `Like post titled ${title}`,
  });

  likeButton.addEventListener('click', async () => {
    console.log(JSON.parse(likedPosts || '[]'));
    try {
      localStorage.setItem(
        'likedPosts',
        JSON.stringify(likedPosts ? [...likedPosts, { id }] : [{ id }]),
      );
      const updatedPostData = await reactToPost(id, reaction);
      updatePostUI(updatedPostData, id);
    } catch (error) {
      console.error('error liking post', error);
    }
  });

  return likeButton;
}
