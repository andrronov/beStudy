<template>
   <modalComponent v-if="photoModal">
      <p @click="photoModal = null" class="absolute right-5 top-5 p-1.5 bg-white text-black">X</p>
      <img :src="photoModal" alt="answer picture" class="w-full h-full object-contain">
   </modalComponent>
   <modalComponent v-if="isShowResult">
      <div class="flex flex-col items-center gap-5">
         <p class="text-2xl font-bold">Your result: {{result}} right answers from {{questions.length}} questions</p>
        <button @click="router.push('/home')" class="bg-white text-indigo-900 p-1.5 rounded-xl text-2xl">Back to menu</button>
      </div>
   </modalComponent>

  <homeTemplate v-if="testName" :title="`Test ${testName}`">
   <loading v-if="isLoading" />
   
   <easyTestType v-if="isTestEasy" :questions="questions" :clueVisible="clueVisible" :currentQuestion="currentQuestion" :isVisible="isVisible"
      @open-answer="openAnswer" @open-photo="openPhoto" @prev-question="currentQuestion --, isVisible = false" @next-question="currentQuestion ++, isVisible = false"
   />
   <defTestType v-else :questions="questions" :clueVisible="clueVisible" :currentQuestion="currentQuestion" :isVisible="isVisible" :userAnswer="questions[currentQuestion]?.userAnswer"
   @open-answer="openAnswer" @open-photo="openPhoto" @prev-question="currentQuestion --, isVisible = false, userAnswer = null" @next-question="currentQuestion ++, isVisible = false, userAnswer = null"
   @write-answer="writeAnswer" @end-test="endTest"
   />
   
   <p v-if="questions.length < 1" class="text-2xl text-red-900">This test don't have any questions</p>
  <button @click="router.push('/home')" class="bg-indigo-900 text-white p-2 rounded-xl text-2xl">Back to menu</button>
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
import easyTestType from '../components/easyTestType.vue'
import defTestType from '../components/defTestType.vue'
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
const isTestEasy = ref(false)
const currentQuestion = ref(0)
const isVisible = ref(false)
const clueVisible = ref(true)
const photoModal = ref(null)
const userAnswer = ref(null)
const result = ref(0)
const isShowResult = ref(false)

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

async function getTestNameAndType(){
   const {data,error} = await supabase.from('tests').select('name, is_default').eq('id', route.params.id)
   if(!error){
      isTestEasy.value = data[0].is_default
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

function writeAnswer(answer){
   userAnswer.value = answer
   questions.value[currentQuestion.value].userAnswer = answer
}

function endTest(answers){
   result.value = answers
   isShowResult.value = true
}

function openPhoto(photo){
   photoModal.value = photo
}

onMounted(() => {
   getTestQuestions()
   getTestNameAndType()

   setTimeout(() => {
      clueVisible.value = false
   }, 7500)
})
</script>

<style>

</style>