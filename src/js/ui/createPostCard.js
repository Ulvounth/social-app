import { createElement, editPost } from '../utils.js';
import { deletePost } from '../services/api.js';
import {
  createEditButton,
  createDeleteButton,
  createPostContent,
  createInteractionDiv,
} from './index.js';
import { decodedAccessToken } from '../auth/index.js';

/**
 * Creates a card element for a post with content, interaction elements, and optionally edit and delete buttons.
 *
 * @param {Object} options - The options for creating a post card.
 * @param {Object} options.post - The post data to create the card for.
 * @param {boolean} [options.withHref=true] - Whether the post content should be wrapped in a hyperlink.
 * @returns {HTMLElement} The created post card element.
 */
export function createPostCard({ post, withHref = true }) {
  const { author } = post;
  const { name } = decodedAccessToken();

  const postCard = createElement('div', {
    className: 'col mb-5 rounded-4 shadow-lg position-relative',
    id: `post-${post.id}`, // Set a unique ID for each post card
  });

  const postContent = createPostContent({ post, withHref });
  const interactionDiv = createInteractionDiv(post);

  if (author.name.includes(name)) {
    const editButton = createEditButton((e) => {
      e.preventDefault();
      e.stopPropagation();
      editPost(post);
    });

    const deleteButton = createDeleteButton(async (e) => {
      try {
        e.preventDefault();
        e.stopPropagation();
        await deletePost(post.id);
      } catch (error) {
        console.error('Error deleting post: ', error);
        alert('Error deleting post, please try again.');
      }
    });

    postCard.appendChild(editButton);
    postContent.appendChild(deleteButton);
  }

  postCard.appendChild(postContent);
  postCard.appendChild(interactionDiv);

  return postCard;
}
