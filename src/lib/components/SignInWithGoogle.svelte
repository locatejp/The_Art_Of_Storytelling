<script lang="ts">
  import { auth } from '$lib/firebase'
  import GoogleLogo from '$lib/svgs/GoogleLogo.svelte'
  import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
  export let signupType = `in`

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

<button
  class="btn btn-outline btn-primary rounded-full"
  on:click={signInWithGoogle}
>
  <GoogleLogo />
  Sign {signupType} with Google</button
>

<slot />
