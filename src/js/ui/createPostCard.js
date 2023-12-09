import { createElement, editPost } from '../utils.js';
import { deletePost } from '../services/api.js';
import {
  createEditButton,
  createDeleteButton,
  createPostContent,
  createInteractionDiv,
} from './index.js';
import { decodedAccessToken } from '../auth/index.js';

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
