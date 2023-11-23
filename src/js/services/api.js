/**
 * Fetch a list of posts from the server.
 *
 * @param {string} [endpoint='posts'] The API endpoint to fetch the posts from.
 * @returns {Promise<Array>} A promise that resolves to an array of post objects.
 */

const accessToken = localStorage.getItem("accessToken");

export async function fetchPosts(endpoint = "posts") {
  try {
    const response = await fetch(
      `https://api.noroff.dev/api/v1/social/posts${
        endpoint === "following" ? "/following" : ""
      }?_author=true&_comments=true&_reactions=true`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return await response.json();
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
}

/**
 * Fetches a specific post by its ID from the server.
 *
 * @param {string|number} postId The ID of the post to be fetched.
 * @returns {Promise<Object>} A promise that resolves to the post object.
 */
export async function fetchPost(postId) {
  try {
    const response = await fetch(
      `https://api.noroff.dev/api/v1/social/posts/${postId}?_author=true`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return await response.json();
  } catch (error) {
    console.error("Error fetching specific post:", error);
  }
}

/**
 * Send a request to delete a specific post by ID.
 *
 * @param {string|number} postId The ID of the post to be deleted.
 * @returns {Promise<void>} A promise that resolves when the post has been deleted.
 */
export async function deletePost(postId) {
  if (confirm("Are you sure you want to delete this post?")) {
    try {
      const response = await fetch(
        `https://api.noroff.dev/api/v1/social/posts/${postId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.ok) {
        window.location.reload();
      } else {
        // Handle errors
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  }
}

export async function fetchUserPosts(name) {
  try {
    const response = await fetch(
      `https://api.noroff.dev/api/v1/social/profiles/${name}/posts`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return await response.json();
  } catch (error) {
    console.error("Error fetching specific post:", error);
  }
}
