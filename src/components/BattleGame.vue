<script setup>

import SubTitle from '@/components/SubTitle.vue'
import { ref } from 'vue'
import utils from '@/lib/utils.js'
import api from '@/lib/api.js'
import SimpleButton from '@/components/SimpleButton.vue'
import mixer from '@/lib/mixer.js'
import UIButton from '@/components/UIButton.vue'

const pokemon1 = ref(null);
const pokemon2 = ref(null);
const selection = ref(null);
const winnerEval = ref(null);

const emit = defineEmits(['back']);

const selectPokemon = (pokemon) => {
  selection.value = pokemon;
  console.log(selection.value)
  console.log(winnerEval.value)

  if(selection.value.id === winnerEval.value.pokemon.id) {
    mixer.playWin();
  } else{
    mixer.playLose();
  }
}

const goTitleScreen = () => {
  mixer.stopBattleGameMusic();
  emit('back');
}

const getPokemons = async () => {

  function clearPokemonData(pokemon) {
    const pokemonCleared = ref({
      id: 0,
      name: '',
      img: '',
      stats: {},
      types: []
    });

    pokemonCleared.value.types = pokemon['types'].map(t => t.type.name);
    pokemonCleared.value.name = utils.titlecase(pokemon.name);
    pokemonCleared.value.img = pokemon.sprites.other.home.front_default;
    pokemonCleared.value.id = pokemon.id;
    pokemon['stats'].forEach(s => {
      pokemonCleared.value.stats[s.stat.name] = s['base_stat']
    })

    return pokemonCleared.value;
  }

  const pokemon1Id = utils.getRandomNumber(1, 1025);
  const pokemon2Id = utils.getRandomNumber(1, 1025);

  const [response1, response2] = await Promise.all([
    api.getPokemonInfo(pokemon1Id),
    api.getPokemonInfo(pokemon2Id),
  ]);

  pokemon1.value = response1;
  pokemon2.value = response2;

  const eval1 = utils.calcWinProbability(clearPokemonData(pokemon1.value), clearPokemonData(pokemon2.value));
  const eval2 = utils.calcWinProbability(clearPokemonData(pokemon2.value), clearPokemonData(pokemon1.value));

  if(eval1.probability >= eval2.probability) {
    winnerEval.value = eval1;
  } else{
    winnerEval.value = eval2;
  }
}

const init = () => {
  pokemon1.value = null;
  pokemon2.value = null;
  selection.value = null;
  winnerEval.value = null;

  getPokemons();
}

init();
  mixer.playBattleGameMusic();
</script>

