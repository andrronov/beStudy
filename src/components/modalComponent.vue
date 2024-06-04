<template>
  <div class="fixed z-50 w-screen h-screen bg-indigo-900/60">
    <p @click="$emit('closeModal')" class="absolute right-5 top-5 p-1.5 bg-white text-black">X</p>
   <div class="w-full h-full flex items-center justify-center text-white">
      <slot></slot>
   </div>
  </div>
</template>

<script setup>

</script>

<style>

</style>