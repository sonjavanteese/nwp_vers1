<script>
    import { fade } from "svelte/transition"
    import { supabase } from "../lib/supabase"
    import Spinner from "../lib/comp/Spinner.svelte"
    const conf = { duration: 400 }
    let daten = []
    let loading
    const getDaten = async () => {
      try {
        loading = true;
        let { data, error } = await supabase.from("album_list").select("*")
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
      {#each daten as { id, name, category, logo, tags }}
      <article class="w-full sm:w-1/2 px-2 py-2">
        <a href="#/alben/{id}" class="flex flex-col py-4 px-4 space-y-1 shadow rounded-xl">
          <div class="text-4xl text-gray-700 font-bold">{name}</div>
          <div class="text-3xl text-gray-500">{category}</div>
          <div class="text-xl font-light text-gray-400">{tags}</div>
        </a>
      </article>
      {/each}
    </section>
  </article>
{/await}

