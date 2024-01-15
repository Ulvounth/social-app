import { fetchPosts } from '../services/api.js';
import { editPost } from '../utils.js';
import { createPostCard } from './index.js';
import { displayMessage } from './shared/displayMessage.js';

const filterSelect = document.getElementById('filter-posts-select');
const filterSearch = document.getElementById('filter-posts-search');

filterSelect.addEventListener('change', handleFilterChange);
filterSearch.addEventListener('input', handleSearchInput);

/**
 * Handles the change event for the post filter, fetching and displaying posts based on the selected filter.
 *
 * @param {Event} e - The event object.
 */
async function handleFilterChange(e) {
  const posts = await fetchPosts(e.target.value);
  displayPosts(posts);
}

/**
 * Handles the input event for the post search field, fetching and displaying posts based on the search query.
 *
 * @param {Event} e - The event object.
 */
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
 * Displays an array of posts in the UI.
 *
 * @param {Array} posts - An array of post objects to be displayed.
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

/**
 * Adds a click event listener to the edit button of a post card, if present.
 *
 * @param {HTMLElement} postCard - The post card element to attach the listener to.
 * @param {Object} post - The post data associated with the post card.
 */
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
