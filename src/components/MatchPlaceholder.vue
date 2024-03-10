<script setup>

import utils from '@/lib/utils.js'

const {pokemons} =defineProps(['pokemons'])


const randomBgNumber = () => {
  return utils.getRandomNumber(1, 14);
}

</script>

<template>
  <div class=" relative 2xl:size-[170px] xl:size-[130px] lg:size-[120px] size-[100px] text-center flex justify-center items-center" v-for="pokemon of pokemons" >
    <img :data="pokemon.id" class="absolute pointer-events-none dropzone opacity-50 img-shadow-retro size-full" :src="'/images/bg/poke/poke_bg_' + randomBgNumber() + '.webp'" />
    <img v-if="!pokemon.matched" class="absolute pointer-events-none img-shadow-retro opacity-85 size-1/2" :src="'/images/icons/question_blank.png'" />
    <img v-else class="animate-scalein absolute pointer-events-none img-shadow-retro -top-10" :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemon.id}.png`" />
    <div style="text-shadow: 3px 3px white" class="absolute capitalize pointer-events-none font-round text-2xl lg:text-3xl text-rose-500 -bottom-24 w-full">
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
