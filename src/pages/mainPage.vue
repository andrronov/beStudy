<template>
  <!-- <mainPage /> -->

  <div class="w-screen h-screen bg-gray-100">
   <div class="max-w-7xl h-full mx-auto flex flex-col items-center justify-evenly">
    <h1 class="text-3xl sm:text-4xl font-semibold">Be Study</h1>
    <div class="flex flex-col items-center gap-4 text-xl sm:text-2xl">
      <p class="mb-8">Welcome, Andrew!</p>
      <button class="px-3 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700">Создать карточку</button>
      <button class="px-3 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700">Редактировать коллекцию</button>
      <button class="px-3 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700">Пройти тест</button>
    </div>
   </div>
  </div>
</template>

<script setup>
import mainPage from '../components/modalComponent.vue'
</script>

<style>

</style>