async function fetchPosts() {
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
    const data = await response.json();
    displayPosts(data);
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
}

fetchPosts();

function displayPosts(posts) {
  const postsContainer = document.getElementById("posts");
  postsContainer.innerHTML = ""; // Clear previous content

  posts.forEach((post) => {
    postsContainer.innerHTML += `
          <div class="col mb-3">
                  <div class="gallery-image">
                      <h5 class="card-title">${post.title}</h5>
                      <p class="card-text">${post.body}</p>
                      <footer>
                          <small>By ${post.author.name} ${post.created}</small>
                      </footer>
                      <button onclick="viewPost(${post.id})" class="btn btn-primary mt-2">View Post</button>
                  </div>
          </div>
      `;
  });
}

function viewPost(postId) {
  window.location.href = `postSpecific.html?postId=${postId}`;
}
