<script lang="ts">
  import { auth } from '$lib/firebase'
  import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'

  async function signInWithGoogle() {
    const provider = new GoogleAuthProvider()
    const credential = await signInWithPopup(auth, provider)
    console.log({ credential })
    const idToken = await credential.user.getIdToken()
    console.log({ idToken })

    const res = await fetch('/api/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ idToken }),
    })
  }
</script>

<button class="btn btn-primary" on:click={signInWithGoogle}
  >Sign in with Google</button
>

<slot />
