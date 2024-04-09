<template>
  <homeTemplate :title="'Collection'">
   <loading v-if="isLoading" />
   
   <div v-if="collection" class="w-full flex flex-col items-center h-full px-2 max-w-7xl">
      <div v-for="test in collection" :key="test.id" class="flex flex-col w-full items-center">
         <div class="bg-indigo-700 w-full rounded-xl p-4 text-white">
            <div class="flex flex-row items-center justify-between w-full">
               <p class="font-semibold text-2xl">{{ test.name}}</p>
               <p>{{ useTimeAgo(test.created_at) }}</p>
               
            </div>
            <div class="flex flex-row items-center justify-between w-full">
               <p>name</p>
               <p>test ID: {{ test.id }}</p>
            </div>
         </div>
         <div>
            <CheckIcon class="w-6 h-6" />
         </div>
      </div>
   </div>

   <p v-else class="text-lg text-center">No tests yet</p>
  </homeTemplate>
</template>

<script setup>
import homeTemplate from '../components/UI/homeTemplate.vue';
import loading from '../components/UI/loading.vue';
import { supabase } from '../lib/supabaseClient';
import { CheckIcon } from '@heroicons/vue/24/solid'
import { useTimeAgo } from '@vueuse/core'
import { ref, onMounted } from 'vue'

const isLoading = ref(true)
const errorLog = ref(null)
const collection = ref([])

async function getCollection() {
   const user = await supabase.auth.getUser()
   const {data, error} = await supabase.from('tests').select().eq('author', user.data.user.id)
   if(!error){
      isLoading.value = false
      collection.value = data
      console.log(data);
   } else {
      isLoading.value = false
      errorLog.value = error
   }
}

onMounted(() => {
   getCollection()
})
</script>

<style>

</style>