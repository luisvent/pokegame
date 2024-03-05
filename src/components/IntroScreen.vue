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
    name: 'Coming Soon',
    enable: false
  },
  {
    name: 'Coming Soon',
    enable: false
  },
  {
    name: 'Coming Soon',
    enable: false
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
  if(game.enabled ){
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
      <img class="h-[100px] absolute right-8 -top-[80px]" src="/images/effects/pika_idle.gif" />
      <div @click="selectGame(game)" class=" hover:scale-110 transition relative cursor-pointer size-52 text-red-600 text-5xl bg-amber-100 m-4 shadow-retro border-8 border-red-400"  v-for="game of games">

        <template v-if="game.enable"><span class="m-[40px]">{{game.name}}</span>
          <img class="h-[100px] absolute right-0 bottom-[0px] " src="/images/bg/poke/poke_bg_8.png" />
          <img class="h-[130px] absolute right-[-15px] bottom-[10px]" src="/images/effects/amooguss.gif" />
        </template>
        <div class="text-center text-black text-4xl mt-[55px]" v-else>
          {{game.name}}
        </div>

        </div>
    </div>

    <div class="text-4xl flex flex-col justify-center items-center text-shadow-small font-round text-red-500">
      <span class="my-3.5" >CREDITS</span>
      <div class="text-amber-400 flex gap-4 justify-center items-center text-2xl">
        <span>Giphy</span>
        <span>DevianArt</span>
        <span>Flaticon</span>
        <span>Zapsplat</span>
        <span>Pixabay</span>
      </div>
    </div>


  </div>

  <div class="text-2xl bottom-2.5 absolute w-full flex flex-col justify-center mt-4 items-center text-shadow-small font-round text-red-500">
    <span class="my-3.5" >CREATED BY</span>
    <div class="text-amber-400 flex gap-4 justify-center items-center text-3xl">
      <span>Luis Ventura</span>
      <a class="hover:scale-125 transition" href="https://linkedin.com/in/luisvent"><img class="h-[30px]" src="/images/icons/linkedin.png" /></a>
    </div>
  </div>

  <div v-if="welcomeMessage" class="top-0 flex justify-center items-center bg-fixed fixed w-screen h-screen bg-[#164c9582]">
    <div class="container p-4 flex flex-col gap-4 justify-center items-center h-[300px] w-[650px] ring-8 ring-red-400 relative mx-auto bg-amber-100 ">
      <div class="text-6xl text-red-500 font-uround text-shadow-retro">
        WELCOME
      </div>
      <div class="text-center text-black text-2xl">
        Here we have some trivia POKEMON games you can play to test your pokemon knowledge.
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
