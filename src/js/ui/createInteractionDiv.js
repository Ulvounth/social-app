import { createElement } from '../utils.js';

export function createInteractionDiv(reactions, title) {
  const interactionDiv = createElement('div', {
    className: 'd-flex justify-content-end p-3',
  });

  const likesSpan = createElement('span', {
    className: 'flex-grow-1 text-start',
    textContent: `${reactions.length} likes`,
  });

  const likeButton = createElement('button', {
    className: 'btn btn-primary btn-sm me-2',
    textContent: 'Like',
  });

  likeButton.setAttribute('aria-label', `Like post titled ${title}`);

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
