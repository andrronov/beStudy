<template>
   <div class="w-screen h-screen bg-gradient-to-r from-blue-100 via-purple-100 to-indigo-200">
      <div class="max-w-7xl h-full mx-auto flex flex-col items-center gap-8 justify-between pt-5">
       <h1 class="text-3xl sm:text-4xl font-semibold text-transparent bg-clip-text bg-gradient-to-r to-blue-500 via-purple-600 from-indigo-700">{{ props.title }}</h1>
       <div class="flex flex-col items-center gap-4 w-full">
         <slot></slot>
       </div>
       <p class="text-sm text-gray-500">©2024 (v0.1) andrronov</p>
      </div>
     </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { supabase } from '../../lib/supabaseClient.js'
import { onMounted, ref } from 'vue';

const router = useRouter()
const session = ref()


function checkLoggedIn(){
  supabase.auth.getSession().then(({ data }) => {
    session.value = data.session
    if(!session.value){
    router.push('login')
  }
  })

  supabase.auth.onAuthStateChange((_, _session) => {
    session.value = _session
    if(!session.value){
    router.push('login')
  }
  })
}
onMounted(() => {
  checkLoggedIn()
})

const props = defineProps({
  title: String,
  default: 'beStudy'
})
</script>

