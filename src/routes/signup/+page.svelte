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

<div class="flex flex-col">
  {#if $user}
    <SignOutBtn {handleSigninError} />
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
</div>
