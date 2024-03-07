

const API_URL = 'https://pokeapi.co/api/v2/';

const getPokemonInfo = async (pokemonId) => {
  const result = await fetch(`${API_URL}pokemon/${pokemonId}`);
  const pokemonData = await result.json();
  return pokemonData;
}

const getPokemonSpecies = async (pokemonId) => {
  const result = await fetch(`${API_URL}pokemon-species/${pokemonId}`);
  const pokemonData = await result.json();
  return pokemonData;
}

const getPokemonsByHabitat = async (habitat) => {
  const result = await fetch(`${API_URL}pokemon-habitat/${habitat}`);
  const pokemonData = await result.json();
  return pokemonData;
}

const getPokemonsByColor = async (color) => {
  const result = await fetch(`${API_URL}pokemon-color/${color}`);
  const pokemonData = await result.json();
  return pokemonData;
}

const getPokemonsByShape = async (shape) => {
  const result = await fetch(`${API_URL}pokemon-shape/${shape}`);
  const pokemonData = await result.json();
  return pokemonData;
}

const getPokemonsByEggGroup = async (group) => {
  const result = await fetch(`${API_URL}egg-group/${group}`);
  const pokemonData = await result.json();
  return pokemonData;
}

const getPokemonsByType = async (type) => {
  const result = await fetch(`${API_URL}egg-group/${type}`);
  const pokemonData = await result.json();
  return pokemonData;
}

const getAllPokemons = async () => {
  const speciesResponse = await fetch('https://pokeapi.co/api/v2/pokemon-species/?limit=1008');
  const speciesData = await speciesResponse.json();

  // Fetch the Pokemon data from the PokeAPI
  const pokemonPromises = speciesData.results.map(async (species) => {
    const pokemonResponse = await fetch(species.url);
    const pokemonData = await pokemonResponse.json();
    return pokemonData;
  });
  return Promise.all(pokemonPromises);
}

export default  {
  getPokemonInfo,
  getPokemonSpecies,
  getPokemonsByEggGroup,
  getPokemonsByShape,
  getPokemonsByColor,
  getPokemonsByHabitat
}
