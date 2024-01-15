import { createElement } from '../utils.js';
import { createLikeButton } from './createLikeButton.js';

/**
 * Creates a div element containing interactive elements for a post, such as like and comment buttons.
 *
 * @param {Object} post - The post data used to create the interaction elements.
 * @returns {HTMLElement} The interaction div element containing like and comment buttons.
 */
export function createInteractionDiv(post) {
  const { id, reactions, title } = post;

  const interactionDiv = createElement('div', {
    className: 'd-flex justify-content-end p-3',
  });

  // Create a span to display the number of likes
  const likesSpan = createElement('span', {
    className: 'flex-grow-1 text-start like-count',
    textContent: `${reactions[0]?.count ?? 0} likes`,
  });

  // Create a like button
  const likeButton = createLikeButton(title, id, '👍');

  // Create a comment button
  const commentButton = createElement('button', {
    className: 'btn btn-secondary btn-sm',
    textContent: 'Comment',
  });
  commentButton.setAttribute('aria-label', `Comment on post titled ${title}`);

  // Append the like count, like button, and comment button to the interaction div
  interactionDiv.appendChild(likesSpan);
  interactionDiv.appendChild(likeButton);
  interactionDiv.appendChild(commentButton);

  return interactionDiv;
}
