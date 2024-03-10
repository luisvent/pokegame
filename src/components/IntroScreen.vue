<script setup>
import mixer from '@/lib/mixer.js'
import { ref } from 'vue'
import SimpleButton from '@/components/SimpleButton.vue'

mixer.init()
const musicPlaying = ref(false)
const welcomeMessage = ref(true);
const games = [
  {
    key: 'matchgame',
    name: 'Match Game',
    enable: true
  },
  {
    key: 'identifygame',
    name: 'Identify Pokemon',
    enable: true
  },
  {
    key: 'battlegame',
    name: 'Battle Game',
    enable: true
  }
]
const emit = defineEmits(['gameSelected']);
const {showWelcome} = defineProps(['showWelcome']);

welcomeMessage.value = showWelcome;
const playMusic = () => {
  if(!musicPlaying.value) {
  mixer.playIntroMusic();
  }
}

const start = () => {
  welcomeMessage.value = false;
  playMusic();
}

if(!showWelcome) {
  start();
}
const selectGame = (game) => {
  if(game.enable){
    mixer.stopIntroMusic();
    emit('gameSelected', game);
  }
}

</script>

<template>

  <div class="container my-14 flex flex-col justify-center items-center">
    <div class="text-4xl font-round text-red-500">
      Select a game to PLAY!
    </div>
    <div class="flex my-20 relative col-span-2 justify-center items-center">
      <img class="h-[100px] pointer-events-none absolute right-8 -top-[80px] " src="/images/effects/pika_idle.gif" />
      <div @click="selectGame(game)" :class="game.enable? 'border-red-400 hover:scale-110 cursor-pointer shadow-retro' : 'border-black'" class="transition relative size-52 text-red-600 text-5xl bg-amber-100 m-4 border-8"  v-for="game of games">

          <span v-if="game.enable" class="m-[40px] font-bold text-4xl text-shadow-small">{{game.name}}</span>
          <span v-else class="m-[40px] text-black">Coming Soon</span>



        <template v-if="game.key === 'matchgame'" >
          <img class="h-[100px] pointer-events-none absolute right-0 bottom-[0px] " src="/images/bg/poke/poke_bg_8.png" />
          <img class="h-[130px] pointer-events-none absolute right-[-15px] bottom-[10px]" src="/images/effects/amooguss.gif" />
          </template>

          <template v-else-if="game.key === 'identifygame'" >
          <img class="h-[100px] pointer-events-none absolute right-0 bottom-[0px] " src="/images/bg/poke/poke_bg_4.png" />
          <img class="animate-hithere pointer-events-none h-[90px] w-[110px] absolute right-[0px] bottom-[10px]" src="/images/effects/pokedex2.png" />
          </template>

          <template v-else-if="game.key === 'battlegame'" >
          <img class="h-[100px] absolute pointer-events-none right-0 bottom-[0px] " src="/images/bg/poke/poke_bg_2.png" />
          <img class="animate-shake h-[90px] pointer-events-none absolute right-[0px] bottom-[5px]" src="/images/effects/vs.png" />
          </template>


        </div>
    </div>

    <div class="text-4xl flex flex-col justify-center items-center text-shadow-small font-round text-red-500">
      <span class="my-3.5" >CREDITS</span>
      <div class="text-amber-400 tracking-wider flex gap-4 gap-x-8 flex-wrap justify-center mx-48 items-center text-2xl">
        <span>Giphy</span>
        <span>DevianArt</span>
        <span>Flaticon</span>
        <span>Zapsplat</span>
        <span>Pixabay</span>
        <span>Gifer</span>
        <span>Dribble</span>
        <span>khinsider</span>
        <span>Fintaman</span>
        <span>rare-gallery</span>
        <span>@WndlIght</span>
        <span>artstation</span>
        <span>imgur</span>
        <span>miguelnero</span>
        <span>furbooru</span>
        <span>wifflegif</span>
        <br>
        <br>
        <span>Pokémon and Pokémon character names are trademarks of Nintendo.</span>
      </div>
    </div>


  </div>

  <div class="text-2xl bottom-2.5 absolute w-full flex flex-col justify-center mt-4 items-center text-shadow-small font-round text-red-500">
    <span class="my-3.5" >CREATED BY</span>
    <div class="text-amber-400 flex gap-4 justify-center items-center text-3xl">
      <span>Luis Ventura</span>
      <a class="hover:scale-125 transition" href="https://github.com/luisvent"><img class="h-[25px]" src="/images/icons/github_2.png" /></a>
      <a class="hover:scale-125 transition" href="https://linkedin.com/in/luisvent"><img class="h-[30px]" src="/images/icons/linkedin.png" /></a>
    </div>
  </div>

  <div v-if="welcomeMessage" class="top-0 flex justify-center items-center bg-fixed fixed w-screen h-screen bg-[#164c9582]">
    <div class="container p-4 flex flex-col gap-4 justify-center items-center h-[350px] w-[650px] ring-8 ring-red-400 relative mx-auto bg-amber-100 ">
      <div class="text-6xl text-red-500 font-uround text-shadow-retro">
        WELCOME
      </div>
      <div class="text-center text-black text-2xl">
        Here we have some trivia POKEMON games you can play to test your pokemon knowledge.
      </div>
      <div class="text-center text-green-700 text-3xl">
        Recommended to play on DESKTOP
      </div>
      <div class="text-3xl font-round font-bold text-red-500 text-shadow-small">
        Have FUN!
      </div>

      <SimpleButton @click="start()" class="my-4" :text="`Let's Play`" ></SimpleButton>
    </div>
  </div>
</template>

<style>

</style>
