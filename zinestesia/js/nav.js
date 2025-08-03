const toggleBtn = document.getElementById("menu-toggle");
const closeBtn = document.getElementById("menu-close");
const sidebar = document.getElementById("sidebar");

toggleBtn.addEventListener("click", () => {
  sidebar.classList.add("open");
});

closeBtn.addEventListener("click", () => {
  sidebar.classList.remove("open");
});

// cerrar si clic afuera
window.addEventListener("click", (e) => {
  if (
    sidebar.classList.contains("open") &&
    !sidebar.contains(e.target) &&
    e.target !== toggleBtn
  ) {
    sidebar.classList.remove("open");
  }
});
