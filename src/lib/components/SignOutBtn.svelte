<script>
  import { auth, user } from '$lib/firebase'
  import { signOut } from 'firebase/auth'

  async function signOutSSR() {
    const res = await fetch('/api/signin', { method: 'DELETE' })
    await signOut(auth)
  }
</script>

<h2 class="card-title">Welcome, {$user?.displayName}</h2>
<p class="text-center text-success">You are logged in</p>
<button class="btn btn-warning" on:click={signOutSSR}>Sign out</button>
