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
  <div class="ui-button text-shadow-small" @click="triggerClick()" ><img v-if="icon" class="h-[38px]" :src="`/images/icons/${icon}.png`" /> {{ text }}</div>
</template>

<style>
.ui-button {
  @apply flex justify-center items-center gap-2.5 uppercase text-amber-400 hover:text-amber-500 cursor-pointer py-1.5 text-3xl px-3.5 hover:scale-125 active:shadow-none;
}
</style>
