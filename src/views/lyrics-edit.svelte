<script>
  import { fade } from "svelte/transition"
  import { supabase } from "../lib/supabase"
  import Spinner from "../lib/comp/Spinner.svelte"
  export let params = {}
  const conf = { duration: 400 }
  let daten = []
  let loading
  let id;
  let titel = '';
  let interpret = '';
  let album = '';
  let jahr = '';
  let img_url = '';
  let file_url = '';
  let lyrics = '';
  
  const handleSubmit = async () => {
    let uObj = { lyrics, titel, interpret, album, jahr, img_url, file_url, id };
    try {
          loading = true
          let { error } = await supabase.from("lyric_db").upsert(uObj, {
            returning: "minimal", // Don't return the value after inserting
          })
          if (error) throw error  
          return true
        } catch (error) {
          console.error(error.error_description || error.message)
        } finally {
          loading = false
        }
  }
  const getDaten = async () => {
    try {
      loading = true;
      let { data, error } = await supabase.from("lyric_db").select("*").eq("id", params.id)
      if (error) throw error
      daten = data[0]
       return data
    } catch (error) {
      console.error(error.error_description || error.message)
    } finally {
      loading = false
    }
  }
  let promise = getDaten().then(() => {
    console.log("obj daten:", daten)
    titel = daten.titel;
    interpret = daten.interpret;
    album = daten.album;
    jahr = daten.jahr;
    img_url = daten.img_url;
    file_url = daten.file_url;
    id = daten.id;
    lyrics = daten.lyrics;
  })
</script>

{#await promise}
  <Spinner />
{:then value}
  <article in:fade={conf} class="box1">
    <div class="py-8">
    <form on:submit|preventDefault={handleSubmit}>

      <div class="flex flex-wrap">
        <div class="w-2/3 py-1 px-2 mb-2">
          <label for="x_titel" class="label">Titel</label>
          <input bind:value={titel} class="input" type="text" placeholder="Titel" id="x_titel" />
        </div>
        <div class="w-1/3 py-1 px-2 mb-2">
          <label for="x_jahr" class="label">Jahr</label>
          <input bind:value={jahr} class="input" type="text" placeholder="Jahr" id="x_jahr" />
       </div>
      </div>
      <div class="flex flex-wrap">
        <div class="w-1/2 py-1 px-2 mb-2">
          <label for="x_interpret" class="label">Interpret</label>
       <input bind:value={interpret} class="input" type="text" placeholder="Interpret" id="x_interpret" />
        </div>
        <div class="w-1/2 py-1 px-2 mb-2">
          <label for="x_album" class="label">Album</label>
       <input bind:value={album} class="input" type="text" placeholder="Album" id="x_album" />
       </div>
      </div>
      <div class="flex flex-wrap">
        <div class="w-full md:w-1/2 py-1 px-2 mb-2">
          <label for="x_img_url" class="label">Image</label>
          <input bind:value={img_url} class="input" type="text" placeholder="Image" id="x_img_url" />
         </div>
        <div class="w-full md:w-1/2 py-1 px-2 mb-2">
          <label for="x_file_url" class="label">File</label>
          <input bind:value={file_url} class="input" type="text" placeholder="File" id="x_file_url" />
         </div>
      </div>
  
      <details class="mb-4">
      <summary class="label block pt-2">Lyrics</summary>
       <textarea bind:value={lyrics} class="input min-h-sm" type="text" id="x_lyrics" />
      </details>
  
  
     <div class="py-2">
      <button type="submit" class="button">Submit</button>
     </div>
  </form>  
  </div>
  </article>
{/await}

