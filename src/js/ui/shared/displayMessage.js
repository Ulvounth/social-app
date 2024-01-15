export function displayMessage(parent, messageType, message) {
  const container = document.querySelector(parent);

  container.innerHTML = `<div class="alert ${messageType}">${message}</div>`;
}

export function clearMessage(containerSelector) {
  const container = document.querySelector(containerSelector);
  if (container) {
    container.innerHTML = '';
  }
}
