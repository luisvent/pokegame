<script setup>

import MatchPlaceholder from '@/components/MatchPlaceholder.vue'
import ProgressBar from '@/components/ProgressBar.vue'
import { computed, ref } from 'vue'
import utils from '@/lib/utils.js'
import mixer from '@/lib/mixer.js'
import pokemonData from '@/assets/data/pokemon_data.json'
import interact from 'interactjs'
import SimpleButton from '@/components/SimpleButton.vue'
import SubTitle from '@/components/SubTitle.vue'

const difficulties = {
  easy: {
    tries: 3,
    pokemons: 4,
    matches: 4,
    hideClass: '',
    rangeMin: 1,
    rangeMax: 500,
    hidename: false,
    scoreMultiplier: 1,
    timer: null,
    replaceWords: null
  },
  medium: {
    tries: 2,
    pokemons: 6,
    matches: 5,
    hideClass: 'hide-gray',
    rangeMin: 400,
    rangeMax: 700,
    hidename: false,
    scoreMultiplier: 2,
    timer: null,
    replaceWords: null
  },
  hard: {
    tries: 2,
    pokemons: 9,
    matches: 6,
    hideClass: 'hide-dark',
    rangeMin: 700,
    rangeMax: 1025,
    hidename: false,
    scoreMultiplier: 3.5,
    timer: null
  },
  veryhard: {
    tries: 1,
    pokemons: 12,
    matches: 7,
    hideClass: 'hide-dark',
    rangeMin: 800,
    rangeMax: 1025,
    hidename: true,
    scoreMultiplier: 5,
    timer: 60,
    replaceWords: 'min'
  },
  extrahard: {
    tries: 1,
    pokemons: 12,
    matches: 7,
    hideClass: 'hide-extradark',
    rangeMin: 800,
    rangeMax: 1025,
    hidename: true,
    scoreMultiplier: 10,
    timer: 30,
    replaceWords: null
  }
}
const pokemons = ref([]);
const fireworks = ref([]);
const winner = ref(false);
const loser = ref(false);
const difficulty = ref('easy');
const shuffledPokemons = ref([]);
const triesAvailable = ref(0);
const userScore = ref(0);
const scoreBase = 100;
const playing = ref(false);
const timer = ref(0);
const timerInterval = ref(null);
const campaign = ref(true);
const campaignSet = {
  easy: {
    times: 3,
    tries: 1,
    next: 'medium'
  },
  medium: {
    times: 3,
    tries: 1,
    next: 'hard'
  },
  hard: {
    times: 4,
    tries: 2,
    next: 'veryhard'
  },
  veryhard: {
    times: 5,
    tries: 3,
    next: 'extrahard'
  },
  extrahard: {
    times: 6,
    tries: 2,
    next: 'easy'
  },
};
const campaignProgress = ref({
  easy: {
    times: 0,
    tries: 0
  },
  medium: {
    times: 0,
    tries: 0
  },
  hard: {
    times: 0,
    tries: 0
  },
  veryhard: {
    times: 0,
    tries: 0
  },
  extrahard: {
    times: 0,
    tries: 0
  }
});

const emit = defineEmits(['back'])

const delayAnimations = [
  'delay-0',
  'delay-75',
  'delay-100',
  'delay-150',
  'delay-200',
  'delay-300',
  'delay-500',
  'delay-700',
  'delay-1000',
];

const getDifficulty = () => {
  return difficulties[difficulty.value];
}

const shootFireworks = () => {

  const fwCount = 7;

  for(let i =0; i < fwCount; i++) {
    fireworks.value.push({
      src: `/images/effects/fw.gif`,
      x: utils.getRandomNumber(0, 100),
      y: utils.getRandomNumber(0, 20),
    })
  }
}

const celebrate = () => {
  mixer.playWin();
  winner.value = true;
  shootFireworks();
}

const lose = () => {
  mixer.playLose();
  loser.value = true;
  clearCampaign();
}

