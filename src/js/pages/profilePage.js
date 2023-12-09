import { decodedAccessToken } from '../auth/index.js';
import { fetchUserPosts } from '../services/api.js';
import { createPostCard } from '../ui/index.js';
import { displayMessage } from '../ui/shared/displayMessage.js';

const urlParams = new URLSearchParams(window.location.search);
const user = urlParams.get('user');

/**
 * Handles the loading of the user profile page. Fetches and displays posts by a specific user.
 * If no user is specified in the URL, it defaults to the currently authenticated user.
 */
document.addEventListener('DOMContentLoaded', async () => {
  try {
    const profileUsername = document.getElementById('profile-username');
    const profilePostContainer = document.getElementById('profile-posts');

    // Decodes the access token to retrieve the name of the current user
    const { name } = decodedAccessToken();

    // Sets the profile page to show the name of the user whose posts are being viewed
    profileUsername.innerText = user ?? name;

    // Fetches posts for the specified user or the current user if no user is specified
    const posts = await fetchUserPosts(user ?? name);

    // Creates and appends post cards for each post
    posts.forEach((post) => {
      const postCard = createPostCard({ post, withHref: false });
      profilePostContainer.appendChild(postCard);
    });
  } catch (error) {
    console.error('Error fetching posts:', error);

    // Displays an error message if there is an issue fetching the posts
    displayMessage('#profile-posts', 'alert-danger', 'There was an error fetching the posts.');
  }
});
