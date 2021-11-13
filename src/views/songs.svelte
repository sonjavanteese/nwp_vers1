<script>
    import { fade } from "svelte/transition";
    import { Notification, notifications } from "renderless-svelte";
    import Alert from "../lib/comp/alerts/alert1.svelte";
    import {supabase} from '../lib/supabase';
    let defView = true;
    let daten = []
    let loading
    const getDaten = async () => {
        try {
            loading = true;
            let { data, error } = await supabase.from("lyric_db").select("*")
            if (error) throw error
            daten = data
            return data
        } catch (error) {
            console.error(error.error_description || error.message)
        } finally {
            loading = false
        }
        }
    const promise = getDaten();
</script>




  <section in:fade={{ duration: 400 }} class="box1">
    {#await promise}
    <div class="h-full flex flex-row justify-center items-center"> 
      <div>... isLoading</div>
     </div>
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
    
    <div>
      <ul class="divide-y divide">
        {#each daten as d}
          {#if !defView}
            <li>
              <a href="#/list/{d.id}" class="flex flex-col py-4 space-y-1">
                <div class="text-4xl text-gray-700 font-bold">{d.titel}</div>
                <div class="text-3xl text-gray-500">{d.interpret}</div>
                <div class="text-xl font-light text-gray-400">
                  {d.album} - {d.jahr}
                </div>
              </a>
            </li>
          {:else}
            <li>
              <a href="#/list/{d.id}" class="flex items-center space-x-2 px-4 py-2">
                <div class="space-y-0">
                  <div class="text-lg font-medium">{d.titel}</div>
                  <div>{d.interpret} - {d.album}</div>
                </div>
              </a>
            </li>
          {/if}
        {/each}
      </ul>
    </div>
    {/await}
  </section>






  <Notification let:payload duration={4000}>
    <Alert on:close={() => notifications.pop()}>
      {payload}
    </Alert>
  </Notification>