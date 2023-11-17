import { fetchPosts, deletePost } from "../services/index.js";

async function displayPosts() {
  const postsContainer = document.getElementById("posts");
  postsContainer.innerHTML = ""; // Clear previous content
  const posts = await fetchPosts();

  posts.forEach((post) => {
    const postDiv = document.createElement("div");
    postDiv.className = "col mb-3";
    postDiv.innerHTML = `
        <div class="gallery-image">
            <h5 class="card-title">${post.title}</h5>
            <p class="card-text">${post.body}</p>
            <footer>
                <small>By ${post.author.name} ${post.created}</small>
            </footer>
            <a href="post.html?postId=${post.id}" class="btn btn-primary mt-2">View Post</a>
        </div>
    `;

    // Check if the delete button should be added
    if (post.author.name.includes("Ulvounth")) {
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete Post";
      deleteButton.className = "btn btn-danger mt-2";
      deleteButton.addEventListener("click", () => deletePost(post.id));
      postDiv.querySelector(".gallery-image").appendChild(deleteButton);
    }

    postsContainer.appendChild(postDiv);
  });
}

displayPosts();
