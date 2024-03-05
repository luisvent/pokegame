<script setup>

import { ref, watch } from 'vue'

const { steps, completedSteps} = defineProps(['steps', 'completedSteps']);

const step = ref([]);
for (let i =0; i < steps; i ++) {
  step.value.push({
    color: i < completedSteps? 'bg-green-500' : 'bg-transparent'
  })
}
</script>

<template>
<div v-if="steps > 0" class="flex">
  <div class="w-4 h-4 border-black border-2 " :class="s.color" v-for="s of step">
  </div>
</div>
</template>

<script>

</script>
