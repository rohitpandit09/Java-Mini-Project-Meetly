// Simple SPA Router in Vanilla JS
const routes = {
  "/": "pages/index.html",
  "/loginpage": "pages/loginpage.html",  // ✅ updated for login
  "/call": "pages/call.html",
  "/404": "pages/notfound.html"
};

// Load page content into #app
function navigate(path) {
  const route = routes[path] || routes["/404"];
  fetch(route)
    .then(res => res.text())
    .then(html => {
      document.getElementById("app").innerHTML = html;
    });
}

// Handle navigation
function onNavClick(event) {
  if (event.target.tagName === "A" && event.target.dataset.link) {
    event.preventDefault();
    const path = event.target.getAttribute("href");
    window.history.pushState({}, "", path);
    navigate(path);
  }
}

window.addEventListener("popstate", () => {
  navigate(window.location.pathname);
});

// Initial load
document.addEventListener("DOMContentLoaded", () => {
  document.body.addEventListener("click", onNavClick);
  navigate(window.location.pathname);
});
