import typeWeakness from '@/assets/data/type_weakness.json'
import pokemonData from '@/assets/data/pokemon_data.json'
import colors from '@/assets/data/colors.json'
import shapes from '@/assets/data/shapes.json'
import eggs from '@/assets/data/eggs.json'
import habitats from '@/assets/data/habitats.json'
import types from '@/assets/data/types.json'

const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const generateRandomColor = () => {
  const hexCharacters = [0,1,2,3,4,5,6,7,8,9,"A","B","C","D","E","F"];

  let hexColorRep = "#";

  for (let index = 0; index < 6; index++){
    const randomPosition = Math.floor ( Math.random() * hexCharacters.length )
    hexColorRep += hexCharacters[ randomPosition ]
  }

  return hexColorRep
}

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const replaceRandomStringChar = (text, replace, r) => {

  const replacements = {
    min: 0.7,
    max: 0.4
  }

  return text.split("").map(char => Math.random() > (r? (replacements[r]) : 0.5) ? replace : char).join("");
}

const vs1 = (pokemon1, pokemon2) => {
  function getTypeEffectiveness(type1, type2) {
    return typeWeakness[type1] ? typeWeakness[type1][type2] || 1 : 1;
  }

  // Function to calculate stat advantage score (simplified)
  function getStatAdvantageScore(stats1, stats2) {
    const relevantStats = ["hp", "attack", "defense", "special-attack", "special-defense", "speed"];
    let score = 0;

    for (const stat of relevantStats) {
      score += Math.max(stats1[stat] - stats2[stat], 0) / relevantStats.length;
    }

    return score;
  }

  const effectiveness = getTypeEffectiveness(pokemon1.type, pokemon2.type);
  console.log('efectiveness', effectiveness)

  // Calculate stat advantage score
  const statScore = getStatAdvantageScore(pokemon1.stats, pokemon2.stats);
  console.log('stat', statScore)
  // Combine effectiveness and stat advantage with a weighting factor
  const combinedScore = effectiveness * 0.6 + statScore * 0.4;

  // Map combined score to probability (0.5 for even chance)
  const winProb = combinedScore > 1 ? Math.min(combinedScore, 1.5) : Math.max(combinedScore, 0.5);

  return winProb;
}

