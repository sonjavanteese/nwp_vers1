<script>
  import { fade } from "svelte/transition"
  import { Accordion, AccordionGroup } from 'renderless-svelte'
  import Spinner from "../lib/comp/Spinner.svelte"
  import Profil from "./user/user-profil.svelte";
  import { nwp_user, nwp_profil } from "../lib/stores"
  import {supabase} from "../lib/supabase"
  const conf = { duration: 400 }
  let loading
  let username = null
  let website = null
  let avatar_url = null
  let img_url = null
  const getProfile = async () => {
    try {
      loading = true;
      const user = supabase.auth.user();
      let { data, error, status } = await supabase
        .from("profiles")
        .select(`username, website, avatar_url, img_url`)
        .eq("id", user.id)
        .single();
      if (error && status !== 406) throw error;
      return data
    } catch (error) {
      console.error(error.message);
    } finally {
      loading = false;
    }
  }
  const signOut = async () => {
    try {
      loading = true;
      let { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      console.error(`Error SignOut:<br>${error.message}`);
    } finally {
      loading = false;
    }
  }
  let promise = Promise.all([getProfile()]).then((data) => {
    return data[0]
  })   
  const formatDate = (str) => {
    let date = new Date(str)
    let datum = `${date.getDate()}.${date.getMonth()+1}.${date.getFullYear()} / 
      ${date.getHours() < 10 ? '0' : ''}${date.getHours()}:${date.getMinutes() < 10 ? '0' : ''}${date.getMinutes()}`
    return datum
  }
</script>


<section in:fade={conf} class="box2">
  {#await promise}
      <Spinner />
  {:then value}
    <header class="flex flex-col sm:flex-row w-full items-center px-2 py-2">
      <h2 class="px-2 py-2">User Info</h2>
      <div class="sm:flex-grow" />
      <a href="#/user/edit" class="block w-full sm:inline-block sm:w-auto mb-2 sm:mb-0 text-center btn btn-blue">Edit Profil</a>
      <button on:click={signOut} class="block w-full sm:inline-block sm:w-auto mb-2 sm:mb-0 text-center btn btn-red">Logout</button>
    </header>
    <AccordionGroup>
      <Accordion isOpen={true}>
          <div class="tab-ctrl" slot="header" let:toggle on:click={toggle}>User Daten</div>
          <div class="py-4 px-4 border-b">
            <table>
              <tr>
                <td>User Mail</td>
                <td>{$nwp_user.email}</td>
              </tr>
              <tr>
                <td>User Phone</td>
                <td>{@html $nwp_user.phone === '' ? `<span class="text-red-900">not specified</span>` : $nwp_user.phone}</td>
              </tr>
              <tr>
                <td>User Id</td>
                <td>{$nwp_user.id}</td>
              </tr>
              <tr>
                <td>Confirmed</td>
                <td>{formatDate($nwp_user.confirmed_at)}</td>
              </tr>
              <tr>
                <td>Last SignIn</td>
                <td>{formatDate($nwp_user.last_sign_in_at)}</td>
              </tr>
            </table>
            <details class="">
              <summary class="block w-full px-2 py-1 bg-gray-100 text-center text-sm">Json Obj</summary>
                <pre class="rounded-b-xl mb-0 bg-gray-50">{JSON.stringify($nwp_user, null, 2)}</pre>
            </details>
          </div>
      </Accordion>
      <Accordion>
          <div class="tab-ctrl" slot="header" let:toggle on:click={toggle}>Profil Daten</div>
          <div class="py-1 border-b">
              <pre class="rounded-xl mb-0">{JSON.stringify(value, null, 2)}</pre>
          </div>
      </Accordion>
      <!-- <Accordion>
          <div class="tab-ctrl" slot="header" let:toggle on:click={toggle}>Profil Editor</div>
          <div class="py-2 border-b">
              <Profil />
          </div>
      </Accordion> -->
    </AccordionGroup>
  {/await}
</section>
<style>
  .tab-ctrl {
    @apply block w-full py-2 px-4 border-b bg-gray-300 text-gray-600 cursor-pointer;
  }
</style>
<!-- <Notification let:payload duration={6000}>
  <Alert on:close={() => notifications.pop()}>
    {@html payload}
  </Alert>
</Notification> -->