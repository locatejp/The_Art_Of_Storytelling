<script lang="ts">
  import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
  import { goto } from '$app/navigation'
  import { userData } from '$lib/firebase'
  import BackArrow from './BackArrow.svelte'
  import { validEmailRe, passwordRe } from '../JS Helpers/re'
  let email = ''
  let password = ''
  let errorMsg = ''
  export let passwordBtnVisible: Boolean
  export let togglePassword: () => void

  async function signInWithPassword() {
    console.log({ email, password })
    const auth = getAuth()
    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user
        console.log({ user })
        const idToken = await user.getIdToken()
        console.log({ idToken })
        const res = await fetch('/api/signin', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ idToken }),
        })
        goto(`/mystories/${$userData?.username}`)
      })
      .catch((error) => {
        const { code: errorCode, message: errorMessage } = error
        console.log({ errorCode, errorMessage })

        errorMsg = `That password didn't work. Please try again.`
        email = ``
        password = ``
      })
  }

  $: isValidEmail = validEmailRe.test(email)
  $: isValidPassword = passwordRe.test(password)
  $: showErrorMsg = Boolean(errorMsg) && email === ``
</script>

<form class="relative flex flex-col max-w-screen-md w-2/5">
  {#if passwordBtnVisible}
    <button
      class="absolute mx-3 mt-3 right-full btn btn-circle btn-xs"
      on:click={togglePassword}
    >
      <BackArrow />
    </button>
  {/if}
  <label class="text text-left font-bold mt-2" for="email">Email</label>
  <input
    bind:value={email}
    name="email"
    class="input input-bordered w-full mb-3"
    type="email"
    autocomplete="username"
  />

  {#if passwordBtnVisible}
    <label class="text text-left font-bold mt-2" for="password">Password</label>
    <input
      bind:value={password}
      name="password"
      class="input input-bordered w-full"
      type="password"
      autocomplete="new-password"
    />
    <div
      class="join join-vertical space-y-4 lg:space-y-0 lg:join-horizontal lg:space-x-4 m-3"
    >
      <!-- <button class="btn btn-outline" on:click={togglePassword}>Back</button> -->
      <button
        class="btn btn-outline btn-primary mb-3"
        name="submitBtn"
        disabled={!isValidEmail || !isValidPassword}
        on:click|preventDefault={signInWithPassword}>Submit</button
      >
    </div>
    {#if showErrorMsg}
      <label class="text text-warning" for="submitBtn">{errorMsg}</label>
    {/if}
  {:else}
    <button
      disabled={!isValidEmail}
      class="btn btn-outline btn-primary rounded-full"
      name="nextBtn"
      on:click={togglePassword}>Next</button
    >
    <a class="link link-primary mt-4" href="/forgotpassword"
      >Forgot Your Password?</a
    >
  {/if}
</form>