const vs2 = (pokemon1, pokemon2) => {
  function calculateTypeEffectiveness(attackingTypes, defendingTypes) {
    let effectiveness = 1;
    for (const attackingType of attackingTypes) {
      for (const defendingType of defendingTypes) {
        effectiveness *= typeWeakness[attackingType][defendingType];
      }
    }
    return effectiveness;
  }

  // Calculate the total base stats for each Pokemon
  const totalBaseStats1 = pokemon1.stats.hp + pokemon1.stats.attack + pokemon1.stats.defense + pokemon1.stats['special-attack'] + pokemon1.stats['special-defense'] + pokemon1.stats.speed;
  const totalBaseStats2 = pokemon2.stats.hp + pokemon2.stats.attack + pokemon2.stats.defense + pokemon2.stats['special-attack'] + pokemon2.stats['special-defense'] + pokemon2.stats.speed;

  console.log(totalBaseStats2, totalBaseStats1);
  // Calculate the type effectiveness multipliers
  const typeEffectiveness1 = calculateTypeEffectiveness(pokemon1.types, pokemon2.types);
  const typeEffectiveness2 = calculateTypeEffectiveness(pokemon2.types, pokemon1.types);

  // Calculate the overall strength ratio
  const strengthRatio = (totalBaseStats1 * typeEffectiveness1) / (totalBaseStats2 * typeEffectiveness2);

  // Convert the strength ratio to a probability
  const winProbability = 1 / (1 + 1 / strengthRatio);

  let message;
  if (winProbability > 0.75) {
    const typeAdvantage = typeEffectiveness1 > 1 ? `Its ${pokemon1.types.join('/')} type(s) are super effective against ${pokemon2.name}'s ${pokemon2.types.join('/')} type(s), dealing increased damage.` : '';
    const strengthDifference = totalBaseStats1 > totalBaseStats2 ? `${pokemon1.name} has a significantly higher overall stat total (${totalBaseStats1}) than ${pokemon2.name} (${totalBaseStats2}), giving it an advantage in terms of HP, Attack, Defense, and overall combat prowess.` : '';
    message = `has a high chance of winning (${(winProbability * 100).toFixed(0)}%) against ${pokemon2.name} because ${strengthDifference.length > 0 ? strengthDifference + ' ' : ''}${typeAdvantage.length > 0 ? typeAdvantage + ' ' : ''}${strengthDifference.length > 0 && typeAdvantage.length > 0 ? 'and ' : ''}${strengthDifference.length === 0 && typeAdvantage.length === 0 ? 'its overall strength and type effectiveness give it a significant advantage against ' + pokemon2.name : ''}. With these factors in its favor, ${pokemon1.name} is likely to overpower and defeat ${pokemon2.name}.`;
  } else if (winProbability > 0.5) {
    const typeAdvantage = typeEffectiveness1 > 1 ? `Its ${pokemon1.types.join('/')} type(s) have an advantage over ${pokemon2.name}'s ${pokemon2.types.join('/')} type(s), allowing its attacks to deal more damage.` : '';
    const strengthDifference = totalBaseStats1 > totalBaseStats2 ? `${pokemon1.name} has higher overall stats (${totalBaseStats1}) than ${pokemon2.name} (${totalBaseStats2}), granting it an edge in combat performance.` : '';
    message = `has a good chance of winning (${(winProbability * 100).toFixed(0)}%) against ${pokemon2.name} due to ${strengthDifference.length > 0 ? strengthDifference + ' ' : ''}${typeAdvantage.length > 0 ? typeAdvantage + ' ' : ''}${strengthDifference.length > 0 && typeAdvantage.length > 0 ? 'and ' : ''}${strengthDifference.length === 0 && typeAdvantage.length === 0 ? 'its overall strength and type advantage over ' + pokemon2.name : ''}. While not an overwhelming favorite, ${pokemon1.name}'s favorable circumstances give it a decent chance of emerging victorious.`;
  } else if (winProbability > 0.25) {
    const typeAdvantage = typeEffectiveness1 > 1 ? `Its ${pokemon1.types.join('/')} type(s) are somewhat effective against ${pokemon2.name}'s ${pokemon2.types.join('/')} type(s), allowing its attacks to have some impact.` : '';
    const strengthDifference = totalBaseStats1 > totalBaseStats2 ? `${pokemon1.name} has slightly higher overall stats (${totalBaseStats1}) than ${pokemon2.name} (${totalBaseStats2}), providing a slight edge in combat ability.` : totalBaseStats2 > totalBaseStats1 ? `${pokemon2.name} has slightly higher overall stats (${totalBaseStats2}) than ${pokemon1.name} (${totalBaseStats1}), giving it a slight advantage in combat ability.` : '';
    message = `has a fair chance of winning (${(winProbability * 100).toFixed(0)}%) against ${pokemon2.name} as ${strengthDifference.length > 0 ? strengthDifference + ' ' : ''}${typeAdvantage.length > 0 ? typeAdvantage + ' ' : ''}${strengthDifference.length > 0 && typeAdvantage.length > 0 ? 'and ' : ''}${strengthDifference.length === 0 && typeAdvantage.length === 0 ? 'its overall strength and type effectiveness are not significantly better or worse than' : ''} ${pokemon2.name}'s. The battle could go either way, with neither Pokemon having a clear advantage over the other.`;
  } else {
    const typeAdvantage = typeEffectiveness2 > 1 ? `${pokemon2.name}'s ${pokemon2.types.join('/')} type(s) have an advantage over its ${pokemon1.types.join('/')} type(s), allowing its attacks to deal increased damage.` : '';
    const strengthDifference = totalBaseStats2 > totalBaseStats1 ? `${pokemon2.name} has significantly higher overall stats (${totalBaseStats2}) than ${pokemon1.name} (${totalBaseStats1}), giving it a substantial advantage in terms of HP, Attack, Defense, and overall combat prowess.` : '';
    message = `has a low chance of winning (${(winProbability * 100).toFixed(0)}%) against ${pokemon2.name} because ${strengthDifference.length > 0 ? strengthDifference + ' ' : ''}${typeAdvantage.length > 0 ? typeAdvantage + ' ' : ''}${strengthDifference.length > 0 && typeAdvantage.length > 0 ? 'and ' : ''}${strengthDifference.length === 0 && typeAdvantage.length === 0 ? 'its overall strength and type effectiveness give it a significant disadvantage against ' + pokemon2.name : ''}. With these factors working against it, ${pokemon1.name} is unlikely to overcome ${pokemon2.name}'s advantages and will likely be defeated.`;
  }

  return { probability: winProbability, message: `${pokemon1.name} ${message}` };
}

