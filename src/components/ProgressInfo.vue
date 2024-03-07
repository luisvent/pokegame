<script setup>

const { triesAvailable, userScore, showScore } = defineProps(['triesAvailable', 'userScore', 'showScore']);

</script>

<template>
  <div class="flex flex-col m-8">
    <div class="flex flex-col justify-center items-center gap-4">
      <div  class="uppercase font-round text-amber-300 font-bold text-3xl text-shadow-retro">
        tries
      </div>
      <div class="text-red-500 text-4xl text-shadow-retro">
        {{ triesAvailable }}
      </div>
      <template v-if="showScore">
        <div class="uppercase font-round text-amber-300 font-bold text-3xl mt-10 text-shadow-retro">
          score
        </div>
        <div class="text-red-500 text-6xl text-shadow-retro">
          {{ userScore }}
        </div>
      </template>
    </div>
  </div>
</template>

<style>

</style>
