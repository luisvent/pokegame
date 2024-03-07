<script setup>

import utils from '@/lib/utils.js'
import api from '@/lib/api.js'
import pokemonData from '@/assets/data/pokemon_data.json'
import { ref } from 'vue'
import SubTitle from '@/components/SubTitle.vue'
import SimpleButton from '@/components/SimpleButton.vue'
import mixer from '@/lib/mixer.js'
import UIButton from '@/components/UIButton.vue'
import DifficultyUI from '@/components/DifficultyUI.vue'
import ProgressInfo from '@/components/ProgressInfo.vue'

const pokemons = ref([]);
const pokemonTarget = ref({});
const languageSelected = ref('en');
const descriptions = ref({
  'es': [],
  'en': []
});

const emit = defineEmits(['back']);

const winner = ref(false);
const loser = ref(false);
const triesAvailable = ref(0);
const userScore = ref(0);
const difficulty = ref('easy');

const campaignSet = {
  easy: {
    times: 3,
    tries: 1,
    next: 'medium'
  },
  medium: {
    times: 3,
    tries: 1,
    next: 'hard'
  },
  hard: {
    times: 4,
    tries: 1,
    next: 'veryhard'
  },
  veryhard: {
    times: 5,
    tries: 1,
    next: 'extrahard'
  },
  extrahard: {
    times: 6,
    tries: 1,
    next: 'finish'
  },
};
const campaignProgress = ref({
  easy: {
    times: 0,
    tries: 0
  },
  medium: {
    times: 0,
    tries: 0
  },
  hard: {
    times: 0,
    tries: 0
  },
  veryhard: {
    times: 0,
    tries: 0
  },
  extrahard: {
    times: 0,
    tries: 0
  }
});
const difficulties = {
  easy: {
    tries: 1,
    pokemons: 3,
    filter: {
      type: false,
      shape: false,
      egg: false,
      habitat: false,
      color: false
    },
    matches: [],
    hideClass: '',
    rangeMin: 1,
    rangeMax: 1008,
    hidename: false,
    scoreMultiplier: 1,
    timer: null,
    replaceWords: null
  },
  medium: {
    tries: 1,
    pokemons: 4,
    filter: {
      type: false,
      shape: false,
      egg: false,
      habitat: true,
      color: false
    },
    matches: ['shape'],
    hideClass: 'hide-gray',
    rangeMin: 1,
    rangeMax: 1008,
    hidename: false,
    scoreMultiplier: 2,
    timer: null,
    replaceWords: null
  },
  hard: {
    tries: 1,
    pokemons: 6,
    filter: {
      type: true,
      shape: false,
      egg: false,
      habitat: true,
      color: false
    },
    matches: ['shape', 'color'],
    hideClass: 'hide-dark',
    rangeMin: 1,
    rangeMax: 1008,
    hidename: false,
    scoreMultiplier: 3.5,
    timer: null,
    replaceWords: null
  },
  veryhard: {
    tries: 1,
    pokemons: 7,
    filter: {
      type: true,
      shape: false,
      egg: false,
      habitat: true,
      color: true
    },
    matches: ['shape', 'color', 'type'],
    hideClass: 'hide-dark',
    rangeMin: 1,
    rangeMax: 1008,
    hidename: true,
    scoreMultiplier: 5,
    timer: null,
    replaceWords: 'min'
  },
  extrahard: {
    tries: 1,
    pokemons: 8,
    filter: {
      type: true,
      shape: true,
      egg: false,
      habitat: false,
      color: true
    },
    matches: ['shape', 'color', 'type', 'habitat'],
    hideClass: 'hide-extradark',
    rangeMin: 800,
    rangeMax: 1008,
    hidename: true,
    scoreMultiplier: 10,
    timer: 30,
    replaceWords: 'max'
  }
}

const getDifficulty = () => {
  return difficulties[difficulty.value];
}

const getPokemons = async () => {
  console.log(getDifficulty().filter)

  const pokemonsAvailable = utils.getSimilarPokemons(getDifficulty().pokemons, {
    type: getDifficulty().filter.type? utils.getRandomPokemonType() : null,
    shape: getDifficulty().filter.shape? utils.getRandomPokemonShape() : null,
    egg: getDifficulty().filter.egg? utils.getRandomPokemonEgg() : null,
    habitat: getDifficulty().filter.habitat? utils.getRandomPokemonHabitat(): null,
    color: getDifficulty().filter.color? utils.getRandomPokemonColor() : null,
  })

  pokemons.value = [];

  do {

  const pokemon = pokemonsAvailable[utils.getRandomNumber(0, pokemonsAvailable.length - 1)];

    if(!pokemons.value.map(p => p.id).includes(pokemon.id)) {
      pokemons.value.push({
        id: pokemon.id,
        shadow: 'shadow-' + utils.getRandomNumber(1, 9),
        name: pokemon.name,
        tried: false
      });
    }
  } while (pokemons.value.length < getDifficulty().pokemons)
}

