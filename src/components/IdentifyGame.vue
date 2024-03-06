<script setup>

import utils from '@/lib/utils.js'
import api from '@/lib/api.js'
import pokemonData from '@/assets/data/pokemon_data.json'
import { ref } from 'vue'
import SubTitle from '@/components/SubTitle.vue'
import SimpleButton from '@/components/SimpleButton.vue'
import mixer from '@/lib/mixer.js'

const pokemonCount = 6;
const pokemons = ref([]);
const pokemonTarget = ref({});
const languageSelected = ref('es');
const descriptions = ref({
  'es': [],
  'en': []
});

const emit = defineEmits(['back']);

const winner = ref(false);
const loser = ref(false);

const getPokemons = () => {
  pokemons.value = [];

  do {
    const newPokemonId = utils.getRandomNumber(1, 1025);

    if(!pokemons.value.map(p => p.id).includes(newPokemonId)) {
      pokemons.value.push({
        id: newPokemonId,
        shadow: 'shadow-' + utils.getRandomNumber(1, 9),
        name: pokemonData[newPokemonId - 1].name,
      });
    }
  } while (pokemons.value.length < pokemonCount)
}

const changeLanguage = (language) => {
  languageSelected.value = language;
}

const getPokemonDescription = async () => {
  const pokemonData = await api.getPokemonDescription(pokemons.value[utils.getRandomNumber(0, pokemonCount - 1)].id);
  pokemonTarget.value = pokemonData;
  descriptions.value['es'] = pokemonData['flavor_text_entries'].filter(entry => entry.language.name === 'es');
  descriptions.value['en'] = pokemonData['flavor_text_entries'].filter(entry => entry.language.name === 'en');
}

const selectPokemon = (pokemon) => {
  console.log(pokemon, pokemonTarget)
  winner.value = pokemon.id === pokemonTarget.value.id;
  loser.value = !winner.value;

  if(loser.value) {
    mixer.playWrong();
    mixer.playLose();
  } else{
    mixer.playScore();
    mixer.playWin();
  }
}

const goTitleScreen = () => {
  mixer.stopMatchGame();
  emit('back');
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
}

init();
mixer.playMatchGame();
</script>

<template>
  <div class="flex flex-col justify-center items-center">

    <SubTitle :text="'Identify the Pokemon!'"></SubTitle>
    <div class="flex z-30 justify-center gap-32 items-center">
      <div v-if="!winner && !loser" class=" my-20 text-center flex justify-center items-center" v-for="pokemon of pokemons" >
        <div class="bg-white border-4 border-amber-200 size-24 blur-md rounded-full"></div>
<!--        <div class="bg-green-950 opacity-50 absolute size-16 blur-md rounded-full"></div>-->
        <img @click="selectPokemon(pokemon)" :data="pokemon.id" class="absolute z-10 animate-scalein img-shadow-retro h-[200px] cursor-pointer hover:scale-150 transition" :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemon.id}.png`" />
<!--        <img :data="pokemon.id" class="absolute z-10 animate-scalein h-[100px] cursor-pointer hover:scale-150 transition" :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${pokemon.id}.gif`" />-->
      </div>
      <div v-else>
        <h1 v-if="winner" class="animate-bounce text-amber-500 text-8xl font-uround uppercase text-shadow-retro">winner!</h1>
        <h1 v-if="loser" class="animate-fadeinout text-8xl text-red-500 font-uround uppercase">you lose</h1>
      </div>
    </div>

    <div class="relative scale-75">
      <img class=" img-shadow-retro h-[600px]" src="/images/pokedex.png" />
      <img class="absolute animate-blink top-[58px] left-[52px] h-[50px]" src="/images/effects/pokedex_light.png" />
      <div class="size-60 bg-black absolute top-[180px] left-[85px] shadow-retro"></div>

      <img class="size-48 bg-white absolute top-[205px] left-[110px]" :class="winner? 'scale-125' : `${loser? '' : 'animate-blink'} opacity-70`" :src="winner? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemonTarget.id}.png` : '/images/icons/question_color.png'" />

      <div class="w-[300px] text-2xl text-white absolute text-shadow-small right-[55px] top-[190px]" v-if="descriptions[languageSelected].length > 0">{{descriptions[languageSelected][0]['flavor_text']}}</div>
      <div @click="changeLanguage('en')" class="text-2xl font-bold absolute right-[330px] top-[427px]" :class="languageSelected === 'en'? 'text-amber-400 text-shadow-small' : 'text-black cursor-pointer'" >En</div>
      <div @click="changeLanguage('es')" class="text-2xl font-bold absolute right-[285px] top-[427px]" :class="languageSelected === 'es'? 'text-amber-400 text-shadow-small' : 'text-black cursor-pointer '"  >Es</div>
      <div v-if="winner || loser" class="flex absolute bottom-[60px] right-[85px]">
        <SimpleButton @click="goTitleScreen()" class="mr-[70px]" :text="'Title Screen'"></SimpleButton>
        <SimpleButton @click="init()" :text="'Restart'"></SimpleButton>
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
