/**
 * Fetch a list of posts from the server.
 *
 * @param {string} [endpoint='posts'] The API endpoint to fetch the posts from.
 * @returns {Promise<Array>} A promise that resolves to an array of post objects.
 */

export async function fetchPosts(endpoint = 'posts') {
  const accessToken = localStorage.getItem('accessToken');
  const response = await fetch(
    `https://api.noroff.dev/api/v1/social/posts${
      endpoint === 'following' ? '/following' : ''
    }?_author=true&_comments=true&_reactions=true`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  return await response.json();
}

/**
 * Fetches a specific post by its ID from the server.
 *
 * @param {string|number} postId The ID of the post to be fetched.
 * @returns {Promise<Object>} A promise that resolves to the post object.
 */
export async function fetchPost(postId) {
  const accessToken = localStorage.getItem('accessToken');
  const response = await fetch(
    `https://api.noroff.dev/api/v1/social/posts/${postId}?_author=true&_reactions=true`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
  return await response.json();
}

/**
 * Send a request to delete a specific post by ID.
 *
 * @param {string|number} postId The ID of the post to be deleted.
 * @returns {Promise<void>} A promise that resolves when the post has been deleted.
 */
export async function deletePost(postId) {
  if (confirm('Are you sure you want to delete this post?')) {
    const accessToken = localStorage.getItem('accessToken');
    const response = await fetch(`https://api.noroff.dev/api/v1/social/posts/${postId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.ok) {
      window.location.reload();
    } else {
      const errorData = await response.json();
      throw new Error(`Error deleting post: ${errorData.message}`);
    }
  }
}

export async function fetchUserPosts(name) {
  const accessToken = localStorage.getItem('accessToken');
  const response = await fetch(
    `https://api.noroff.dev/api/v1/social/profiles/${name}/posts?_author=true&_reactions=true`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
  return await response.json();
}

export async function reactToPost(postId, symbol) {
  const accessToken = localStorage.getItem('accessToken');
  const response = await fetch(
    `https://api.noroff.dev/api/v1/social/posts/${postId}/react/${symbol}`,
    {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  if (response.ok) {
    const updatedPostData = await response.json();

    return updatedPostData; // Return the updated data
  } else {
    const errorData = await response.json();
    throw new Error(`Error liking post: ${errorData.message}`);
  }
}
