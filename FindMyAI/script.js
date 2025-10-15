const SAMPLE_TOOLS = [
  {id:1,name:"WriteRight", tagline:"Clearer emails & blog drafts", cats:["writing","productivity"], price:"freemium", score:4.6, url:"https://writeright.ai"},
  {id:2,name:"CodeMate", tagline:"AI for faster coding", cats:["code","developer"], price:"paid", score:4.8, url:"https://codemate.ai"},
  {id:21,name:"SlideGenie", tagline:"AI-generated PowerPoint slides", cats:["presentation","ppt","design"], price:"freemium", score:4.6, url:"https://slidegenie.ai"},
  {id:22,name:"DeckBot", tagline:"Create professional decks in minutes", cats:["presentation","ppt","productivity"], price:"paid", score:4.7, url:"https://deckbot.ai"}
  // ... add other 25+ tools here
];

const ALL_TAGS = ["writing","code","design","chatbot","audio","data","translation","education","marketing","legal","health","productivity","images","analytics","customer","video","music","social media","presentation","ppt"];

const toolsDiv = document.getElementById("tools");
const queryInput = document.getElementById("query");
const priceSelect = document.getElementById("price");
const tagsDiv = document.getElementById("tags");
const resetBtn = document.getElementById("reset");

let selectedTags = [];
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

// create tag buttons
ALL_TAGS.forEach(tag=>{
  const span = document.createElement("span");
  span.textContent = tag;
  span.className = "tag";
  span.addEventListener("click", ()=>{
    span.classList.toggle("active");
    selectedTags = Array.from(tagsDiv.querySelectorAll(".tag.active")).map(t=>t.textContent);
    renderTools();
  });
  tagsDiv.appendChild(span);
});

// Event delegation for favorite buttons
toolsDiv.addEventListener("click",(e)=>{
  if(e.target.classList.contains("favorite-btn")){
    const toolDiv = e.target.closest(".tool");
    const id = parseInt(toolDiv.getAttribute("data-id"));
    if(!favorites.includes(id)) favorites.push(id);
    else favorites = favorites.filter(f=>f!==id);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    renderTools(); // re-render to update button state
  }
});

// Render tools
function renderTools(){
  const query = queryInput.value.toLowerCase();
  const price = priceSelect.value;
  const filtered = SAMPLE_TOOLS.filter(tool=>{
    let matchQuery = tool.name.toLowerCase().includes(query) || tool.tagline.toLowerCase().includes(query);
    let matchPrice = price==="any" || tool.price===price;
    let matchTags = selectedTags.every(t=>tool.cats.includes(t));
    return matchQuery && matchPrice && matchTags;
  });

  toolsDiv.innerHTML = filtered.map(t=>`
    <div class="tool" data-id="${t.id}">
      <h3>${t.name} ★${t.score}</h3>
      <p>${t.tagline} <span style="font-size:12px;opacity:0.7;">[${t.cats.join(", ")}]</span></p>
      <small>${t.price}</small>
      <div class="tool-actions">
        <button class="favorite-btn ${favorites.includes(t.id) ? 'favorited':''}">Add to Favorites</button>
        <a href="${t.url}" target="_blank">Go to Tool →</a>
      </div>
    </div>
  `).join("");
}

// Event listeners
queryInput.addEventListener("input", renderTools);
priceSelect.addEventListener("change", renderTools);
resetBtn.addEventListener("click", ()=>{
  queryInput.value="";
  priceSelect.value="any";
  tagsDiv.querySelectorAll(".tag").forEach(t=>t.classList.remove("active"));
  selectedTags=[];
  renderTools();
});

// initial render
renderTools();
