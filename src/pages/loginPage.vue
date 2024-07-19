<template>
  <loadScreen v-if="isLoadScreen" />

  
  <div class="w-full h-screen flex flex-col justify-center items-center bg-gradient-to-r from-blue-200 via-purple-300 to-indigo-400">

  <div v-if="isLogin" class="flex min-h-full flex-1 flex-col w-full justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <h1 class="text-center text-4xl font-semibold bg-gradient-to-r to-blue-500 via-purple-600 from-indigo-700 text-white p-2 rounded-xl">beStudy</h1>
      <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-800">Sign in to your account</h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form id="login_form" class="space-y-6">
        <div>
          <label class="block text-sm font-medium leading-6 text-gray-900">Email address</label>
          <div class="mt-2">
            <input v-model="form.regEmail" id="email_input" name="email" type="email" autocomplete="email" required="" class="forma block w-full rounded-md border-0 py-1.5 px-0.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label class="block text-sm font-medium leading-6 text-gray-900">Password</label>
            <div class="text-sm">
              <a class="font-semibold text-indigo-600 hover:text-indigo-500 cursor-pointer">Forgot password?</a>
            </div>
          </div>
          <div class="mt-2">
            <input @keydown.enter="loginUser" v-model="form.loginPassword" id="password_input" name="password" type="password" autocomplete="current-password" required="" class="forma block w-full rounded-md border-0 py-1.5 px-0.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
        </div>

        <div>
          <button @click.prevent="loginUser" id="signinButton" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
        </div>
        <p v-if="errorLog" id="errorLog" class="text-red-600 text-center">{{ errorLog }}</p>
      </form>

      <!-- <div class="flex items-center justify-center mt-8">
        <button @click="signInWithGoogle" class="px-4 bg-indigo-700 py-2 border text-white flex gap-2 border-slate-200 dark:border-slate-700 rounded-lg dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150">
            <img class="w-6 h-6" src="https://www.svgrepo.com/show/475656/google-color.svg" loading="lazy" alt="google logo">
            <span>Login with Google</span>
        </button>
      </div> -->

      <p class="mt-10 text-center text-sm text-gray-500">
        Don't have account?
        <a @click="isLogin = false" id="toSignupButton" class="cursor-pointer font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Register</a>
      </p>
    </div>
  </div>
  

  <!-- REGISTRATION -->

  <div v-else class="flex min-h-full flex-1 flex-col w-full justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <h1 class="text-center text-4xl font-semibold bg-indigo-600 text-white p-2 rounded-xl">beStudy</h1>
      <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign up</h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form id="signup_form" class="space-y-6">
        <div>
          <label class="block text-sm font-medium leading-6 text-gray-900">Email address</label>
          <div class="mt-2">
            <input v-model="form.regEmail" id="email" name="email" type="email" autocomplete="email" required="" class="forma email_reg block w-full rounded-md border-0 py-1.5 px-0.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium leading-6 text-gray-900">Username</label>
          <div class="mt-2">
            <input v-model="form.userName" id="name" name="name" type="name" autocomplete="name" required="" class="forma username_reg block w-full rounded-md border-0 py-1.5 px-0.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label class="block text-sm font-medium leading-6 text-gray-900">Password</label>
          </div>
          <div class="mt-2">
            <input v-model="form.regPassword" id="password" name="password" type="password" autocomplete="current-password" required="" class="forma pass_reg block w-full rounded-md border-0 py-1.5 px-0.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
        </div>

        <div>
          <button @click.prevent="signUpUser" id="signUpButton" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign up</button>
        </div>
        <p v-if="errorLog" id="errorLog" class="text-red-600 text-center p-2 bg-gray-100/70">{{ errorLog }}</p>
      </form>

      <p class="mt-10 text-center text-sm text-gray-500">
        <a @click="isLogin = true" class="cursor-pointer font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Back</a>
      </p>
    </div>
  </div>
  </div>
</template>

<script setup>
import homeTemplate from '../components/UI/homeTemplate.vue';
import loadScreen from '../components/UI/loadScreen.vue';
import { reactive, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { supabase } from '../lib/supabaseClient';

const errorLog = ref(null)
const router = useRouter()
const isLoadScreen = ref(false)
const isLogin = ref(true);
const form = reactive({
  regEmail: null,
  regPassword: null,
  loginPassword: null,
  userName: null,
})

// to finish
async function signUpUser(){
  if(form.regEmail && form.regPassword && form.userName){
    isLoadScreen.value = true
    errorLog.value = null
    const { data, error } = await supabase.auth.signUp({
        email: form.regEmail,
        password: form.regPassword,
        options: {
          data: {
            username: form.userName,
        },
          emailRedirectTo: 'http://localhost:5173/#/home'
        }
      })
    if(!error){
      isLoadScreen.value = false
      errorLog.value = 'Check your email!'
      setTimeout(() => {
        errorLog.value = null
      }, 10000)
    } else {
      isLoadScreen.value = false
      errorLog.value = error
    }
  } else {
    errorLog.value = 'Fill in all the fields'
    setTimeout(() => {
      errorLog.value = null
    }, 10000)
  }
}

async function loginUser(){
  if(form.regEmail && form.loginPassword){
    errorLog.value = null
    isLoadScreen.value = true
    const { data, error } = await supabase.auth.signInWithPassword(
      {
        email: form.regEmail,
        password: form.loginPassword
      }
    )

    if(!error){
      isLoadScreen.value = false
      router.push('/home')
    } else{
      isLoadScreen.value = false
      errorLog.value = error
      setTimeout(() => {
        errorLog.value = null
      }, 5000)
    }
  } else {
    errorLog.value = 'Fill in all the fields'
    setTimeout(() => {
      errorLog.value = null
    }, 10000)
  }
}

onMounted(async() => {
  console.log(await supabase.auth.getSession());
})
</script>

<style>

</style>