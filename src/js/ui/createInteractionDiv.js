import { createElement } from '../utils.js';
import { createLikeButton } from './createLikeButton.js';

export function createInteractionDiv(post) {
  const { id, reactions, title } = post;

  const interactionDiv = createElement('div', {
    className: 'd-flex justify-content-end p-3',
  });

  const likesSpan = createElement('span', {
    className: 'flex-grow-1 text-start',
    textContent: `${reactions.length} likes`,
  });

  const likeButton = createLikeButton(title, id, '👍');

  const commentButton = createElement('button', {
    className: 'btn btn-secondary btn-sm',
    textContent: 'Comment',
  });

  commentButton.setAttribute('aria-label', `Comment on post titled ${title}`);

  interactionDiv.appendChild(likesSpan);
  interactionDiv.appendChild(likeButton);
  interactionDiv.appendChild(commentButton);

  return interactionDiv;
}
