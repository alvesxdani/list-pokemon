function convertTypes(pokemonTypes) {
  return pokemonTypes.map(
    (typeSlot) => `<li class="type">${typeSlot.type.name}</li>`
  );
}

function convertToHTML(pokemon) {
  return `
            <li class="pokemon">
                <span class="number">#${pokemon.order}</span>
                <span class="name">${pokemon.name}</span>
                <div class="detail">
                    <ol class="types">
                    ${convertTypes(pokemon.types).join("")}
                    </ol>
                    <img src="${
                      pokemon.sprites.other.dream_world.front_default
                    }" alt="Imagem de um ${pokemon.name}" srcset="">
                </div>
            </li>
  `;
}

const pokemonOl = document.getElementById("pokemonList");

pokeApi.getPokemons().then((pokemonList = []) => {
  pokemonOl.innerHTML += pokemonList.map(convertToHTML).join("");
});
