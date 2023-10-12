<script lang="ts">
  import SignUpWithPassword from '$lib/components/SignUpWithPassword.svelte'
  import SignInWithGoogle from '$lib/components/SignInWithGoogle.svelte'
  import Divider from '$lib/components/Divider.svelte'
  import SignOutBtn from '$lib/components/SignOutBtn.svelte'
  import { user } from '$lib/firebase'

  let passwordBtnVisible = false
  console.log({ passwordBtnVisible })
  function togglePassword() {
    passwordBtnVisible = !passwordBtnVisible
  }
  function handleSigninError() {
    passwordBtnVisible = false
  }
</script>

{#if $user}
  <h2 class="card-title">
    Welcome {$user?.displayName || `friend`},
  </h2>
  <p class="text-center text-success">You are logged in</p>
  <a class="btn btn-primary" href="/signup/username">Pick Username</a>
{:else}
  <SignUpWithPassword
    {handleSigninError}
    {passwordBtnVisible}
    {togglePassword}
  />
  {#if !passwordBtnVisible}
    <Divider />
    <SignInWithGoogle />
  {/if}
{/if}
