<script setup>
import { ref } from 'vue'
import utils from '@/lib/utils.js'

const {screen, enableClouds} = defineProps(['screen', 'enableClouds']);
const bgsClass = ['bg-bg1-clear', 'bg-bg2-clear', 'bg-bg3-clear'];
const cloudsCount = 16;
const clouds = ref([]);
let bgClass= ref('bg-bg4-clear');

const initIntro = () => {

}

const initClouds = () => {
  clouds.value = [];
  for(let i =0; i < cloudsCount; i++) {
    clouds.value.push({
      cloud: '/src/assets/images/bg/clouds/cloud_' + utils.getRandomNumber(1, 8) + '.png',
      x: utils.getRandomNumber(-10, 100),
      y: utils.getRandomNumber(0, 60),
      animation: 'cloud-animation-' + utils.getRandomNumber(1, 4)
    })
  }
}

const initMatchGame = () => {
  setInterval(() => {
    bgClass.value = bgsClass[(Math.floor(Math.random() * bgsClass.length))];
  }, 5000);

}

const init = () => {
  switch (screen) {
    case 'intro':
      initIntro();
      break;
    case 'matchgame':
      initMatchGame();
      break;
  }

  if(enableClouds) {
    initClouds();
  }
}

init();
</script>

<template>
  <div :class="bgClass" class="absolute top-0 -z-10 transition-all duration-1000 h-full w-full bg-cover bg-center bg-no-repeat">
  </div>
<!--  <img class="absolute bottom-0" src="/src/assets/images/bicycle.gif" />-->

  <template v-if="enableClouds" v-for="cloud of clouds">
    <img class="absolute run-animation" :class="cloud.animation" :style="`right: ${cloud.x}%; top: ${cloud.y}%;`" :src="cloud.cloud" />
  </template>

  <template v-if="screen === 'matchgame'">
  <img style="transform: rotateY(180deg);" class="absolute run-animation bottom-2.5 right-0 w-28" src="/src/assets/images/effects/pika_run.gif" />
  <img style="transform: rotateY(180deg);" class="absolute bottom-28 left-10 w-20" src="/src/assets/images/effects/bulba_jump.gif" />

</template>
</template>
