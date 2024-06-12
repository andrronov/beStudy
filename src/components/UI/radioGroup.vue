<template>
   <div class="w-full">
     <div class="mx-auto w-full max-w-7xl">
       <RadioGroup v-model="selected">
         <RadioGroupLabel class="sr-only"></RadioGroupLabel>
         <div class="space-y-2">
           <RadioGroupOption
             as="template"
             v-for="(plan, index) in plans"
             :key="index"
             :value="plan"
             v-slot="{ active, checked }"
             @click="$emit('selectAnswer', index)"
           >
             <div
               :class="[
                 active
                   ? 'ring-2 ring-white/60 ring-offset-2 ring-offset-sky-300'
                   : '',
                 checked ? 'bg-indigo-900/75 text-white ' : 'bg-white ',
               ]"
               class="relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none border border-blue-300"
             >
               <div class="flex w-full items-center justify-between">
                 <div class="flex items-center">
                   <div class="text-sm">
                     <RadioGroupLabel
                       as="p"
                       :class="checked ? 'text-white' : 'text-gray-900'"
                       class="font-medium"
                     >
                       {{ plan }}
                     </RadioGroupLabel> 
                  </div>
                 </div>
                 <div v-show="checked" class="shrink-0 text-white">
                   <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none">
                     <circle
                       cx="12"
                       cy="12"
                       r="12"
                       fill="#fff"
                       fill-opacity="0.2"
                     />
                     <path
                       d="M7 13l3 3 7-7"
                       stroke="#fff"
                       stroke-width="1.5"
                       stroke-linecap="round"
                       stroke-linejoin="round"
                     />
                   </svg>
                 </div>
               </div>
             </div>
           </RadioGroupOption>
         </div>
       </RadioGroup>
     </div>
   </div>
 </template>
 
 <script setup>
 import { ref } from 'vue'
 import {
   RadioGroup,
   RadioGroupLabel,
   RadioGroupDescription,
   RadioGroupOption,
 } from '@headlessui/vue'
 
 const props = defineProps({
   array: {
      type: Array,
      default: ['aaa', 'bbb', 'ccc']
   }
 })

 const plans = props.array
 
 const selected = ref(plans[0])
 </script>
 