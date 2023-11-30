import { logout } from '../auth/index.js';

export function createNavigation() {
  return `
      <nav class="container">
      <!-- Icons and links -->
      <a href="/pages/feed" class="icon-link">
          <i class="fa-solid fa-house"></i>
      </a>
      <a href="#" class="icon-link">
          <i class="fa-solid fa-square-plus" id="createPost"></i>
      </a>
      <div class="icon-link dropdown">
          <a href="#" class="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown"
          aria-expanded="false">
          <i class="fa-solid fa-user"></i>
          </a>
          <!-- Dropdown Menu -->
          <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
          <li>
              <a class="dropdown-item" href="/pages/profile">Profile</a>
          </li>
          <li>
              <a class="dropdown-item" href="/settings/index.html">Settings</a>
          </li>
          <li>
              <hr class="dropdown-divider" />
          </li>
          <!-- Divider line -->
          <li>
              <button class="dropdown-item" id="logout">Log out</button>
          </li>
          </ul>
      </div>
      </nav>
  `;
}

document.getElementById('header').innerHTML = createNavigation();
document.getElementById('logout').addEventListener('click', logout);
