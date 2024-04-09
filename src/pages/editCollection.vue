<template>
   <modalComponent v-if="isModalAddQuestion">
   Add question
   <button @click="isModalAddQuestion = false" class="rounded-xl p-2 bg-indigo-600 text-white text-xl">Back</button>
   
   </modalComponent>

  <homeTemplate :title="'Edit'">
   <loading v-if="isLoading" />

   <div v-if="typeof questions == 'object' && questions?.length > 0">
      <div v-for="question in questions" :key="question.id">
         {{ question }}
      </div>
   </div>
   <div v-else>
      <p class="text-lg font-semibold">Don't any questions yet</p>
   </div>

   <button @click="isModalAddQuestion = true" class="rounded-xl p-2 bg-indigo-600 text-white text-xl">Add question</button>
  </homeTemplate>
</template>

<script setup>
import homeTemplate from '../components/UI/homeTemplate.vue';
import modalComponent from '../components/modalComponent.vue';
import loading from '../components/UI/loading.vue';
import { supabase } from '../lib/supabaseClient';
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const isLoading = ref(true)
const questions = ref(null)
const errorLog = ref(null)
const isModalAddQuestion = ref(false)

async function getQuestions(){
   const {data, error} = await supabase.from('qstn_answr_default').select().eq('test_id', route.params.id)
   if(!error){
      isLoading.value = false
      questions.value = data
   } else {
      isLoading.value = false
      errorLog.value = error
   }
   console.log(data, error);
}

onMounted(() => {
   getQuestions()
})
</script>

<style>

</style>