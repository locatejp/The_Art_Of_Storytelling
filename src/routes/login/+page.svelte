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

<main class="card w-4/6 bg-base-200 mx-auto">
  <div class="card-body items-center text-center">
    <h1 class="card-title text-5xl m-4">Continue Your Storytelling</h1>
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
  </div>
</main>