const nextCampaign = () => {
  if(campaignProgress.value[difficulty.value].times >= campaignSet[difficulty.value].times) {

    if(campaignSet[difficulty.value].next === 'finish') {
      clearProgress();
    } else{
    difficulty.value = campaignSet[difficulty.value].next;
    }
  }
}

const clearProgress = () => {
  difficulty.value = 'easy';
  userScore.value = 0;
  triesAvailable.value = 0;
  campaignProgress.value = {
    easy: {
      times: 0,
      tries: 0
    },
    medium: {
      times: 0,
      tries: 0
    },
    hard: {
      times: 0,
      tries: 0
    },
    veryhard: {
      times: 0,
      tries: 0
    },
    extrahard: {
      times: 0,
      tries: 0
    }
  };
}

const calculateProgress = () => {
  campaignProgress.value[difficulty.value].tries = triesAvailable.value;
  campaignProgress.value[difficulty.value].times += 1;

  nextCampaign();
}

const changeLanguage = (language) => {
  languageSelected.value = language;
}

const getPokemonDescription = async () => {
  let pokemonData = await api.getPokemonSpecies(pokemons.value[utils.getRandomNumber(0, getDifficulty().pokemons - 1)].id);

  if(pokemonData['flavor_text_entries'].length === 0) {
    pokemonData = await api.getPokemonSpecies(pokemons.value[utils.getRandomNumber(0, getDifficulty().pokemons - 1)].id);
  }

  if(pokemonData['flavor_text_entries'].length === 0) {
    pokemonData = await api.getPokemonSpecies(pokemons.value[utils.getRandomNumber(0, getDifficulty().pokemons - 1)].id);
  }

  pokemonTarget.value = pokemonData;
  descriptions.value['es'] = pokemonData['flavor_text_entries'].filter(entry => entry.language.name === 'es');
  descriptions.value['en'] = pokemonData['flavor_text_entries'].filter(entry => entry.language.name === 'en');

  console.log(descriptions.value['es'])


  descriptions.value['es'] =  {
    default: descriptions.value['es'].length > 0? descriptions.value['es'][descriptions.value['es'].length - 1].flavor_text.replace(pokemonData.name, 'Este pokemon').replace(pokemonData.name.toUpperCase(), 'Este pokemon').replace(utils.titlecase(pokemonData.name), 'Este pokemon')  : 'No description available for this language.',
    hidden: descriptions.value['es'].length > 0? descriptions.value['es'][descriptions.value['es'].length - 1].flavor_text.replace(pokemonData.name, 'Este pokemon').replace(pokemonData.name.toUpperCase(), 'Este pokemon').replace(utils.titlecase(pokemonData.name), 'Este pokemon'): 'No description available for this language.'
  }

  descriptions.value['en'] =  {
    default: descriptions.value['en'].length > 0? descriptions.value['en'][descriptions.value['en'].length - 1].flavor_text.replace(pokemonData.name, 'This pokemon').replace(pokemonData.name.toUpperCase(), 'This pokemon').replace(utils.titlecase(pokemonData.name), 'This pokemon') : 'No description available for this language.',
    hidden: descriptions.value['en'].length > 0? descriptions.value['en'][descriptions.value['en'].length - 1].flavor_text.replace(pokemonData.name, 'This pokemon').replace(pokemonData.name.toUpperCase(), 'This pokemon').replace(utils.titlecase(pokemonData.name), 'This pokemon') : 'No description available for this language.'
  }


  if(getDifficulty().replaceWords) {
    ['en', 'es'].forEach(language => {
      const description = descriptions.value[language]['default'];
      const spplited = description.split(' ');
      let counter = getDifficulty().replaceWords === 'min'? 1 : 3;
      let newDescription = '';

      spplited.forEach(word => {

        if(counter > 0 && word.length > 5) {
          newDescription += '_____';
          counter--;
        } else{
          newDescription += word;
        }
        newDescription += ' ';
      })

      descriptions.value[language]['hidden'] = newDescription;
    })
  }

}

const selectPokemon = (pokemon) => {
  const matched = pokemon.id === pokemonTarget.value.id;

  if(matched) {
    winner.value = matched;
    loser.value = !winner.value;
    mixer.playScore();
    mixer.playWin();
    addScore();
    calculateProgress();
  } else{
    mixer.playWrong();
    triesAvailable.value--;
    pokemon.tried = true;

    if(triesAvailable.value === 0) {
      loser.value = !winner.value;
      userScore.value = 0;
      mixer.playLose();
      clearProgress();
    }
  }
}

const goTitleScreen = () => {
  mixer.stopMatchGame();
  emit('back');
}

