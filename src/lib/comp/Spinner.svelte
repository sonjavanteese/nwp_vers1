<script>
  import { fade } from 'svelte/transition'
  import { Jumper } from 'svelte-loading-spinners'
</script>

<section transition:fade class="fixed top-0 left-0 bottom-0 right-0 flex flex-col justify-center items-center bg-gray-500 bg-opacity-80 z-50">
    <div>
        <Jumper size="60" color="#555555" unit="px" duration="1s"></Jumper>
      </div>
</section>