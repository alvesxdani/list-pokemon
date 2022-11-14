const pokemonOl = document.getElementById("pokemonList");
const btnLoad = document.getElementById("loadMoreButton");
const maxPokemons = 151;
const limit = 5;
let offset = 0;

function loadMore(offset, limit) {
  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    const newHtml = pokemons
      .map(
        (pokemon) => `
              <li class="pokemon ${pokemon.type}">
                  <span class="number">#${pokemon.order}</span>
                  <span class="name">${pokemon.name}</span>
                  <div class="detail">
                      <ol class="types">
                      ${pokemon.types
                        .map((type) => `<li class="type ${type}">${type}</li>`)
                        .join("")}
                      </ol>
                      <img src="${pokemon.photo}" alt="Imagem de um ${
          pokemon.name
        }">
                  </div>
              </li>
  `
      )
      .join("");

    pokemonOl.innerHTML += newHtml;
  });
}

loadMore(offset, limit);

btnLoad.addEventListener("click", () => {
  offset += limit

  const qtdRecordNextPage = offset + limit

  if(qtdRecordNextPage >= maxPokemons) {
    const newLimit = maxPokemons - offset
    loadMore(offset, newLimit)
    return btnLoad.style.visibility = "hidden"
  } else {
    loadMore(offset, limit)
  }

});
