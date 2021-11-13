<script>
  import { onMount } from "svelte";
  import Router from "svelte-spa-router";
  import { routes, navi } from "./routes";
  // import { link } from "svelte-spa-router";
  // import active from "svelte-spa-router/active";

  import Spinner from "./lib/comp/Spinner.svelte";
  import SignIn from "./views/user/sign-in.svelte";
  import Appbar from "./lib/comp/Appbar.svelte";
  import { supabase } from "./lib/supabase";
  import { nwp_user, nwp_session, nwp_profil } from "./lib/stores"
  let loading
  const showSpinner = (timer) => {
    loading = true;
    setTimeout(() => {
      loading = false;
    }, timer);
  };
  supabase.auth.onAuthStateChange((event, session) => {
    showSpinner(800);
    if (session && session.user) {
      nwp_user.set(session.user);
      nwp_session.set({
        accessToken: session.access_token,
        refreshToken: session.refresh_token,
      });
      console.log("Auth Ok", event, session);
    } else {
      nwp_user.set(null)
      nwp_session.set(null)
      nwp_session.set(null)
      console.log("Auth Error", event, session)
    }
  });
  onMount(() => {
    nwp_user.set(supabase.auth.user());
  });
</script>

{#if loading}
  <Spinner />
{/if}
<Appbar {navi} />
<main>
  {#if $nwp_user}
    {#if !loading}
      <Router {routes} />
    {/if}
  {:else if !loading}
      <SignIn />
  {/if}
</main>

<style windi:preflights:global windi:safelist:global>
</style>
