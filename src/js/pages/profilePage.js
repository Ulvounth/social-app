import { decodedAccessToken } from '../auth/index.js';
import { fetchUserPosts } from '../services/api.js';
import { createPostCard } from '../ui/index.js';
import { displayMessage } from '../ui/shared/displayMessage.js';

document.addEventListener('DOMContentLoaded', async () => {
  try {
    const profileUsername = document.getElementById('profile-username');
    const profilePostContainer = document.getElementById('profile-posts');

    const { name } = decodedAccessToken();

    profileUsername.innerText = name;

    const posts = await fetchUserPosts(name);

    posts.forEach((post) => {
      const postCard = createPostCard({ post, withHref: false });

      profilePostContainer.appendChild(postCard);
    });
  } catch (error) {
    console.error('Error fetching posts:', error);

    displayMessage('#profile-posts', 'alert-danger', 'There was an error fetching the posts.');
  }
});