const clearCampaign = () => {
  difficulty.value = 'easy';
  campaignProgress.value = {
    easy: {
      times: 0,
      tries: 0
    },
    medium: {
      times: 0,
      tries: 0
    },
    hard: {
      times: 0,
      tries: 0
    },
    veryhard: {
      times: 0,
      tries: 0
    },
    extrahard: {
      times: 0,
      tries: 0
    }
  };
}

const nextCampaign = () => {
  if(campaignProgress.value[difficulty.value].times >= campaignSet[difficulty.value].times) {
    difficulty.value = campaignSet[difficulty.value].next;
  }
}

const calculateCampaign = () => {
  campaignProgress.value[difficulty.value].tries = triesAvailable.value;
  campaignProgress.value[difficulty.value].times += 1;

  nextCampaign();
}

const score = () => {
  mixer.playScore();
}

const missPokemon = (pokemon) => {
  mixer.playWrong();
  playing.value = false;
  pokemon.style.transform = `translate(0px, 0px)`;
  triesAvailable.value--;
}

const handleDrop = (pokemon, dropzone) => {
  if(pokemon.getAttribute('data') === dropzone.getAttribute('data')) {
    pokemons.value.find(p => p.id === parseInt(pokemon.getAttribute('data'))).matched = true;
    score();
  } else{
    missPokemon(pokemon);

    if(triesAvailable.value === 0) {
      lose();
      return;
    }
  }

  if(pokemons.value.filter(p => p.matched).length === getDifficulty().matches || pokemons.value.filter(p => p.matched).length === getDifficulty().pokemons) {
    calculateCampaign();
    addScore();
    celebrate();
  }
}

const difficultyClass = computed(() => {
  return getDifficulty().hideClass;
})

const changeDifficulty = (difficultSelected) => {
  difficulty.value = difficultSelected;
  init();
}

const addScore = () => {
  userScore.value += scoreBase * getDifficulty().scoreMultiplier;
}

const clearTimerInterval = () => {
  clearInterval(timerInterval.value);
  timerInterval.value = null;
}

const initTimer = () => {
  timer.value = getDifficulty().timer;

  timerInterval.value = setInterval(() => {

    timer.value--;

    if(timer.value === 0) {
      lose();
      clearTimerInterval()
    }
  }, 1000)
}

const goTitleScreen = () => {
  mixer.stopMatchGame();
  emit('back');
}

const init = () => {

  if(loser.value) {
    userScore.value = 0;

    if(campaign.value) {
      triesAvailable.value = 0;
      clearCampaign();
    }
  }

  playing.value = true;
  winner.value = false;
  loser.value = false;
  fireworks.value = [];
  clearTimerInterval();

  const pokemonCount = Math.max(...[getDifficulty().matches, getDifficulty().pokemons]);
  pokemons.value = [];

  do {
    const newPokemonId = utils.getRandomNumber(getDifficulty().rangeMin, getDifficulty().rangeMax);
    if(!pokemons.value.map(p => p.id).includes(newPokemonId)) {
      pokemons.value.push({
        id: newPokemonId,
        shadow: 'shadow-' + utils.getRandomNumber(1, 9),
        delay: delayAnimations[utils.getRandomNumber(0, 8)],
        name: getDifficulty().hidename? utils.replaceRandomStringChar(pokemonData[newPokemonId - 1].name, '_', getDifficulty().replaceWords ) : pokemonData[newPokemonId - 1].name,
        matched: false
      });
    }
  } while (pokemons.value.length < pokemonCount)

  shuffledPokemons.value = utils.shuffleArray([...pokemons.value]);
  shuffledPokemons.value.length = getDifficulty().matches;
  pokemons.value.length = getDifficulty().pokemons;

  if(campaign.value) {
    triesAvailable.value += campaignSet[difficulty.value].tries;
  } else{
    triesAvailable.value = getDifficulty().tries;
  }

  if(getDifficulty().timer) {
    initTimer()
  } else {
    timer.value = 0;
  }
}

init();
mixer.playMatchGame();
// region drag and drop

interact('.draggable').draggable({
  listeners: {
    start (event) {
      // console.log(event.type, event.target)
      event.type, event.target.classList.add('dragging');
    },
    move (event) {

      const reduceBy = 0.78;
      const newX = event.client.x - event.x0;
      const newY = event.client.y - event.y0;
      event.target.style.transform =
        `translate(${newX*reduceBy}px, ${newY*reduceBy}px)`
    },
  }
})

