<script setup>

import ProgressBar from '@/components/ProgressBar.vue'

const {enableSwitchDifficulty, difficultySelected, difficulties, campaignSet, campaignProgress, highContrast} = defineProps(['highContrast', 'enableSwitchDifficulty', 'difficultySelected', 'difficulties', 'campaignSet', 'campaignProgress']);
const emit = defineEmits(['changeDifficulty'])

const changeDifficulty = (diff) => {
  emit('changeDifficulty', diff);
}
</script>

<template>
  <div class="flex flex-col m-8">
    <div :class="!enableSwitchDifficulty? 'pointer-events-none' : ''" class="flex flex-col justify-center items-center gap-4">
      <div  class="uppercase font-round text-amber-300 font-bold text-3xl mb-4 text-shadow-retro">
        {{ !enableSwitchDifficulty? 'difficulty' : 'change difficulty' }}
      </div>

      <div class="flex-col flex justify-center items-center gap-1" :class="highContrast? 'high-contrast' : ''" v-for="difficulty of difficulties">
        <div @click="changeDifficulty(difficulty)" class="text-red-500 text-2xl cursor-pointer hover:shadow-retro capitalize" :class="difficulty === difficultySelected? 'selected' : ''" >
          {{ difficulty }}</div>
        <ProgressBar v-if="!enableSwitchDifficulty" :steps="campaignSet[difficulty].times" :completedSteps="campaignProgress[difficulty].times" :key="campaignProgress[difficulty].times" ></ProgressBar>
      </div>

    </div>
  </div>
</template>

<style>

.high-contrast {
  @apply bg-green-100 p-2
}

.selected {
  background-color: #ef4444;
  padding: 0px 10px;
  color: white;
}

.selected::before {
  content: '> ';
}

</style>
