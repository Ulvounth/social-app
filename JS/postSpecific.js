document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const postId = urlParams.get("postId");
  if (postId) {
    fetchSpecificPost(postId);
  }
});

async function fetchSpecificPost(postId) {
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
    const post = await response.json();
    displaySpecificPost(post);
  } catch (error) {
    console.error("Error fetching specific post:", error);
  }
}

function displaySpecificPost(post) {
  const postSpecificContainer = document.getElementById("postSpecific");
  if (postSpecificContainer) {
    postSpecificContainer.innerHTML = `
                <div class="gallery-image">
                    <h5 class="card-title">${post.title}</h5>
                    <p class="card-text">${post.body}</p>
                    <footer>
                        <small>By ${post.author.name} ${post.created}</small>
                    </footer>
                </div>
        `;
  }
}