// enable draggables to be dropped into this
interact('.dropzone').dropzone({
  // only accept elements matching this CSS selector
  accept: '.draggable',
  // Require a 75% element overlap for a drop to be possible
  overlap: 0.55,

  // listen for drop related events:

  ondropactivate: function (event) {
    // add active dropzone feedback
    event.target.classList.add('drop-active')
  },
  ondragenter: function (event) {
    var draggableElement = event.relatedTarget
    var dropzoneElement = event.target

    // feedback the possibility of a drop
    dropzoneElement.classList.add('drop-target')
    draggableElement.classList.add('can-drop')
    draggableElement.textContent = 'Dragged in'
  },
  ondragleave: function (event) {
    // remove the drop feedback style
    event.target.classList.remove('drop-target')
    event.relatedTarget.classList.remove('can-drop')
    event.relatedTarget.textContent = 'Dragged out'
  },
  ondrop: function (event) {
    event.relatedTarget.textContent = 'Dropped'

    const pokemonDragged = event.relatedTarget;
    const dropzone = event.target;
    handleDrop(pokemonDragged, dropzone);
  },
  ondropdeactivate: function (event) {
    event.relatedTarget.style.transform = `translate(0px, 0px)`;
    event.relatedTarget.classList.remove('dragging')
    // remove active dropzone feedback
    event.target.classList.remove('drop-active')
    event.target.classList.remove('drop-target')
  }
})

// endregion
</script>

