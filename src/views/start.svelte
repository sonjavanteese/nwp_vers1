<script>
  import { fade } from "svelte/transition"
  import { Notification, notifications } from "renderless-svelte"
  import Alert from "../lib/comp/alerts/alert2.svelte"
  import Spinner from "../lib/comp/Spinner.svelte"
  // import {supabase} from '../lib/supabase'
  import {navi} from '../routes'
  const conf = { duration: 400 }
  let loading
  let act = 1
  const getDb = async () => {
    try {
      loading = true
      const response = await fetch('https://xfcfjwsobkcneeqbvijr.supabase.in/storage/v1/object/public/archiv1/supabase-1.json')
      let data = await response.json()
      if (!data) throw error
      return data
    } catch (error) {
      console.error(error.error_description || error.message)
    } finally {
        loading = false
    }
  }
  let promise = Promise.all([getDb()])
    .then(data => {
      return data
  })
</script>

<Notification let:payload duration={6000}>
  <Alert on:close={() => notifications.pop()}>
    {@html payload}
  </Alert>
</Notification>

<!-- <section in:fade={conf} class="max-w-xl mx-auto px-4"></section> -->
<section in:fade={conf} class="box2">
  {#await promise}
      <Spinner />
  {:then value}
    
    <section class="py-8">
      <h2 class="border-b py-2 px-2">Main Navigation</h2>
      <div class="bg-white shadow-xl rounded-lg"> 
        <ul class="divide-y divide-gray-300"> 
          {#each navi as [path, name, main, sub]}
            {#if sub}
              <li class="mb-0">
                <a href="#{path}" class="block w-full py-4 px-8 text-4xl text-gray-500 font-semibold hover:bg-gray-50">
                  {name}
                </a>
              </li>
            {/if}
          {/each}           
        </ul>     
      </div>  
    </section>
    <section class="pb-8">
      <h4 class="border-b py-2 px-2">Datenbank Info</h4>
      <div class="py-2 px-4 shadow-xl rounded-lg">
        {#each value[0].dbs as {name, cols}}
        <button class="btn btn-blue uppercase mb-2" on:click={() => notifications.push(`
        <div class="text-lg font-medium mb-2">DB: ${name}</div>
        <div class="rounded-lg text-sm bg-gray-100 text-gray-400 px-3 py-2">{#each daten as { ${cols.join(", ")} }, i}{/each}</div>
        `)}>{name}</button>
        {/each}
      </div>
    </section>

  {/await}
</section>

<!-- <section>
	<nav class="flex items-center justify-center mb-8"> <a href="#/list" class="btn btn-blue">Show List</a>
	</nav>
	<div class="flex items-center flex-wrap px-4">{#each albenDB as d}
		<button class="btn btn-red" on:click={()=>getFiles(d.id)}> {d.name}</button>{/each}
  </div>
	<article>
		<div class="space-y-1">{#each filesDB as d}
			<div>
				<img src={d.path} alt={d.titel}>
			</div>{/each}</div>
	</article>
</section> -->