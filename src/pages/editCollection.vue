<template>
   <modalComponent v-if="isModalAddQuestion" class="flex flex-col items-center">
   
      <div v-if="isTestDefault">
         def test
      </div>

      <div v-else class="flex flex-col w-full max-w-7xl px-2 items-center h-full justify-center gap-5 overflow-y-auto">
         <div class="w-full text-center flex flex-col items-center gap-2">
            <label for="question" class="text-xl font-semibold">Question</label>
            <textarea v-model="form.question" rows="2" type="text" class="w-full rounded-xl p-1 text-black" />
         </div>
         <div class="w-full text-center flex flex-col items-center gap-2">
            <label for="answer" class="text-xl font-semibold">Answer</label>
            <textarea v-model="form.answer" rows="3" type="text" class="w-full rounded-xl p-1 text-black" />
            <div class="w-full flex flex-col mt-4">
               <label @change="addPhoto" for="photo" class="text-xl font-semibold">
                Photo
                <div class="flex flex-col gap-2">
                  <input class="my-4 cursor-pointer" type="file" />
                  <loading class="my-4" v-if="imgLoad" />
                  <img v-if="form.photo" :src="form.photo" class="my-4" alt="photo preview">
                </div>
                <button @click="form.photo = null" type="button" class="rounded-xl p-2 bg-indigo-600 text-white text-xl">Delete</button>
               </label>
             </div>
            <!-- <input type="file" class="rounded-xl p-2 bg-indigo-600 text-white text-xl mt-4" /> -->
         </div>
         <button @click="addQuestion" class="rounded-xl p-2 bg-white text-indigo-600 text-2xl">Add question</button>
         <p v-bind="errorLog" class="text-lg text-red-500">{{ errorLog }}</p>
         <button @click="isModalAddQuestion = false" class="rounded-xl p-2 bg-indigo-600 text-white text-xl absolute bottom-6">Back</button>
      </div>

   </modalComponent>

  <homeTemplate :title="'Edit'">
   <loading v-if="isLoading" />

   <div v-if="typeof questions == 'object' && questions?.length > 0 || isLoading" class="w-full max-w-7xl flex flex-col overflow-y-auto items-center gap-5 px-2">
      <div v-for="question in questions" :key="question.id" class="w-full rounded-xl flex flex-col items-center justify-between bg-gradient-to-b text-white from-indigo-700 via-blue-500 to-indigo-600">
         <div class="flex flex-row w-full items-center justify-between p-2 text-xl">
            <div class="flex flex-col items-start">
               <p>q: {{ question.question }}</p>
               <p>a: {{ question.answer }}</p>
            </div>
            <img :src="question.img" class="w-auto h-14 object-contain" alt="">
         </div>
         <div class="flex flex-row items-center w-full justify-around bg-white text-indigo-900 py-2 rounded-b-xl">
               <TrashIcon class="sm:w-10 sm:h-10 w-8 h-8" />
               <PencilSquareIcon class="sm:w-10 sm:h-10 w-8 h-8" />
         </div>
      </div>
   </div>
   <div v-else>
      <p class="text-lg font-semibold">Don't any questions yet</p>
   </div>

   <button @click="isModalAddQuestion = true" class="rounded-xl p-2 bg-indigo-600 text-white text-xl hover:bg-indigo-700">Add question</button>
   <button @click="router.push('/collection')" class="rounded-xl p-2 bg-indigo-600 text-white text-xl hover:bg-indigo-700">Back</button>
  </homeTemplate>

  <loadScreen v-if="loadingScreen" />
</template>

<script setup>
import homeTemplate from '../components/UI/homeTemplate.vue';
import modalComponent from '../components/modalComponent.vue';
import loading from '../components/UI/loading.vue';
import loadScreen from '../components/UI/loadScreen.vue';
import { PencilSquareIcon, TrashIcon } from '@heroicons/vue/24/solid'
import { supabase } from '../lib/supabaseClient';
import { onMounted, ref, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const form = reactive({
   question: '',
   answer: '',
   photo: null
})
const router = useRouter()
const route = useRoute()
const isLoading = ref(true)
const imgLoad = ref(false)
const questions = ref(null)
const errorLog = ref(null)
const isModalAddQuestion = ref(false)
const isTestDefault = ref()
const loadingScreen = ref(false)

async function getQuestions(){
   isLoading.value = true
   const {data, error} = await supabase.from('qstn_answr').select().eq('test_id', route.params.id)
   if(!error){
      isLoading.value = false
      questions.value = data
   } else {
      isLoading.value = false
      errorLog.value = error
   }
   console.log(data, error);
}

async function getTestType(){
   const {data, error} = await supabase.from('tests').select('is_default').eq('id', route.params.id)
   isTestDefault.value = data[0].is_default
}

async function addPhoto(ev){
  imgLoad.value = true
  const photo = ev.target.files[0]
  const newPhotoName = Date.now() + (Math.random() * 1000).toFixed()
  const {data, error} = await supabase.storage.from('photos').upload(newPhotoName, photo)
  if(!error){
    form.photo = 'https://rjuhycmfqdscizgebqvt.supabase.co/storage/v1/object/public/photos/' + data.path
  }
  if(form.photo){
    imgLoad.value = false
  }
}

async function addQuestion(){
   loadingScreen.value = true
   const {data, error} = await supabase.from('qstn_answr').insert({question: form.question, answer: form.answer, img: form.photo, test_id: route.params.id})
   if(!error){
      loadingScreen.value = false
      isModalAddQuestion.value = false
      getQuestions()
   } else {
      loadingScreen.value = false
      errorLog.value = error
   }
}

onMounted(() => {
   getQuestions()
   getTestType()
})
</script>

<style>

</style>