import { createElement } from '../utils.js';
import { reactToPost } from '../services/api.js';

export function createLikeButton(title, id, reaction) {
  const likeButton = createElement('button', {
    className: 'btn btn-primary btn-sm me-2',
    textContent: 'Like',
    ariaLabel: `Like post titled ${title}`,
  });

  likeButton.addEventListener('click', async () => {
    try {
      await reactToPost(id, reaction);
    } catch (error) {
      console.error('error liking post');
    }
  });

  return likeButton;
}
