export async function fetchPosts() {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const response = await fetch(
      "https://api.noroff.dev/api/v1/social/posts?_author=true&_comments=true&_reactions=true",
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

export async function fetchPost(postId) {
  try {
    const accessToken = localStorage.getItem("accessToken");
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

export async function deletePost(postId) {
  if (confirm("Are you sure you want to delete this post?")) {
    const accessToken = localStorage.getItem("accessToken");

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
