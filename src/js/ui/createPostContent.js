import { createElement } from '../utils.js';
import { createPostHeader } from './index.js';

export function createPostContent({ post, withHref }) {
  const { id, title, body, media } = post;

  const postContent = createElement('div', {
    className: 'post-content p-4 rounded w-100',
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

  const postHeader = createPostHeader(post);
  postContent.appendChild(postHeader);

  const postTitle = createElement('h1', {
    className: 'my-3',
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
    className: 'p-4 text-break',
    textContent: body,
  });

  postContent.appendChild(postBody);

  return wrapper;
}
