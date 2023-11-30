import { fetchPost, deletePost } from '../services/api.js';
import { editPost } from '../utils.js';
import { createPostCard } from './index.js';
import { displayMessage } from './shared/displayMessage.js';

const postContainer = document.getElementById('post');
const documentTitle = document.querySelector('title');
const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get('postId');

async function displayPost() {
  try {
    const post = await fetchPost(postId);
    if (postContainer) {
      const postCard = createPostCard({ post, withHref: false });
      postContainer.appendChild(postCard);
      documentTitle.textContent = post.title;
      addEventListeners(post);
    }
  } catch (error) {
    console.error('Error fetching post:', error);

    displayMessage('#post', 'alert-danger', 'There was an error fetching the post.');
  }
}

function addEventListeners(post) {
  addEditButtonListener(post);
  addDeleteButtonListener(post);
}

function addEditButtonListener(post) {
  const editButton = postContainer.querySelector('.edit-post');
  if (editButton) {
    editButton.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      editPost(post);
    });
  }
}

function addDeleteButtonListener(post) {
  const deleteButton = postContainer.querySelector('.btn-danger');
  if (deleteButton) {
    deleteButton.addEventListener('click', async () => {
      try {
        await deletePost(post.id);
      } catch (error) {
        console.error('Error deleting post: ', error);

        alert('Error deleting post, please try again.');
      }
    });
  }
}

displayPost();
