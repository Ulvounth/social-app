import { fetchPost } from '../services/api.js';
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
    }
  } catch (error) {
    console.error('Error fetching post:', error);

    displayMessage('#post', 'alert-danger', 'There was an error fetching the post.');
  }
}

displayPost();
