<template>
   <div class="w-full">
     <div v-if="props.q_a" class="mx-auto w-full max-w-7xl rounded-2xl bg-white">
       <Disclosure v-for="(q_a, index) in props.q_a" :key="index" v-slot="{ open }">
         <DisclosureButton
           class="flex w-full justify-between rounded-lg bg-indigo-100 px-4 py-2 text-left text-sm font-medium text-indigo-900 hover:bg-indigo-200 focus:outline-none focus-visible:ring focus-visible:ring-indigo-500/75"
         >
           <span>{{ q_a.q }}</span>
           <ChevronUpIcon
             :class="open ? 'rotate-180 transform' : ''"
             class="h-5 w-5 text-indigo-500"
           />
         </DisclosureButton>
         <DisclosurePanel class="px-4 pb-2 pt-4 text-sm text-gray-800">
           {{ q_a.a }}
         </DisclosurePanel>
       </Disclosure>
     </div>
     <div v-else class="mx-auto w-full max-w-7xl rounded-2xl bg-white">
       <Disclosure v-slot="{ open }">
         <DisclosureButton
           class="flex w-full justify-between rounded-lg bg-indigo-100 px-4 py-2 text-left text-sm font-medium text-indigo-900 hover:bg-indigo-200 focus:outline-none focus-visible:ring focus-visible:ring-indigo-500/75"
         >
           <span>Add answer options</span>
           <ChevronUpIcon
             :class="open ? 'rotate-180 transform' : ''"
             class="h-5 w-5 text-indigo-500"
           />
         </DisclosureButton>
         <DisclosurePanel class="px-4 pb-2 pt-4 text-sm text-gray-800">
           <slot />
         </DisclosurePanel>
       </Disclosure>
     </div>
   </div>
 </template>
 
 <script setup>
 import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
 import { ChevronUpIcon } from '@heroicons/vue/20/solid'

 const props = defineProps({
   q_a: {
      type: Array,
      default: [{q: "What is your refund policy?", a: "If you're unhappy with your purchase for any reason, email us within 90 days and we'll refund you in full, no questions asked."}]
   }
 })
 </script>
 