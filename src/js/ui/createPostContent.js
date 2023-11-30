import { createElement } from '../utils.js';
import { createPostFooter, createInteractionDiv } from './index.js';

export function createPostContent({ post, withHref }) {
  const { id, title, body, author, created, media } = post;

  const postContent = createElement('div', {
    className: 'post-content p-5 rounded w-100',
  });

  let wrapper = postContent;

  if (withHref) {
    const postLink = createElement('a', {
      className: 'text-decoration-none text-dark',
      href: `post.html?postId=${id}`,
    });

    postLink.appendChild(postContent);
    wrapper = postLink;
  }

  const postTitle = createElement('h1', {
    className: 'mb-3',
    textContent: title,
  });

  postContent.appendChild(postTitle);

  if (media) {
    const img = createElement('img', {
      src: media,
      className: 'card-img',
      alt: 'Post image',
    });
    postContent.appendChild(img);
  }

  const postBody = createElement('p', {
    className: 'p-4',
    textContent: body,
  });

  const postFooter = createPostFooter(author, created);

  postContent.appendChild(postBody);
  postContent.appendChild(postFooter);

  return wrapper;
}
