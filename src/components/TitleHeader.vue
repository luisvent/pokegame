<script setup>
const {screen} = defineProps(['screen'])
</script>

<template>
<div class="flex justify-center align-middle text-white">
  <h1 :class="screen === 'intro'? 'text-amber-400' : ''" class="text-8xl text-shadow-retro font-bold font-uround">PokeGames</h1>
</div>
</template>
