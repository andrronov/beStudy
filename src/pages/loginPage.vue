<template>
  <div class="w-full h-screen flex flex-col justify-center items-center bg-gradient-to-r from-blue-200 via-purple-300 to-indigo-400">

  <div v-if="isLogin" class="flex min-h-full flex-1 flex-col w-full justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <h1 class="text-center text-4xl font-semibold bg-gradient-to-r to-blue-500 via-purple-600 from-indigo-700 text-white p-2 rounded-xl">beStudy</h1>
      <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-800">Sign in to your account</h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6">
        <div>
          <label class="block text-sm font-medium leading-6 text-gray-900">Email address</label>
          <div class="mt-2">
            <input v-model="form.loginEmail" id="email" name="email" type="email" autocomplete="email" required="" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label class="block text-sm font-medium leading-6 text-gray-900">Password</label>
            <div class="text-sm">
              <a class="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
            </div>
          </div>
          <div class="mt-2">
            <input @keydown.enter="loginUser" v-model="form.loginPassword" id="password" name="password" type="password" autocomplete="current-password" required="" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
        </div>

        <div>
          <button @click.prevent="loginUser" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
        </div>
        <p v-if="errorLog" class="text-red-600 text-center">{{ errorLog }}</p>
      </form>

      <!-- <div class="flex items-center justify-center mt-8">
        <button class="px-4 bg-indigo-700 py-2 border flex gap-2 border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150">
            <img class="w-6 h-6" src="https://www.svgrepo.com/show/475656/google-color.svg" loading="lazy" alt="google logo">
            <span>Login with Google</span>
        </button>
      </div> -->

      <p class="mt-10 text-center text-sm text-gray-500">
        Don't have account?
        <a @click="isLogin = false" class="cursor-pointer font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Register</a>
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
      <form class="space-y-6">
        <div>
          <label class="block text-sm font-medium leading-6 text-gray-900">Email address</label>
          <div class="mt-2">
            <input v-model="form.regEmail" id="email" name="email" type="email" autocomplete="email" required="" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label class="block text-sm font-medium leading-6 text-gray-900">Password</label>
            <div class="text-sm">
              <a class="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
            </div>
          </div>
          <div class="mt-2">
            <input v-model="form.regPassword" id="password" name="password" type="password" autocomplete="current-password" required="" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
        </div>

        <div>
          <button @click.prevent="signUpUser" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign up</button>
        </div>
      </form>

      <p class="mt-10 text-center text-sm text-gray-500">
        <a @click="isLogin = true" class="cursor-pointer font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Back</a>
      </p>
    </div>
  </div>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import homeTemplate from '../components/UI/homeTemplate.vue';
import { supabase } from '../lib/supabaseClient';

const errorLog = ref(null)
const router = useRouter()
const isLogin = ref(true);
const form = reactive({
  regEmail: null,
  regPassword: null,
  loginEmail: null,
  loginPassword: null
})

// to finish
async function signUpUser(){
  if(form.regEmail && form.regPassword){
    const { data, error } = await supabase.auth.signUp(
      {
        email: form.regEmail,
        password: form.regPassword,
        options: {
          emailRedirectTo: 'http://localhost:5173/home'
        }
      }
    )
    console.log(data, error);
  } console.log('aaaa', form);
}

async function loginUser(){
  if(form.loginEmail && form.loginPassword){
    errorLog.value = null
    const { data, error } = await supabase.auth.signInWithPassword(
      {
        email: form.loginEmail,
        password: form.loginPassword
      }
    )
    if(!error){
      router.push('/home')
    } else{
      errorLog.value = error
      setTimeout(() => {
        errorLog.value = null
      }, 5000);
    }
  }
}

onMounted(async() => {
  console.log(await supabase.auth.getSession());
})
</script>

<style>

</style>