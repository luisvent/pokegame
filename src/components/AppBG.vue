<script setup>
import { ref } from 'vue'
import utils from '@/lib/utils.js'
import mixer from '@/lib/mixer.js'

const {screen, enableParticles} = defineProps(['screen', 'enableParticles']);
const bgsClass = ['bg-bg1-clear', 'bg-bg2-clear', 'bg-bg3-clear', 'bg-bg5', 'bg-bg6', 'bg-bg7'];
const particlesCount = 16;
const bgInterval = ref(null);
const particles = ref([]);
const sound = ref(true);
let bgClass= ref('bg-bg4-clear');

const initFloatingParticles = (particleMame, min, max, format, _class) => {
  particles.value = [];
  for(let i =0; i < particlesCount; i++) {
    particles.value.push({
      src: `/images/bg/particles/${particleMame}_${utils.getRandomNumber(min, max)}.${format}`,
      x: utils.getRandomNumber(-10, 100),
      y: utils.getRandomNumber(0, 60),
      class: 'cloud-animation-' + utils.getRandomNumber(1, 4) + ' ' + _class
    })
  }
}

const loopBG = (min, max) => {
  bgClass.value = bgsClass[min];
  bgInterval.value = setInterval(() => {
    bgClass.value = bgsClass[utils.getRandomNumber(min, max)];
  }, 5000);
}

const initIntro = () => {

}

const initMatchGame = () => {
  loopBG(0, 2);
}

const initIdentifyGame = () => {
  loopBG(3, 5);
}

const init = () => {
  clearInterval((bgInterval.value));
  bgInterval.value = null;

  switch (screen) {
    case 'intro':
      initIntro();

      if(enableParticles) {
        initFloatingParticles('cloud', 1, 8, 'png');
      }
      break;
    case 'matchgame':
      initMatchGame();

      if(enableParticles) {
        initFloatingParticles('cloud', 1, 8, 'png');
      }
      break;
    case 'identifygame':
      initIdentifyGame();

      if(enableParticles) {
        initFloatingParticles('fly', 1, 1, 'gif', 'h-[80px]');
      }
      break;
  }
}

const toggleMusic = () => {

  sound.value = !sound.value;

  if(sound.value){
    mixer.playMusic();
  } else{
    mixer.stopMusic();
  }
}

init();
</script>

<template>
  <div :class="bgClass" class="absolute top-0 -z-10 transition-all duration-1000 h-full w-full bg-cover bg-center bg-no-repeat">
  </div>
  <img @click="toggleMusic()" class="hover:scale-125 cursor-pointer absolute top-6 right-6 h-[40px]" :src="`/images/effects/${sound? 'sound_on' : 'sound_off'}.png`" />

  <template v-if="enableParticles" v-for="particle of particles">
    <img class="absolute run-animation pointer-events-none" :class="particle.class" :style="`right: ${particle.x}%; top: ${particle.y}%;`" :src="particle.src" />
  </template>

  <template v-if="screen === 'intro'">
    <img style="transform: rotateY(180deg); filter: grayscale(0.2);" class="absolute pointer-events-none bottom-20 left-20 w-50" src="/images/effects/blastoise.gif" />
  </template>

  <template v-if="screen === 'matchgame'">
  <img style="transform: rotateY(180deg);" class="absolute pointer-events-none run-animation bottom-2.5 right-0 w-28" src="/images/effects/pika_run.gif" />
  <img style="transform: rotateY(180deg);" class="absolute pointer-events-none bottom-28 left-10 w-20" src="/images/effects/bulba_jump.gif" />

</template>
</template>
