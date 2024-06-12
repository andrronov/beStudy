<template>
  <div class="z-50 fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
    <div class="bg-white p-4 rounded-lg shadow-lg flex flex-col items-center">
      <p class="text-red-500 font-semibold">Error!</p>
      <p>{{ props.error }}</p>
      <button @click="goBack" class="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">Back</button>
    </div>
  </div>
</template>

<script setup>
import {ref} from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const props = defineProps({
   error: {
      type: String,
      default: 'code 1234'
   }
})

function goBack(){
   router.back()
}
</script>

<script>

</script>

<style>

</style>