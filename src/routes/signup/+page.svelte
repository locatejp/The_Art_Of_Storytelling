<script lang="ts">
  import SignUpWithPassword from '$lib/components/SignUpWithPassword.svelte'
  import SignInWithGoogle from '$lib/components/SignInWithGoogle.svelte'
  import Divider from '$lib/components/Divider.svelte'
  import SignOutBtn from '$lib/components/SignOutBtn.svelte'
  import { user } from '$lib/firebase'
</script>

<div class="flex flex-col">
  {#if $user}
    <SignOutBtn />
  {:else}
    <SignUpWithPassword />
    <Divider />
    <SignInWithGoogle />
  {/if}
</div>
