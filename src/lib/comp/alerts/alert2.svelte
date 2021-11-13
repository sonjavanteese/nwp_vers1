<script>
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();
</script>    
  
  <div class="absolute max-w-11/12 sm:max-w-md top-4 right-4 z-20 border flex flex-col p-2 bg-white shadow-xl hover:bg-gray-50 rounded-2xl">
      <div class="flex flex-col items-start p-2">
        <div class="flex items-center w-full" on:click={() => dispatch('close', 'alert1')}>
            <!-- <div class="text-gray-900 font-medium text-lg">Info</div> -->
            <svg class="ml-auto fill-current text-gray-700 w-6 h-6 cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18">
                <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"/>
            </svg>
        </div>
        <div class="mb-2">
        <slot />
        </div>
    </div>
   </div>
  