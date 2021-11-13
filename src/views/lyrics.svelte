<script>
    import { fade } from "svelte/transition";
    import Spinner from "../lib/comp/Spinner.svelte"
    import {supabase} from '../lib/supabase';
    const conf = { duration: 400 }
    let defView = true;
    let daten = []
    let loading
    const getDaten = async () => {
        try {
            loading = true
            const { data, error } = await supabase.from("lyric_db").select("*")
            if (error) throw error
            daten = data
            return data
        } catch (error) {
            console.error(error.error_description || error.message)
        } finally {
            loading = false
        }
    }
    const promise = getDaten()
</script>

<section in:fade={conf} class="box1">
  {#await promise}
    <Spinner />
  {:then value}
  <nav class="flex items-center px-4 mb-8">
    <button on:click={() => window.history.back()} class="btn btn-blue">
      Back
    </button>
    <div class="flex-grow"></div>
    <button
      class="btn btn-blue"
      on:click={() => (defView = !defView)}>
      View</button>
  </nav>
  
  <article>     
        {#if !defView}
          <div data-section="advancedView">
            <div class="flex flex-wrap wrap-2 p-2">
              {#each daten as { id, titel, interpret, album, jahr, lyrics, img_url, file_url }, i}
                <article class="w-full sm:w-1/2 px-2 py-2 text-gray-500">
                  <a href="#/lyrics/{id}" class="flex flex-col py-4 px-4 space-y-1 shadow">
                    <div class="text-3xl font-bold">{titel}</div>
                    <div class="text-2xl">{interpret}</div>
                    <div class="text-xl font-light text-gray-400">{album} / <span class="italic">{jahr}</span></div>
                  </a>
                </article>
              {/each}
            </div>
          </div>
        {:else}
          <div data-section="defaultView">
            <div class="flex flex-wrap wrap-2 p-2">
              {#each daten as { id, titel, interpret, album, jahr, lyrics, img_url, file_url }, i}
                <article class="w-full sm:w-1/2 px-2 py-2">
                  <a href="#/lyrics/{id}" class="flex flex-col py-4 px-4 space-y-1 shadow">
                    <div class="text-gray-500">
                      <span class="text-2xl font-bold">{titel}</span>
                      <span class="text-xl italic font-semibold"> - {interpret}</span>
                    </div>
                    <div class="font-light text-gray-400">
                      <span class="text-xl">{album} </span> 
                      <span class="text-base italic"> / {jahr}</span>
                    </div>
                  </a>
                </article>
              {/each}
            </div>
          </div>
        {/if}
  </article>
      
  {/await}
</section>
