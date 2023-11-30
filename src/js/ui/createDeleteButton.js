import { createElement } from '../utils.js';

export function createDeleteButton() {
  const deleteButton = createElement('button', {
    className: 'btn btn-danger mt-2',
    textContent: 'Delete Post',
  });

  return deleteButton;
}
