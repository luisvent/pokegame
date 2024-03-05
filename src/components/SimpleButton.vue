<script setup>
import mixer from '@/lib/mixer.js'
const {icon, text} = defineProps(['text', 'icon']);
const emit = defineEmits(['click']);

const triggerClick = () => {
  mixer.playClick();
  emit('click');
}
</script>

<template>
  <button @click="triggerClick()" ><img v-if="icon" class="h-[18px]" :src="`/images/icons/${icon}.png`" /> {{ text }}</button>
</template>

<style>
button {
  @apply flex justify-center items-center gap-2.5 uppercase text-black shadow-retro bg-amber-500 py-1.5 px-3.5 hover:text-white hover:shadow-slate-100 active:shadow-none;
}
</style>