<template>
  <template v-for="fw of fireworks">
    <img class="absolute" :style="`right: ${fw.x}%; top: ${fw.y}%;`" :src="fw.src" />
  </template>

  <div class="absolute top-4 right-1.5 flex flex-col m-8">
    <div :class="campaign? 'pointer-events-none' : ''" class="flex flex-col justify-center items-center gap-4">
      <div  class="uppercase font-round text-amber-300 font-bold text-3xl mb-4 text-shadow-retro">
        {{ campaign? 'difficulty' : 'change difficulty' }}
      </div>
      <div class="flex-col flex justify-center items-center gap-1">
        <div @click="changeDifficulty('easy')" class="text-green-600 text-2xl cursor-pointer hover:shadow-retro" :class="difficulty === 'easy'? 'selected' : ''" >Easy</div>
        <ProgressBar v-if="campaign" :steps="campaignSet['easy'].times" :completedSteps="campaignProgress['easy'].times" :key="campaignProgress['easy'].times" ></ProgressBar>
      </div>
      <div class="flex-col flex justify-center items-center gap-1">
        <div @click="changeDifficulty('medium')" class="text-amber-300 text-2xl cursor-pointer hover:shadow-retro" :class="difficulty === 'medium'? 'selected' : ''" >Medium</div>
        <ProgressBar v-if="campaign" :steps="campaignSet['medium'].times" :completedSteps="campaignProgress['medium'].times" :key="campaignProgress['medium'].times" ></ProgressBar>
      </div>
      <div class="flex-col flex justify-center items-center gap-1">
       <div @click="changeDifficulty('hard')" class="text-red-500 text-2xl cursor-pointer hover:shadow-retro" :class="difficulty === 'hard'? 'selected' : ''" >Hard</div>
        <ProgressBar v-if="campaign" :steps="campaignSet['hard'].times" :completedSteps="campaignProgress['hard'].times" :key="campaignProgress['hard'].times" ></ProgressBar>
      </div>
      <div class="flex-col flex justify-center items-center gap-1">
      <div @click="changeDifficulty('veryhard')" class="text-red-800 text-2xl cursor-pointer hover:shadow-retro" :class="difficulty === 'veryhard'? 'selected' : ''" >Very Hard</div>
        <ProgressBar v-if="campaign" :steps="campaignSet['veryhard'].times" :completedSteps="campaignProgress['veryhard'].times" :key="campaignProgress['veryhard'].times" ></ProgressBar>
      </div>
      <div class="flex-col flex justify-center items-center gap-1">
      <div @click="changeDifficulty('extrahard')" class="text-black-800 text-2xl cursor-pointer hover:shadow-retro" :class="difficulty === 'extrahard'? 'selected' : ''" >Extra Hard</div>
        <ProgressBar v-if="campaign" :steps="campaignSet['extrahard'].times" :completedSteps="campaignProgress['extrahard'].times" :key="campaignProgress['extrahard'].times" ></ProgressBar>
      </div>
    </div>
  </div>

  <div class="absolute top-4 left-1.5 flex flex-col m-8">
    <div class="flex flex-col justify-center items-center gap-4">
      <div  class="uppercase font-round text-amber-300 font-bold text-3xl text-shadow-retro">
        tries
      </div>
      <div class="text-red-500 text-4xl text-shadow-retro">
        {{ triesAvailable }}
      </div>
      <template v-if="campaign">
        <div class="uppercase font-round text-amber-300 font-bold text-3xl mt-10 text-shadow-retro">
          score
        </div>
        <div class="text-red-500 text-6xl text-shadow-retro">
          {{ userScore }}
        </div>
      </template>
     </div>
  </div>

  <div class="flex flex-col justify-center align-middle items-center">

    <SubTitle v-if="!winner && !loser" :text="'Match the pokemon with it\'s name!'" ></SubTitle>

    <div class="w-3/4 h-full flex justify-center items-center flex-col">

      <div class="flex justify-evenly flex-wrap w-[1000px]" :class="difficulty === 'extrahard' && (!winner && !loser)? 'animate-fadeinout' : ''">
        <div v-if="!winner && !loser" class="m-20 text-center flex justify-center items-center" v-for="pokemon of pokemons" >
          <img :data="pokemon.id" v-if="!pokemon.matched" class="absolute draggable z-10 animate-scalein w-[160px] img-shadow-retro cursor-grab" :class="pokemon.shadow + ' ' + difficultyClass" :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`" />
        </div>

        <div v-else class="z-10 mt-10 mb-12 text-shadow-retro text-amber-500">
          <h1 v-if="winner" class="animate-bounce text-8xl font-uround uppercase">winner!</h1>
          <h1 v-if="loser" class="animate-fadeinout text-8xl text-red-500 font-uround uppercase">you lose</h1>
          <div class="flex justify-center items-center gap-10 my-14">
            <SimpleButton :text="'Title Screen'" :icon="'home'" @click="goTitleScreen" ></SimpleButton>
            <SimpleButton :text="loser? 'Restart' : 'Continue'" :icon="'star'" @click="init()" ></SimpleButton>
          </div>

          <div v-if="campaign" class="flex justify-center items-center flex-col gap-2">
            <SubTitle :text="'SCORE'"></SubTitle>
            <div class="text-amber-400 text-8xl">
              {{userScore}}
            </div>
          </div>
        </div>
      </div>

      <div v-if="!winner && !loser" class="grow mt-8 mb-16 opacity-85">

        <div class="text-6xl text-red-500 font-bold font-round text-shadow-retro " v-if="timer > 0">
          {{timer}}s
        </div>

        <img v-if="timer === 0" class="animate-bounce h-[50px]" :src="'/images/icons/arrow.png'" />
      </div>

      <div class="flex justify-evenly w-full mt-10 flex-wrap">
        <MatchPlaceholder :pokemons="shuffledPokemons"></MatchPlaceholder>
      </div>

    </div>

  </div>
</template>

<style scoped>

.hide-gray {
  filter: grayscale(1) !important;
}

.hide-dark {
  filter: brightness(0) !important;
}

.animate-fadeinout {
  z-index: 10;
}


.hide-extradark {
  filter: drop-shadow(7px 7px 0px black) brightness(0) !important;
}

.draggable {
  transition: all 250ms;
}

.selected {
  background-color: #ef4444;
  padding: 0px 10px;
  color: white;
}

.selected::before {
  content: '> ';
}

.draggable:hover {
  scale: 1.3;
}

.dragging {
  transition: none;
  z-index: 100;
}
</style>
