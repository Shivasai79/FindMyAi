const favoritesDiv = document.getElementById("favorites");
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

const SAMPLE_TOOLS = [
  // same 25+ tools here
];

function renderFavorites() {
  if (favorites.length === 0) {
    favoritesDiv.innerHTML = "<p>No favorites yet.</p>";
    return;
  }
  favoritesDiv.innerHTML = favorites.map(id => {
    const tool = SAMPLE_TOOLS.find(t=>t.id===id);
    return `
      <div class="favorite-tool">
        <a href="${tool.url}" target="_blank">${tool.name}</a>
        <button class="favorite-btn favorited" onclick="removeFavorite(${tool.id})">❌</button>
      </div>
    `;
  }).join("");
}

function removeFavorite(id){
  favorites = favorites.filter(f=>f!==id);
  localStorage.setItem("favorites", JSON.stringify(favorites));
  renderFavorites();
}

renderFavorites();
