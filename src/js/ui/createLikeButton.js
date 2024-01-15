import { createElement } from '../utils.js';
import { reactToPost } from '../services/api.js';

/**
 * Updates the post's UI after a like action, specifically updating the like count and the button's appearance.
 *
 * @param {Object} updatedPostData - The updated data of the post after liking.
 * @param {string} id - The ID of the post being updated.
 */
function updatePostUI(updatedPostData, id) {
  const likeCountElement = document.querySelector(`#post-${id} .like-count`);
  const likeButtonElement = document.querySelector(`#post-${id} .like-button`);

  if (likeCountElement) {
    likeCountElement.textContent = `${updatedPostData.count} likes`;
  }

  if (likeButtonElement) {
    likeButtonElement.textContent = 'Liked';
    likeButtonElement.disabled = true;
  }
}

/**
 * Creates a like button for a post and sets up its click event listener.
 * The button will change its appearance based on whether the post is liked.
 *
 * @param {string} title - The title of the post.
 * @param {string} id - The ID of the post.
 * @param {string} reaction - The reaction type for the like action.
 * @returns {HTMLElement} The like button element.
 */
export function createLikeButton(title, id, reaction) {
  const likedPosts = JSON.parse(localStorage.getItem('likedPosts') || '[]');
  const isAlreadyLiked = likedPosts.includes(id);

  const likeButton = createElement('button', {
    className: `btn btn-primary btn-sm me-2 like-button ${isAlreadyLiked ? 'liked' : ''}`,
    textContent: isAlreadyLiked ? 'Liked' : 'Like',
    ariaLabel: `Like post titled ${title}`,
  });

  likeButton.addEventListener('click', async () => {
    try {
      const updatedPostData = await reactToPost(id, reaction);
      updatePostUI(updatedPostData, id);

      if (!isAlreadyLiked) {
        localStorage.setItem('likedPosts', JSON.stringify([...likedPosts, id]));
      }
    } catch (error) {
      console.error('Error liking post', error);
    }
  });

  return likeButton;
}
