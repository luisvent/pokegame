<script setup>

import utils from '@/lib/utils.js'

const {pokemons} =defineProps(['pokemons'])


const randomBgNumber = () => {
  return utils.getRandomNumber(1, 14);
}

</script>

<template>
  <div class=" relative min-h-28 min-w-28 w-[200px] text-center flex justify-center items-center" v-for="pokemon of pokemons" >
    <img :data="pokemon.id" class="absolute dropzone opacity-50 img-shadow-retro h-[200px]" :src="'/images/bg/poke/poke_bg_' + randomBgNumber() + '.png'" />
    <img v-if="!pokemon.matched" class="absolute img-shadow-retro opacity-85 h-[100px]" :src="'/images/icons/question_blank.png'" />
    <img v-else class="animate-scalein absolute w-[200px] img-shadow-retro -top-20" :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemon.id}.png`" />
    <div style="text-shadow: 3px 3px white" class="absolute capitalize font-round text-4xl text-rose-500 -bottom-24 w-full">
      {{ pokemon.name }}
    </div>
  </div>
</template>

<style>
.drop-target {
  opacity: 1;
}

.dropzone {
  transition: all 250ms;
}

.drop-active {
  scale: 1.1;
}
</style>
