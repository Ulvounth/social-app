import { createElement } from '../utils.js';

export function createPostFooter(author, created) {
  const postFooter = createElement('footer');

  const postAuthor = createElement('small', {
    className: 'text-muted',
    textContent: `By ${author.name} - ${new Date(created).toLocaleString('en-US', {
      dateStyle: 'medium',
      timeStyle: 'short',
    })}`,
  });

  postFooter.appendChild(postAuthor);
  return postFooter;
}
