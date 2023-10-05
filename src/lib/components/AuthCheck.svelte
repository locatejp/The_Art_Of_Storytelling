<script lang="ts">
    import { user } from '$lib/firebase'
  </script>
  
  {#if $user}
    <slot />
  {:else}
    <p>You must be logged in to see this</p>
    <a class="btn" href="/login">Login</a>
  {/if}
  