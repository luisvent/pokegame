

const API_URL = 'https://pokeapi.co/api/v2/';

const getPokemonInfo = async (pokemonId) => {
  const result = await fetch(`${API_URL}pokemon/${pokemonId}`);
  const pokemonData = await result.json();
  return pokemonData;
}


const getPokemonDescription = async (pokemonId) => {
  const result = await fetch(`${API_URL}pokemon-species/${pokemonId}`);
  const pokemonData = await result.json();
  return pokemonData;
}



export default  {
  getPokemonInfo, getPokemonDescription
}
