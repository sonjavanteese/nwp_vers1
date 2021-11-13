<script>
  import Avatar from "./Avatar.svelte";
  import { nwp_user, nwp_profil } from "../../lib/stores";
  import {supabase} from "../../lib/supabase";
  let loading = true;
  let username = null;
  let website = null;
  let avatar_url = null;
  let img_url = null;

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

      if (data) {
        username = data.username;
        website = data.website;
        avatar_url = data.avatar_url;
        img_url = data.img_url;
        nwp_profil.set(data);
      }
    } catch (error) {
      alert(error.message);
    } finally {
      loading = false;
    }
  };

  const updateProfile = async () => {
    try {
      loading = true;
      const user = supabase.auth.user();

      const updates = {
        id: user.id,
        username,
        website,
        avatar_url,
        updated_at: new Date(),
      };

      let { error } = await supabase.from("profiles").upsert(updates, {
        returning: "minimal", // Don't return the value after inserting
      });

      if (error) throw error;
    } catch (error) {
      // setAlert(`Error Update: ${error.message}`, 1)
      alert(`Error Update: ${error.message}`, 1);
    } finally {
      loading = false;
    }
  };

  const signOut = async () => {
    try {
      loading = true;
      let { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      setAlert(`Error SignOut:<br>${error.message}`, 1);
    } finally {
      loading = false;
    }
  };
  const handleSubmit = (e) => {
    console.log("handleSubmit", e.target);
  };
  let promise = getProfile()
</script>
{#await promise then value}


<section class="py-4">
  <h2 class="border-b py-2 px-2">{$nwp_profil.username}</h2>
  <div class="py-2 border-b">
    <header class="flex flex-col md:flex-row w-full items-center p-2">
      <h4>Edit Profil</h4>
      <div class="md:flex-grow" />
      <a href="#/user" class="block text-center w-full md:w-auto md:inline-block py-3 px-8 leading-none text-white bg-blue-700 rounded shadow m-1">Info</a>
      <button on:click={signOut}>Logout</button>
    </header>
    <div class="flex flex-wrap -mx-6">
        <div class="w-full lg:w-1/3 px-6 mb-8 lg:mb-0">
            <label class="block text-gray-500 text-lg font-bold mb-2" for="">Avatar</label>
            <Avatar bind:path="{avatar_url}" on:upload="{updateProfile}" />
        </div>
        <div class="w-full lg:w-2/3 lg:border-l px-6">
            <form on:submit|preventDefault="{handleSubmit}" class="w-full mx-auto">
                <div class="mb-4">
                    <label class="block text-gray-500 text-lg font-bold mb-2" for="">User Name</label>
                    <input
                        class="appearance-none block w-full py-3 px-4 leading-tight text-gray-700 bg-gray-50 focus:bg-white border border-gray-200 focus:border-gray-500 rounded focus:outline-none"
                        type="text"
                        bind:value="{username}"
                        placeholder="Name"
                    />
                </div>
                <div class="mb-8">
                    <label class="block text-gray-500 text-lg font-bold mb-2" for="">Website</label>
                    <input
                        class="appearance-none block w-full py-3 px-4 leading-tight text-gray-700 bg-gray-50 focus:bg-white border border-gray-200 focus:border-gray-500 rounded focus:outline-none"
                        type="url"
                        bind:value="{website}"
                        placeholder="Website"
                    />
                </div>
                <div class="mb-2">
                    <button on:click="{updateProfile}" class="inline-block w-full py-3 px-8 leading-none text-white bg-blue-700 font-medium rounded shadow">Update Profil</button>
                </div>
                <!-- <div class="mb-2">
                    <button on:click="{signOut}" class="inline-block w-full py-4 px-8 leading-none text-white bg-red-700 font-semibold rounded shadow">Logout</button>
                </div> -->
            </form>
        </div>
    </div>


  </div>
</section>
{/await}