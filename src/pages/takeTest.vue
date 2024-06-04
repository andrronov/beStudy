<template>
   <modalComponent v-if="photoModal">
      <p @click="photoModal = null" class="absolute right-5 top-5 p-1.5 bg-white text-black">X</p>
      <img :src="photoModal" alt="answer picture" class="w-full h-full object-contain">
   </modalComponent>

  <homeTemplate v-if="testName" :title="`Test ${testName}`">
   <loading v-if="isLoading" />
   
   <div v-if="questions.length > 0" class="flex flex-col items-center justify-between h-full w-full min-h-96 px-2 overflow-y-auto">
      <p class="text-2xl text-indigo-950 font-semibold">{{questions[currentQuestion]?.question}}</p>
      <div @click.capture="openAnswer" id="answer" class="flex z-30 flex-col items-center gap-4 w-full" :class="isVisible ? 'blur-none' : 'blur-3xl bg-gray-800 min-h-44'">
         <p class="text-lg font-medium">{{questions[currentQuestion]?.answer}}</p>
         <div v-if="isVisible" class="mb-4 z-20 mt-2 flex flex-row items-center overflow-x-auto">
            <img @click.stop="openPhoto(photo)" v-for="(photo, index) in JSON.parse(questions[currentQuestion]?.img)" :key="index" :src="photo" class="object-contain max-h-72 mx-2" :alt="photo">
         </div>
      </div>

      <div class="flex flex-col items-center gap-2">
         <p @click="openAnswer" v-if="clueVisible" class="text-sm text-gray-700">Tap to check answer</p>
         <p v-if="clueVisible" class="text-sm text-gray-700">Scroll to see all pictures</p>
         <p v-if="clueVisible" class="text-sm text-gray-700">Tap on picture for closer look</p>
         <div class="flex flex-row items-center gap-6">
            <button :disabled="currentQuestion < 1" @click="currentQuestion --, isVisible = false" class="bg-indigo-800 disabled:bg-indigo-800/80 text-white p-2 rounded-xl text-xl">previous</button>
            <button :disabled="currentQuestion == (questions.length - 1)" @click="currentQuestion ++, isVisible = false" class="bg-indigo-800 disabled:bg-indigo-800/80 text-white p-2 rounded-xl text-xl">next</button>
         </div>
      </div>
   </div>
   <p v-else class="text-2xl text-red-900">This test don't have any questions</p>
  <button @click="router.push('/home')" class="bg-indigo-900 text-white p-3 rounded-xl text-2xl">Back to menu</button>
  </homeTemplate>
  
  <homeTemplate v-else>
   <p v-if="!isLoadScreen" class="text-2xl text-red-900">Test probably don't exist</p>
  <button @click="router.push('/home')" class="bg-indigo-900 text-white p-3 rounded-xl text-2xl">Back to menu</button>

  </homeTemplate>

  <loadScreen v-if="isLoadScreen" />
  <errorScreen v-if="errorLog" :error="errorLog" />
</template>

<script setup>
import homeTemplate from '../components/UI/homeTemplate.vue';
import loadScreen from '../components/UI/loadScreen.vue';
import loading from '../components/UI/loading.vue';
import errorScreen from '../components/UI/errorScreen.vue';
import modalComponent from '../components/modalComponent.vue';
import { ref, onMounted } from 'vue'
import { supabase } from '../lib/supabaseClient';
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';

const route = useRoute()
const router = useRouter()
const isLoading = ref(true)
const isLoadScreen = ref(true)
const errorLog = ref(null)
const testName = ref(null)
const questions = ref([])
const currentQuestion = ref(0)
const isVisible = ref(false)
const clueVisible = ref(true)
const photoModal = ref(null)

async function getTestQuestions(){
   const {data, error} = await supabase.from('qstn_answr').select().eq('test_id', route.params.id)
   if(!error){
      questions.value = data
      isLoading.value = false
   }else{
      isLoading.value = false
      isLoadScreen.value = false
      errorLog.value = error
   }
}

async function getTestName(){
   const {data,error} = await supabase.from('tests').select('name').eq('id', route.params.id)
   if(!error){
      isLoadScreen.value = false
      testName.value = data[0].name
   } else {
      isLoadScreen.value = false
      errorLog.value = error
   }
}

function openAnswer(){
   if(!isVisible.value){
      const isAgree = confirm('You wanna see answer?')
      if(isAgree){
         isVisible.value = true
      }
   }
}

function openPhoto(photo){
   photoModal.value = photo
}

onMounted(() => {
   getTestQuestions()
   getTestName()

   setTimeout(() => {
      clueVisible.value = false
   }, 7500)
})
</script>

<style>

</style>