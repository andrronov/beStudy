<template>
  <homeTemplate :title="'Collection'">
   <loading v-if="isLoading" />
   
   <div v-if="collection.length > 0 && typeof collection == 'object' || isLoading" class="w-full flex flex-col items-center h-full px-2 gap-8">
      <div v-for="test in collection" :key="test.id" class="flex flex-col w-full items-center">
         <div class="bg-gradient-to-r from-indigo-700 via-blue-600 to-indigo-500 w-full rounded-xl rounded-b-none p-4 text-white sm:text-2xl">
            <p class="text-center font-medium mb-2 text-3xl">{{ test.name }}</p>
            <div class="flex flex-row items-center justify-between w-full">
               <p class="">{{ test.qstn_answr.length }} questions</p>
               <p>{{ useTimeAgo(test.created_at) }}</p>
               
            </div>
            <div class="flex flex-row items-center justify-between w-full">
               <p>name</p>
               <p>ID: {{ test.id }}</p>
            </div>
         </div>
         <div class="flex flex-row items-center rounded-xl rounded-t-none border-indigo-500 border-2 justify-between w-full">
            <div class="w-1/3 flex justify-center h-full cursor-pointer hover:bg-green-300">
               <CheckIcon class="sm:w-10 sm:h-10 w-8 h-8" />
            </div>
            <div @click="router.push(`/edit/${test.id}`)" class="w-1/3 flex justify-center h-full cursor-pointer border-x-2 border-indigo-800 hover:bg-indigo-300">
               <PencilSquareIcon class="sm:w-10 sm:h-10 w-8 h-8" />
            </div>
            <div @click="deleteTest(test.id)" class="w-1/3 flex justify-center h-full cursor-pointer hover:bg-red-300">
               <TrashIcon class="sm:w-10 sm:h-10 w-8 h-8" />
            </div>
         </div>
      </div>
   </div>


   <p v-else class="text-lg text-center">No tests yet</p>

   <loadScreen v-if="loadingScreen" />
   <button @click="router.push('/home')" class="p-2 bg-indigo-200 text-black hover:bg-indigo-300 rounded-xl text-xl absolute bottom-10 z-40">back</button>
  </homeTemplate>
</template>

<script setup>
import homeTemplate from '../components/UI/homeTemplate.vue';
import loading from '../components/UI/loading.vue';
import { supabase } from '../lib/supabaseClient';
import { CheckIcon, PencilSquareIcon, TrashIcon } from '@heroicons/vue/24/solid'
import loadScreen from '../components/UI/loadScreen.vue'
import { useTimeAgo } from '@vueuse/core'
import { useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'

const router = useRouter()
const isLoading = ref(true)
const loadingScreen = ref(false)
const errorLog = ref(null)
const collection = ref([])

async function getCollection() {
   const user = await supabase.auth.getUser()
   const {data, error} = await supabase.from('tests').select('*, qstn_answr(*)').eq('author', user.data.user.id)
   if(!error){
      isLoading.value = false
      collection.value = data
   } else {
      isLoading.value = false
      errorLog.value = error
   }
}

async function deleteTest(id) {
   const isAgree = confirm('Are you sure you want to delete this test?')
   if(isAgree) {
      loadingScreen.value = true
      const {data, error} = await supabase.from('tests').delete().eq('id', id)
      if(!error) {
         loadingScreen.value = false
         getCollection()
      } else {
         loadingScreen.value = false
         errorLog.value = error
      }
   }
}

onMounted(() => {
   getCollection()
})
</script>

<style>

</style>