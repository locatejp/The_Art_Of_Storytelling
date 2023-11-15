<script lang="ts">
  import boop from '$lib/JS Helpers/boop'
  export let boopParams: any
  let isBooped = false

  // Is there a more Svelte-y way to do this?
  function setIsBooped(val: boolean) {
    isBooped = val
  }

  function triggerBoop() {
    isBooped = true
  }
</script>

<!-- trigger onclick so demo works on mobile -->
<span
  on:mouseenter={triggerBoop}
  use:boop={{ isBooped, ...boopParams, setter: setIsBooped }}
>
  <slot />
</span>

<!-- on:click={triggerBoop}   -->