const addScore = () => {
  userScore.value += 100 * getDifficulty().scoreMultiplier;
}

const init = () => {
  pokemonTarget.value = {};
  descriptions.value = {
    'es': [],
    'en': []
  };
  winner.value = false;
  loser.value = false;
  getPokemons();
  getPokemonDescription();
  triesAvailable.value += campaignSet[difficulty.value].tries;
}

init();
mixer.playMatchGame();
</script>

<template>
  <div class="flex flex-col justify-center items-center">

    <SubTitle :text="'Identify the Pokemon!'"></SubTitle>
    <UIButton @click="goTitleScreen()" class="absolute top-10 left-10":icon="'arrow_left'" :text="'Back'" ></UIButton>

    <DifficultyUI  class="absolute bottom-20 right-1.5" :high-contrast="true" :difficulties="['easy', 'medium', 'hard', 'veryhard', 'extrahard']" :campaign-progress="campaignProgress" :campaign-set="campaignSet" :difficulty-selected="difficulty" :enable-switch-difficulty="false"></DifficultyUI>

    <ProgressInfo class="absolute bottom-[250px] left-1.5" :triesAvailable="triesAvailable" :userScore="userScore" :showScore="true"></ProgressInfo>

    <div class="flex z-30 justify-center md:gap-x-16 lg:gap-x-20 gap-x-10 items-center flex-wrap">
      <div v-if="!winner && !loser" class=" my-20 text-center flex flex-wrap justify-center items-center" v-for="pokemon of pokemons" >
        <div class=" border-4 border-amber-200 size-24 blur-md rounded-full" :class="pokemon.tried? 'bg-red-400' : 'bg-white'"></div>
<!--        <div class="bg-green-950 opacity-50 absolute size-16 blur-md rounded-full"></div>-->
        <img @click="selectPokemon(pokemon)" :data="pokemon.id" class="absolute z-10 animate-scalein img-shadow-retro h-[150px] md:h-[160px] cursor-pointer hover:scale-150 transition" :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemon.id}.png`" />
<!--        <img :data="pokemon.id" class="absolute z-10 animate-scalein h-[100px] cursor-pointer hover:scale-150 transition" :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${pokemon.id}.gif`" />-->
      </div>
      <div v-else>
        <h1 v-if="winner" class="animate-bounce text-amber-500 text-8xl font-uround uppercase text-shadow-retro">winner!</h1>
        <h1 v-if="loser" class="animate-fadeinout text-8xl text-red-500 font-uround uppercase">you lose</h1>
      </div>
    </div>

    <div class="relative scale-90">
      <img class="img-shadow-retro h-[600px]" src="/images/pokedex.png" />
      <img class="absolute animate-blink top-[58px] left-[52px] h-[50px]" src="/images/effects/pokedex_light.png" />
      <div class="size-60 bg-black absolute top-[180px] left-[85px] shadow-retro"></div>
      <a target="_blank" :href="`https://www.pokemon.com/us/pokedex/${pokemonTarget.name}`" v-if="winner || loser" class="absolute bg-black top-[120px] py-0 px-3.5 cursor-pointer hover:shadow-retro left-[275px] text-white text-3xl" >MORE</a>

      <img class="size-48 bg-white absolute top-[205px] left-[110px]" :class="winner? 'scale-125' : `${loser? '' : 'animate-blink'} opacity-70`" :src="winner || loser? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemonTarget.id}.png` : '/images/icons/question_color.png'" />

      <div class="w-[300px] text-2xl text-white absolute text-shadow-small h-[210px] overflow-y-auto right-[55px] top-[190px]" >{{descriptions[languageSelected][winner || loser? 'default' : 'hidden']}}</div>
      <div @click="changeLanguage('en')" class="text-2xl font-bold absolute right-[330px] top-[427px]" :class="languageSelected === 'en'? 'text-amber-400 text-shadow-small' : 'text-black cursor-pointer'" >En</div>
      <div @click="changeLanguage('es')" class="text-2xl font-bold absolute right-[285px] top-[427px]" :class="languageSelected === 'es'? 'text-amber-400 text-shadow-small' : 'text-black cursor-pointer '"  >Es</div>
      <div v-if="winner || loser" class="flex absolute bottom-[60px] right-[85px]">
        <SimpleButton @click="goTitleScreen()" class="mr-[70px]" :text="'Title Screen'"></SimpleButton>
        <SimpleButton @click="init()" :text="winner? 'Continue' : 'Restart'"></SimpleButton>
      </div>
      <div class="absolute w-[110px] h-[70px] capitalize text-center bottom-[50px] font-bold text-2xl left-[125px]" v-if="winner">
        <div class="flex justify-center w-full h-full items-center text-wrap">
          {{pokemonTarget['name']}}
        </div>
      </div>
    </div>

  </div>

</template>

<style>

</style>
