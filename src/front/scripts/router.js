export default function initRouter(routes) {
    function renderRoute() {
      const path = window.location.hash.slice(1) || "/";
      const renderFunction = routes[path];
      
      if (renderFunction) {
        renderFunction();
      } else {
        console.error("Route not found:", path);
      }
    }
    window.addEventListener("hashchange", renderRoute);
    renderRoute();
}