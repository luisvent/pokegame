<script setup>
import TitleHeader from '@/components/TitleHeader.vue'
import AppBG from '@/components/AppBG.vue'
import MusicHanlder from '@/components/MusicHanlder.vue'
import MatchGame from '@/components/MatchGame.vue'
import IntroScreen from '@/components/IntroScreen.vue'
import { ref } from 'vue'
import IdentifyGame from '@/components/IdentifyGame.vue'
import BattleGame from '@/components/BattleGame.vue'

const screen = ref('intro');
const showWelcome = ref(true);

const selectGame = (game) => {
  screen.value = game.key;
}

const loadTitleScreen = () => {
  showWelcome.value = false;
  screen.value = 'intro';
}

</script>

<template>
  <AppBG :screen="screen" :key="screen" :enableParticles="true"></AppBG>
  <TitleHeader :screen="screen" ></TitleHeader>

  <IdentifyGame @back="loadTitleScreen" v-if="screen === 'identifygame'" ></IdentifyGame>
  <IntroScreen v-if="screen === 'intro'" :showWelcome="showWelcome" @gameSelected="selectGame"></IntroScreen>
  <MatchGame @back="loadTitleScreen" v-else-if="screen === 'matchgame'" ></MatchGame>
  <BattleGame v-else-if="screen === 'battlegame'" ></BattleGame>

</template>

<style scoped>




</style>
