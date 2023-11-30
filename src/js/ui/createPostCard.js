import { createElement, editPost } from '../utils.js';
import {
  createEditButton,
  createDeleteButton,
  createPostContent,
  createInteractionDiv,
} from './index.js';
import { decodedAccessToken } from '../auth/index.js';

export function createPostCard({ post, withHref = true }) {
  const { title, author, reactions } = post;

  const { name } = decodedAccessToken();

  const postCard = createElement('div', {
    className: 'col mb-5 rounded-4 shadow-lg position-relative',
  });

  const postContent = createPostContent({ post, withHref });
  const interactionDiv = createInteractionDiv(reactions, title);

  if (author.name.includes(name)) {
    const editButton = createEditButton((e) => {
      e.preventDefault();
      e.stopPropagation();
      editPost(post);
    });

    const deleteButton = createDeleteButton();

    postCard.appendChild(editButton);
    postContent.appendChild(deleteButton);
  }

  postCard.appendChild(postContent);
  postCard.appendChild(interactionDiv);

  return postCard;
}