<template>
  <SubTitle class="w-full text-center" :text="'Select your winner POKEMON'"></SubTitle>

  <UIButton @click="goTitleScreen()" class="absolute top-10 left-10":icon="'arrow_left'" :text="'Back'" ></UIButton>

  <img style="transform: rotateY(180deg)" src="/images/effects/pikachu_fly.gif" class="left-1/4 top-0 absolute w-[100px]" />

  <div class="flex w-full h-3/4">
    <div style="transform: rotateY(180deg)" class="w-1/4 flex flex-col flex-wrap gap-12">

      <div class="size-4">
        <img src="/images/effects/pidgeotto.gif" class="absolute w-[200px]" />
      </div>

      <div class="size-4">
        <img src="/images/effects/latios2.gif" class="absolute mx-40 h-56 object-contain" />
      </div>

      <div class="size-4">
        <img src="/images/effects/charmander.gif" class="absolute h-24 object-contain animate-slide-in-left animate-iteration-count-infinite" />
      </div>

      <div class="size-4">
        <img src="/images/effects/chandelure.gif" class="absolute mx-40 h-56 object-contain" />
      </div>

      <div class="size-4">
        <img src="/images/effects/pidgey.gif" class="absolute h-44 object-contain" />
      </div>

      <div class="size-4">
        <img src="/images/effects/sandrewsh.gif" class="absolute animate-squeeze animate-iteration-count-infinite mx-44 h-36 object-contain" />
      </div>

      <div class="size-4">
        <img src="/images/effects/charizard.gif" class="absolute h-52 object-contain animate-jump animate-iteration-count-infinite" />
      </div>

      <div class="size-4">
        <img src="/images/effects/scizor.gif" class="absolute animate-squeeze animate-iteration-count-infinite mx-44 h-36 object-contain" />
      </div>

      <div class="size-4">
        <img src="/images/effects/totodile.gif" class="absolute h-52 object-contain animate-slide-out-left animate-iteration-count-infinite" />
      </div>
    </div>
    <div class="w-1/2 flex flex-col justify-center items-center" >
      <div></div>
      <div v-if="selection" >
        <div class="flex flex-col justify-center items-center">

          <img class="fighter img-shadow-retro h-56 animate-jump animate-iteration-count-infinite" :src="winnerEval.pokemon.img" />
          <div class="uppercase text-8xl text-amber-400 font-uround text-shadow-small animate-jump animate-iteration-count-infinite">{{selection.id === winnerEval.pokemon.id? 'winner' : 'you lose!'}}</div>

          <div class="flex justify-center items-center mt-8 gap-10">
            <SimpleButton :text="'Title Screen'" :icon="'home'" @click="goTitleScreen" ></SimpleButton>
            <SimpleButton :text="'Restart'" :icon="'star'" @click="init()" ></SimpleButton>
          </div>

          <div class="text-2xl max-h-52 overflow-auto p-6 m-6 text-black bg-amber-100 border-4 border-red-500">
            {{winnerEval.message}}
          </div>

        </div>
      </div>
      <div v-else class="hover:scale-105 transition flex justify-center items-center">
        <div v-if="pokemon1" class="relative hover:scale-125 transition flex flex-col justify-center items-center">

            <img @click="selectPokemon(pokemon1)" class="fighter img-shadow-retro h-72 cursor-pointer animate-jump animate-iteration-count-infinite" :src="pokemon1.sprites.other.home.front_default" />

          <div class="text-4xl text-center text-red-500 text-shadow-small uppercase">
            {{pokemon1.name}}
          </div>
        </div>
        <img class="h-32 animate-shake" src="/images/effects/vs.png" />
        <div v-if="pokemon2" class="relative transition hover:scale-125 flex flex-col justify-center items-center">
          <img @click="selectPokemon(pokemon2)" class="fighter img-shadow-retro h-72 cursor-pointer animate-jump animate-iteration-count-infinite" :src="pokemon2.sprites.other.home.front_default" />
          <div class="text-4xl text-center text-red-500 text-shadow-small uppercase">
            {{ pokemon2.name }}
          </div>
        </div>
      </div>
      <div></div>
    </div>
    <div class="w-1/4 flex flex-col flex-wrap gap-12">
      <div class="size-4">
        <img src="/images/effects/raichu.gif" class="absolute w-[200px]" />
      </div>

      <div class="size-4">
        <img src="/images/effects/cindaquil.gif" class="absolute mx-40 h-36 object-contain animate-jump animate-iteration-count-infinite" />
      </div>

      <div class="size-4">
        <img src="/images/effects/fearow.gif" class="absolute h-64 object-contain animate-slide-in-left animate-iteration-count-infinite" />
      </div>

      <div class="size-4">
        <img src="/images/effects/latios2.gif" class="absolute mx-40 h-52 object-contain animate-slide-in-left animate-iteration-count-infinite" />
      </div>

      <div class="size-4">
        <img src="/images/effects/pidgey.gif" class="absolute h-32 object-contain" />
      </div>

      <div class="size-4">
        <img src="/images/effects/sandrewsh.gif" class="absolute animate-squeeze animate-iteration-count-infinite mx-52 h-40 object-contain" />
      </div>

      <div class="size-4">
        <img src="/images/effects/snorlax.gif" class="absolute h-52 object-contain" />
      </div>

      <div class="size-4">
        <img src="/images/effects/scyther.gif" class="absolute animate-squeeze animate-iteration-count-infinite mx-52 h-40 object-contain" />
      </div>

      <div class="size-4">
        <img src="/images/effects/arcanine.gif" class="absolute h-44 object-contain" />
      </div>
    </div>
  </div>
</template>

<style>
.fighter:hover {
  animation-duration: 500ms !important;
}
</style>
