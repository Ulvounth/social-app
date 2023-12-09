import { fetchPosts } from '../services/api.js';
import { editPost } from '../utils.js';
import { createPostCard } from './index.js';
import { displayMessage } from './shared/displayMessage.js';

const filterSelect = document.getElementById('filter-posts-select');
const filterSearch = document.getElementById('filter-posts-search');

filterSelect.addEventListener('change', handleFilterChange);
filterSearch.addEventListener('input', handleSearchInput);

async function handleFilterChange(e) {
  const posts = await fetchPosts(e.target.value);
  displayPosts(posts);
}

async function handleSearchInput(e) {
  const posts = await fetchPosts(e.target.value);
  const filteredPosts = posts.filter((post) => {
    return (
      post.body?.toLowerCase().includes(e.target.value) ||
      post.author.name?.toLowerCase().includes(e.target.value)
    );
  });
  displayPosts(filteredPosts);
}

/**
 * Display posts on the page.
 *
 * @param {Array} posts An array of post objects to be displayed.
 */
async function displayPosts(posts) {
  const postsContainer = document.getElementById('posts');
  postsContainer.innerHTML = '';

  posts.forEach((post) => {
    const postCard = createPostCard({ post });
    postsContainer.appendChild(postCard);
    addEditButtonListener(postCard, post);
  });
}

function addEditButtonListener(postCard, post) {
  const editButtons = postCard.getElementsByClassName('edit-post');
  if (editButtons.length > 0) {
    editButtons[0].addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      editPost(post);
    });
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  try {
    const posts = await fetchPosts();
    displayPosts(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);

    displayMessage('#posts', 'alert-danger', 'There was an error fetching the posts.');
  }
});
