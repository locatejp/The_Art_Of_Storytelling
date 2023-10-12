<script lang="ts">
  import SignInWithPassword from '$lib/components/SignInWithPassword.svelte'
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

<main class="card w-4/6 bg-base-200 mx-auto">
  <div class="card-body items-center text-center">
    <h1 class="card-title text-5xl font-bold p-5">
      Continue Your Storytelling
    </h1>
    {#if $user}
      <SignOutBtn {handleSigninError} />
    {:else}
      <SignInWithPassword {togglePassword} {passwordBtnVisible} />
      {#if !passwordBtnVisible}
        <Divider />
        <SignInWithGoogle />
      {/if}
    {/if}
  </div>
</main>
