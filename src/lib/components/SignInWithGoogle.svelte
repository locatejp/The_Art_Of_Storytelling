<script lang="ts">
  import { auth, userData } from '$lib/firebase'
  import GoogleLogo from '$lib/svgs/GoogleLogo.svelte'
  import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
  import { goto } from '$app/navigation'
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

    if ($userData?.username) {
      goto(`/mystories/${$userData.username}`)
    } else {
      goto(`/topstories`)
    }
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
