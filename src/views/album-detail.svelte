<script>
  import { fade } from "svelte/transition"
  import { supabase } from "../lib/supabase"
  import Spinner from "../lib/comp/Spinner.svelte"
  const conf = { duration: 400 }
  export let params = {}
  let daten = []
  let loading
  const getDaten = async () => {
    try {
      loading = true;
      let { data, error } = await supabase.from("album_files").select("*").eq("alb_id", params.id)
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
  <article in:fade={conf}>
    <section class="flex flex-wrap wrap-2 p-2">
      {#each daten as { id, alb_id, titel, path }}
      <article class="w-full sm:w-1/2 p-4">
        <figure class="flex flex-col w-full h-full items-center justify-between shadow rounded-xl">
          <img src={path} alt={titel} class="flex-grow w-full h-full object-cover rounded">
          <figcaption class="text-lg font-medium truncate pt-">{titel}</figcaption>
        </figure>
      </article>
      {/each}
    </section>
  </article>
{/await}