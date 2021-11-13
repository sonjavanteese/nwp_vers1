<script>
import { createEventDispatcher } from 'svelte';
const dispatch = createEventDispatcher();
</script>    

<div class="absolute max-w-11/12 sm:max-w-md top-4 right-4 z-20 flex flex-col p-2 bg-white shadow-xl hover:shodow-lg rounded-2xl">
    <div class="flex flex-col sm:flex-row items-center justify-between">
      <div class="flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg"
          class="w-12 h-12 rounded-2xl px-1 border border-blue-100 text-blue-400 bg-blue-50" fill="none"
          viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <div class="flex flex-col ml-2">
            <div class="text-lg font-medium leading-none px-4">
                <slot />
            </div>
        </div>
      </div>
      <span class="w-2 h-4"></span>
      <button on:click={() => dispatch('close', 'alert1')} class="flex-no-shrink bg-blue-500 px-5 py-2 text-sm shadow-sm hover:shadow-lg font-medium tracking-wider border-2 border-blue-500 text-white rounded-full">Close</button>
    </div>
</div>
