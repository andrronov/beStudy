<template>
  <!-- <mainPage /> -->
  <modalComponent v-if="isCreateTest">
    <div class="w-full z-40">
      <div class="max-w-7xl mx-auto flex flex-col items-center space-y-4 px-2">
        <label for="testName" class="text-xl font-semibold">Test name</label>
        <input @keydown.enter="createTest" v-model="testName" type="text" id="testName" class="w-full text-black sm:w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
        <button @click="createTest" class="px-4 py-3 bg-indigo-600 font-semibold text-2xl text-white rounded-xl hover:bg-indigo-700">Create test</button>
        <button @click="isCreateTest = false" class="px-2 py-1 text-2xl bg-indigo-800 text-white rounded-xl absolute bottom-10 z-40 hover:bg-indigo-700">Back</button>
        <loading class="absolute -bottom-32" v-if="isLoading" />
        <p v-if="errorLog" class="text-red-500">{{errorLog}}</p>
      </div>
    </div>
  </modalComponent>

  <homeTemplate :title="'beStudy'" class="text-xl sm:text-2xl">
    <p class="mb-8">Welcome, Andrew!</p>
    <button @click="isCreateTest = true" class="px-3 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700">Create collection</button>
    <button @click="router.push('/collection')" class="px-3 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700">Edit collections</button>
    <button class="px-3 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700">Take a test</button>
  </homeTemplate>
</template>

<script setup>
import homeTemplate from '../components/UI/homeTemplate.vue';
import modalComponent from '../components/modalComponent.vue';
import loading from '../components/UI/loading.vue';
import { ref } from 'vue'
import { supabase } from '../lib/supabaseClient';
import { useRouter } from 'vue-router';

const router = useRouter()
const isCreateTest = ref(false)
const testName = ref(null)
const isLoading = ref(false)
const errorLog = ref(null)

async function createTest(){
  const user = await supabase.auth.getUser()
  isLoading.value = true
  if(testName.value){
    const {error} = await supabase.from('tests').insert({name: testName.value, author: user.data.user.id})
    if(!error){
      isLoading.value = false
      router.push('/collection')
    } else {
      isLoading.value = false
      errorLog.value = error
    }
  }
}
</script>

<style>

</style>