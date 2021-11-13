<script>
  import { fade } from "svelte/transition"
  import Profil from "./user/user-profil.svelte";
  import {supabase} from "../lib/supabase"
  const conf = { duration: 400 }
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
</script>


<div in:fade={conf} class="box2">
    <Profil />
</div>
