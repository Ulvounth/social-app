import { createElement } from '../utils.js';

/**
 * Creates a header element for a post, including the author's information and the creation date.
 *
 * @param {Object} post - The post data used to create the header.
 * @returns {HTMLElement} The created post header element.
 */
export function createPostHeader(post) {
  const { author, created } = post;

  const postHeader = createElement('header', {
    className: 'd-flex py-3 w-100 align-items-center border-bottom',
  });

  const postDiv = createElement('div');

  const i = createElement('i', {
    className: 'fa-solid fa-user px-2',
  });

  postDiv.appendChild(i);

  const postAuthor = createElement('span', {
    className: 'text-muted fw-medium',
    innerHTML: `<a href='/pages/profile/?user=${author.name}'>${author.name}
</a> - ${new Date(created).toLocaleString('en-US', {
      dateStyle: 'medium',
      timeStyle: 'short',
    })}`,
  });

  postHeader.appendChild(postDiv);
  postHeader.appendChild(postAuthor);

  return postHeader;
}
