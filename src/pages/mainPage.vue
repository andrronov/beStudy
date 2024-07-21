<template>
  <!-- <mainPage /> -->
  <modalComponent v-if="isCreateTest">
    <div class="w-full z-40">
      <div class="max-w-7xl mx-auto flex flex-col items-center gap-4 px-2">
        <label for="testName" class="text-xl font-semibold">Test name</label>
        <input @keydown.enter="createTest" v-model="testName" type="text" id="testName" class="w-full text-black sm:w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
        <div class="w-full flex flex-col items-center my-4 justify-between gap-4">
          <p class="text-xl font-semibold">Select test type:</p>
          <div class="flex flex-row items-center justify-between">
            <div :class="isTestDefault ? 'border-4 bg-indigo-800' : 'border-2 bg-inherit'" @click="isTestDefault = true" class="w-[48%] min-h-72 flex text-center flex-col items-center p-2 gap-2 border-white rounded-xl text-white">
              <p class="text-lg font-medium">Training</p>
              <p>In this test you can practice: look through the questions, see the answers to them and understand where you are strong and where you are weak</p>
            </div>
            <!-- take first line when second type of test will be done -->
            <!-- <div @click="isTestDefault = false" class="w-[48%] min-h-72 flex relative text-center flex-col items-center p-2 gap-2 border-2 border-white rounded-xl text-white"> -->
            <div class="w-[48%] min-h-72 flex relative text-center flex-col items-center p-2 gap-2 border-2 border-white rounded-xl text-white">
              <p class="text-lg font-medium">Full power</p>
              <p class="text-gray-200">Now everything is serious: you will have a question and answer options. The assessment system, knowledge testing and the final result at the end of the test. Test your knowledge!</p>
              <div class="absolute flex items-center justify-center w-full h-full bg-indigo-100/35 top-0 left-0">
                <p class="text-black font-semibold text-2xl -rotate-6">In developing</p>
              </div>
            </div>
          </div>
        </div>
        <button @click="createTest" class="px-4 py-3 bg-indigo-600 font-semibold text-2xl text-white rounded-xl hover:bg-indigo-700">Create test</button>
        <button @click="isCreateTest = false" class="px-2 py-1 text-2xl bg-indigo-800 text-white rounded-xl absolute bottom-10 z-40 hover:bg-indigo-700">Back</button>
        <loading class="absolute bottom-36" v-if="isLoading" />
        <p v-if="errorLog" class="text-red-500">{{errorLog}}</p>
      </div>
    </div>
  </modalComponent>

  <modalComponent v-if="isTakeTest">
    <div class="w-full px-2 flex flex-col xs:flex-row items-center gap-8">
      <div @click="router.push('/collection')" class="p-4 rounded-xl border-2 border-white w-full flex justify-center items-center h-32 hover:bg-indigo-950">
        <p class="text-xl">From your collection</p>
      </div>
      <div class="p-4 rounded-xl border-2 border-white w-full h-32 text-center hover:bg-indigo-950">
        <p class="mb-4 text-xl">By ID</p>
        <input @keydown.enter="router.push(`test/${inputTestID}`)" v-model="inputTestID" type="number" class="w-full text-black sm:w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
      </div>
    </div>
    <button @click="isTakeTest = false" class="px-2 py-1 text-2xl bg-indigo-800 text-white rounded-xl absolute bottom-10 z-40 hover:bg-indigo-700">Back</button>
  </modalComponent>

  <homeTemplate :title="'beStudy'" class="text-xl sm:text-2xl">
    <p class="mb-8 username">Welcome, {{ userName || '... ' }}!</p>
    <button @click="isCreateTest = true" class="px-3 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700">Create collection</button>
    <button @click="router.push('/collection')" class="px-3 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700">Edit collections</button>
    <button @click="isTakeTest = true" class="px-3 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700">Take a test</button>

    <button @click="logOutUser" class="bg-indigo-900 text-white p-2 rounded-xl text-xl">Log out</button>

    <p v-if="errorLog" class="text-red-500">{{errorLog}}</p>
  </homeTemplate>

  <loadScreen v-if="isLoadScreen" />
</template>

<script setup>
import homeTemplate from '../components/UI/homeTemplate.vue';
import modalComponent from '../components/modalComponent.vue';
import loading from '../components/UI/loading.vue';
import loadScreen from '../components/UI/loadScreen.vue';
import { ref, onBeforeMount } from 'vue'
import { supabase } from '../lib/supabaseClient';
import { useRouter } from 'vue-router';

const router = useRouter()
const isCreateTest = ref(false)
const isTakeTest = ref(false)
const testName = ref(null)
const isLoading = ref(false)
const errorLog = ref(null)
const inputTestID = ref('')
const userName = ref(null)
const isLoadScreen = ref(false)
const isTestDefault = ref(true)

async function createTest(){
  if(testName.value?.length > 0){
    isLoading.value = true
  const user = await supabase.auth.getUser()
  if(testName.value){
    const {error} = await supabase.from('tests').insert({name: testName.value, author: user.data.user.id, is_default: isTestDefault.value})
    if(!error){
      isLoading.value = false
      router.push('/collection')
    } else {
      isLoading.value = false
      errorLog.value = error
    }
  }
  } else {
    errorLog.value = 'Fill in test name'
    setTimeout(() => {
      errorLog.value = null
    }, 5000)
  }
}

async function logOutUser(){
  const isAgreed = confirm('Are you sure you want to log out?')
  if(isAgreed){
    localStorage.clear()
    isLoadScreen.value = true
    await supabase.auth.signOut({ scope: 'local' })
    router.push('/login')
  }
}

async function getUserName(){
  if(localStorage.getItem('username')) userName.value = localStorage.getItem('username')
  else {
    try {
      const data = await supabase.auth.getUser()
      userName.value = data.data.user.user_metadata.username
      localStorage.setItem('username', userName.value)
    } catch (err) {
      console.error('Error during getUser: ', err)
      errorLog.value = `Error during getUser: ${err}`
    }
        // supabase.auth.getUser().then(res => {
        //   userName.value = res.data.user.user_metadata.username
        //   userName.value ? localStorage.setItem('username', userName.value) : errorLog.value = 'Failed to fetch user response'
        // })
      // } catch (err) {
      //   console.error('Error:', err)
      //   errorLog.value = `Error: ${err}`
      // }
  }
}

onBeforeMount(() => {
  getUserName()
})
</script>

<style>

</style>