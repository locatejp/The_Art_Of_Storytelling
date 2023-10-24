<script lang="ts">
  import { user } from '$lib/firebase'
  import { signOutSSR } from '$lib/JS Helpers/functions'
  export let handleSigninError: () => void

  function signOutClicked() {
    handleSigninError()
    signOutSSR()
  }
</script>

<h2 class="card-title">Welcome {$user?.displayName || `friend`},</h2>
<p class="text-center text-success">You are logged in</p>
<button class="btn btn-warning" on:click={signOutClicked}>Sign out</button>
