<script>
  import { link, location } from "svelte-spa-router"
  import active from "svelte-spa-router/active"
	import { nwp_user } from './../stores.js'
  import {supabase} from '../supabase'
  import { cogIco, lyricIco, archivIco, backIco, drawIco, searchIco, homeIco, leftIco } from '../icons'
  export let name = "Nwp-App"
  export let isSb = false
  export let navi = []
  const logOut = () => {
    supabase.auth
      .signOut()
      .then(() => {
        console.log("Logged Out!");
      })
      .catch((err) => {
        console.error(err);
      });
  }
  const toggleSb = () => {
      isSb = !isSb
  }
  const closeSb = () => {
    setTimeout(() => {
      isSb = false
    }, 100);      
  }
  // https://shuffle.dev/mockup-assets/logos/shuffle-ux-light.svg
</script>

<header class="px-10 py-1 bg-gray-500 shadow">
    <nav class="flex justify-between items-center">
      {#if $location === '/'}
        <span class="navbar-burger text-white opacity-0">{@html archivIco}</span>
      {:else}
        <button on:click={() => window.history.back()} class="navbar-burger text-white">
          {@html backIco}
        </button>
      {/if}
      <a class="text-white text-2xl leading-none" href="#/">
         {name} <!-- <img class="h-8" src="https://nwp-cgn.de/img/poser/logo.svg" alt="" width="auto"/> -->
      </a>
      <button on:click={toggleSb} class="block navbar-burger text-gray-50 hover:text-gray-200 focus:outline-none">
        {@html drawIco}
      </button>
    </nav>
 </header>   
    
<aside class="{isSb ? `open` : ``} navbar-menu">
  <nav class="relative flex flex-col py-6 px-6 w-full h-full bg-white border-r overflow-y-auto">
    <header class="flex items-center mb-8">
      <a class="mr-auto text-2xl font-semibold leading-none" href="#/"> <img class="h-8" src="https://nwp-cgn.de/img/poser/logo.svg" alt="" width="auto" /></a>
      <button class="navbar-close" on:click="{toggleSb}">
        <svg class="h-6 w-6 text-gray-400 cursor-pointer hover:text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewbox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
    </header>

    <section>
      {#if $nwp_user}
      <ul>
        {#each navi as [path, name, main, sub]}
          {#if main}
            <li class="mb-1">
              <a href="{path}" class="sb-item" use:link use:active on:click={closeSb}>
                {name}
              </a>
            </li>
          {/if}
        {/each}
      </ul>
      {/if}
    </section>

    <section class="mt-auto">
      {#if $nwp_user}
      <div class="pt-6">
        <button on:click="{logOut}" class="block w-full px-6 py-2 mb-3 text-sm text-center text-gray-500 hover:text-gray-600 font-bold leading-loose border border-gray-100 hover:border-gray-200 rounded">
          Logout
        </button>
      </div>
      {/if}
      <p class="mt-6 mb-4 text-sm text-center text-gray-400"><span>© 2021 All rights reserved.</span></p>
    </section>
  </nav>
</aside>
<div on:click={toggleSb} class="{isSb ? `` : `hidden`} navbar-backdrop fixed inset-0 bg-gray-800 opacity-25 z-20"></div>


<style>
  .navbar-burger {
      @apply flex items-center justify-center h-12 w-12;
  }
  :global(.nav-item) {
      @apply flex items-center justify-center;
  }
  :global(.nav-item.active) {
      @apply text-gray-400;
  }
  :global(.sb-item) {
    @apply block p-4 text-sm font-semibold text-gray-700 hover:bg-gray-50 rounded;
  }
  :global(.sb-item.active) {
    @apply bg-gray-100 hover:bg-gray-50;
  }
  aside {
    @apply fixed top-0 left-0 bottom-0 w-5/6 max-w-sm z-40;
    transform: translateX(-100%); 
    transition: transform 0.5s;
  }
  aside.open {
    transform: translateX(0); 
  }
</style>