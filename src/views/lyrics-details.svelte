<script>
  import { fade } from "svelte/transition"
  import { supabase } from "../lib/supabase"
  import Spinner from "../lib/comp/Spinner.svelte"
  export let params = {}
  const conf = { duration: 400 }
  let daten = []
  let loading
  const getDaten = async () => {
    try {
      loading = true;
      let { data, error } = await supabase.from("lyric_db").select("*").eq("id", params.id)
      if (error) throw error
      daten = data
      return data
    } catch (error) {
      console.error(error.error_description || error.message)
    } finally {
      loading = false
    }
  }
  let promise = getDaten()
</script>

{#await promise}
  <Spinner />
{:then value}
  <article in:fade={conf} class="box1">
    <ul class="divide-y divide">
        {#each daten as d}
            <li class="flex flex-col space-y-2 px-4 py-2">
              <div class="text-3xl text-gray-700 font-bold">{d.titel}</div>
              <div class="text-2xl text-gray-500">{d.interpret}</div>
              <div class="text-lg font-light text-gray-400">
                {d.album} - {d.jahr}
              </div>
            </li>
            <li>
              <pre>{@html d.lyrics}</pre>
            </li>
        {/each}
      </ul>
  </article>
{/await}

