const pokemonAPI = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/";
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const form = document.querySelector("form");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    fetchData();
    searchInput.value = "";
    });

const fetchData = async () => {
  try {
    let pokemonNameOrId = searchInput.value.toLowerCase();
    const res = await fetch(pokemonAPI);
    const data = await res.json();
    console.log("🚀 ~ fetchData ~ data:", data);

    const pokemon = data.results.find(
      (p) =>
        p.name === pokemonNameOrId ||
        p.url.includes(pokemonNameOrId) ||
        p.id === pokemonNameOrId
    );

    if (pokemon) {
      const pokemonRes = await fetch(pokemon.url);
      const pokemonData = await pokemonRes.json();
      console.log("🚀 ~ fetchData ~ pokemonData:", pokemonData);

      showOutput(pokemonData);
    } else {
      alert("Pokémon not found");
    }
  } catch (error) {
    console.log(error);
  }
};

const showOutput = (pokemonData) => {

  const pokemonImg = pokemonData.sprites.front_default;
  const imgElement = document.getElementById("pokemon-sprite");
  imgElement.src = pokemonImg;
  imgElement.style.display = "block";

  document.getElementById("pokemon-name").textContent = pokemonData.name.toUpperCase();
  document.getElementById("pokemon-id").textContent = "#0" + pokemonData.id;
  document.getElementById("pokemon-height").textContent = "Height: " +
    pokemonData.height;
  document.getElementById("pokemon-weight").textContent = "Weight: " + pokemonData.weight;

  let types = document.getElementById("pokemon-types");
  types.innerHTML = '';

pokemonData.types.forEach(typeInfo => {
    const typeName = typeInfo.type.name;
    const typeSpan = document.createElement('span');
    typeSpan.textContent = typeName.toUpperCase();
    typeSpan.classList.add('type', typeName); 
    types.appendChild(typeSpan);
  });

  document.getElementById("hp").textContent = pokemonData.stats[0].base_stat;
  document.getElementById("attack").textContent = pokemonData.stats[1].base_stat;
  document.getElementById("defense").textContent = pokemonData.stats[2].base_stat;
  document.getElementById("special-attack").textContent = pokemonData.stats[3].base_stat;
  document.getElementById("special-defense").textContent = pokemonData.stats[4].base_stat;
  document.getElementById("speed").textContent = pokemonData.stats[5].base_stat;

  let table = document.getElementById("pokemon-stats-table");
  table.style.display = "block";
};




