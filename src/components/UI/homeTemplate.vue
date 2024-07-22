<template>
   <div class="w-screen h-fit overflow-x-hidden min-h-screen bg-gradient-to-r from-blue-100 via-purple-100 to-indigo-200">
      <div class="max-w-7xl h-screen mx-auto flex flex-col items-center gap-8 justify-between pt-5">
       <h1 class="text-3xl sm:text-4xl font-semibold text-transparent bg-clip-text bg-gradient-to-r to-blue-500 via-purple-600 from-indigo-700">{{ props.title }}</h1>
       <div class="flex flex-col items-center gap-4 w-full">
         <slot></slot>
       </div>
         <p class="text-sm text-gray-500">©2024 (v0.2.0) andrronov</p>
      </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { supabase } from '../../lib/supabaseClient.js'
import { onMounted, ref } from 'vue';

const router = useRouter()
const session = ref()

async function checkLoggedIn() {
     try {
       const { data } = await supabase.auth.getSession();
       session.value = data.session;
       console.log(data);
       if (!session.value) router.push('login');
     } catch (error) {
       console.error('Error fetching session:', error);
     }

     supabase.auth.onAuthStateChange((_, _session) => {
       session.value = _session;
       if (!session.value) router.push('/login');
     });
   }
// function checkLoggedIn(){
//   supabase.auth.getSession().then(({ data }) => {
//     session.value = data.session
//     console.log(data);
//     if(!session.value) router.push('login')
//   })

//   supabase.auth.onAuthStateChange((_, _session) => {
//     session.value = _session
//     if(!session.value) router.push('/login')
//   })
// }
onMounted(() => {
  checkLoggedIn()
})

const props = defineProps({
  title: String,
  default: 'beStudy'
})
</script>

