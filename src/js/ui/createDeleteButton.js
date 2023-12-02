import { createElement } from '../utils.js';

export function createDeleteButton(onClick) {
  const deleteButton = createElement('button', {
    className: 'btn btn-danger mt-2',
    textContent: 'Delete Post',
  });

  deleteButton.addEventListener('click', onClick);

  return deleteButton;
}
