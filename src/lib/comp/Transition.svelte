<script>
  import { fade } from 'svelte/transition'
  export let x = 400;
  export let y = 0;
</script>


<div in:fade={{ duration: x, delay: y }}>
    <slot></slot>
</div>
