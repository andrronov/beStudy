<template>
   <div v-if="questions.length > 0" class="flex flex-col items-center justify-between h-full w-full min-h-96 px-2 overflow-y-auto">
      <p class="text-2xl text-indigo-950 font-semibold">{{questions[currentQuestion]?.question}}</p>
      <div @click.capture="$emit('openAnswer')" id="answer" class="flex z-30 flex-col items-center gap-4 w-full" :class="isVisible ? 'blur-none' : 'blur-3xl bg-gray-800 min-h-44'">
         <p class="text-lg font-medium">{{questions[currentQuestion]?.answer}}</p>
         <div v-if="isVisible" class="mb-4 z-20 mt-2 flex flex-row items-center overflow-x-auto">
            <img @click.stop="$emit('openPhoto', photo)" v-for="(photo, index) in JSON.parse(questions[currentQuestion]?.img)" :key="index" :src="photo" class="object-contain max-h-72 mx-2" :alt="photo">
         </div>
      </div>

      <div class="flex flex-col items-center gap-2">
         <div class="p-2 border-2 border-red-500" v-for="(variant, index) in JSON.parse(questions[currentQuestion].variants).answers" :key="index">{{variant}}</div>
         <p @click="$emit('openAnswer')" v-if="clueVisible" class="text-sm text-gray-700">Tap to check answer</p>
         <p v-if="clueVisible" class="text-sm text-gray-700">Scroll to see all pictures</p>
         <p v-if="clueVisible" class="text-sm text-gray-700">Tap on picture for closer look</p>
         <div class="flex flex-row items-center gap-6">
            <button :disabled="currentQuestion < 1" @click="$emit('prevQuestion')" class="bg-indigo-800 disabled:bg-indigo-800/80 text-white p-2 rounded-xl text-xl">previous</button>
            <button :disabled="currentQuestion == (questions.length - 1)" @click="$emit('nextQuestion')" class="bg-indigo-800 disabled:bg-indigo-800/80 text-white p-2 rounded-xl text-xl">next</button>
         </div>
      </div>
   </div>
</template>

<script setup>
import {defineProps} from 'vue';

const props = defineProps({
   questions: {type: Array},
   clueVisible: {type: Boolean, default: false},
   currentQuestion: {type: Number, default: 0},
   isVisible: {type: Boolean, default: false}
})
</script>

<style>

</style>