const downloadObject = (storageObj) => {

  const a = document.createElement('a');
  a.id = 'downloadAnchorElem';
  a.style = 'display: none;'
  document.body.append(a);

  var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(storageObj));
  var dlAnchorElem = document.getElementById('downloadAnchorElem');
  dlAnchorElem.setAttribute("href",     dataStr     );
  dlAnchorElem.setAttribute("download", "pokemon_data.json");
  dlAnchorElem.click();
}

const filterPokemons = (numberOfPokemonsNeeded, pokemonsObtained, iteration, type, egg, color, shape, habitat) => {
  console.log('====== iteration', iteration);
  console.log('running', numberOfPokemonsNeeded, pokemonsObtained, iteration, type, egg, color, shape, habitat);

  const filPokemons = pokemonData.filter(pokemon =>
    ( (type === null) || pokemon.types.includes(type))
    && (((egg === null || iteration > 4) || (pokemon.egg.includes(egg))))
    && (((color === null || iteration > 3) || (pokemon.color === color)))
    && (((shape === null || iteration > 2) || (pokemon.shape === shape )))
    && (((habitat === null || iteration > 1) || (pokemon.habitat === habitat)))
    && !(pokemonsObtained.map(p => p.id).includes(pokemon.id))
  );
  console.log(filPokemons);

  pokemonsObtained = pokemonsObtained.concat(filPokemons);

  if(pokemonsObtained.length >= numberOfPokemonsNeeded || iteration > 4) {
    return pokemonsObtained;
  } else {
    iteration = iteration + 1;
    return filterPokemons(numberOfPokemonsNeeded, pokemonsObtained, iteration, type,  egg,  color,  shape, habitat)
  }
}

const titlecase = (text) =>{
  return text.replace(/(^|\s)\S/g, function(t) { return t.toUpperCase() });
}

const getSimilarPokemons = (numberOfPokemons, filter) => {
  console.log(filter)
  return filterPokemons(numberOfPokemons, [], 0, filter.type, filter.egg, filter.color, filter.shape, filter.habitat);
}

const getRandomPokemonColor = () => {
  return colors[getRandomNumber(0, colors.length -1)];
}

const getRandomPokemonShape = () => {
  return shapes[getRandomNumber(0, shapes.length -1)];
}

const getRandomPokemonHabitat = () => {
  return habitats[getRandomNumber(0, habitats.length -1)];
}

const getRandomPokemonEgg = () => {
  return eggs[getRandomNumber(0, eggs.length -1)];
}

const getRandomPokemonType = () => {
  return types[getRandomNumber(0, types.length -1)];
}

export default {
  getRandomNumber,
  getRandomPokemonColor,
  getRandomPokemonShape,
  getRandomPokemonHabitat,
  getRandomPokemonEgg,
  getRandomPokemonType,
  shuffleArray,
  replaceRandomStringChar,
  getSimilarPokemons,
  titlecase,
  vs1,
  vs2 }
