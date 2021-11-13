<script>
  import { push } from "svelte-spa-router";
</script>

<section class="h-full w-full flex flex-col justify-center items-center">
  <header class="space-y-8">
    <h1>Not Found</h1>
    <p><button class="btn bg-red-900 text-white" on:click={() => push("/")}>Home</button></p>
  </header>
</section>

<style>
  header {
    @apply text-center;
  }
  h1 {
    @apply text-8xl font-bold text-red-900;
  }
</style>
