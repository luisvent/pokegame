<script setup>
import TitleHeader from '@/components/TitleHeader.vue'
import AppBG from '@/components/AppBG.vue'
import MusicHanlder from '@/components/MusicHanlder.vue'
import MatchGame from '@/components/MatchGame.vue'
import IntroScreen from '@/components/IntroScreen.vue'
import { ref } from 'vue'

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
  <AppBG :screen="screen" :key="screen" :enableClouds="true"></AppBG>
  <TitleHeader :screen="screen" ></TitleHeader>


  <IntroScreen v-if="screen === 'intro'" :showWelcome="showWelcome" @gameSelected="selectGame"></IntroScreen>
  <MatchGame @back="loadTitleScreen" v-else-if="screen === 'matchgame'" ></MatchGame>
</template>

<style scoped>




</style>
