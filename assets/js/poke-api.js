const pokeApi = {};

function convertPokeApiDetail(pokeDetail) {
  const pokemon = new Pokemon()
  pokemon.name = pokeDetail.name
  pokemon.order = pokeDetail.id

  const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)

  const [type] = types
  pokemon.types = types
  pokemon.type = type
  
  pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

  return pokemon
}

pokeApi.getPokemonDetail = async (pokemon) => {
  const response = await fetch(pokemon.url);
  const pokeDetail = await response.json();
  return convertPokeApiDetail(pokeDetail);
};

pokeApi.getPokemons = async (offset = 0, limit = 5) => {
  const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

  try {
    const response = await fetch(url);
    const jsonBody = await response.json();
    const pokemons = jsonBody.results;
    const detailRequests = pokemons.map(pokeApi.getPokemonDetail);
    const pokemonsDetails = await Promise.all(detailRequests);
    return pokemonsDetails;
  } catch (error) {
    return console.log(error);
  }
}
