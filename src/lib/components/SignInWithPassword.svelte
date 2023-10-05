<script lang="ts">
  import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
  let email = ''
  let password = ''
  let errorMsg = ''
  export let passwordBtnVisible: Boolean
  export let togglePassword: () => void

  async function signUpWithPassword() {
    console.log({ email, password })
    const auth = getAuth()
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // Signed in
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
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        console.log({ errorCode, errorMessage })
        const inUse = errorCode.includes(`email-already-in-use`)
        errorMsg = inUse
          ? `Account already created with this email. Try signing in with Google or your password.`
          : `An unknown error occurred. Try again.`
        email = ``
        password = ``
        console.log({ errorMsg })
        console.log({ email })
        console.log({ showErrorMsg })
      })
  }

  const validEmailRe =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ // https://emailregex.com/index.html
  const passwordRe =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[a-zA-Z\d!@#$%^&*()_+]{8,16}$/
  $: emailIsBlank = email === ``
  $: isValidEmail = validEmailRe.test(email)
  $: passwordIsBlank = password === ``
  $: isValidPassword = passwordRe.test(password)
  $: showErrorMsg = Boolean(errorMsg) && email === ``
</script>

<form class="flex flex-col max-w-screen-md w-full">
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
      <button class="btn btn-outline" on:click={togglePassword}>Back</button>
      <button
        class="btn btn-primary mb-3"
        disabled={!isValidEmail || !isValidPassword}
        on:click|preventDefault={signUpWithPassword}>Submit</button
      >
    </div>
  {:else}
    <button
      disabled={!isValidEmail}
      class="btn btn-primary"
      name="nextBtn"
      on:click={togglePassword}>Next</button
    >
    {#if showErrorMsg}
      <label class="text text-warning" for="nextBtn">{errorMsg}</label>
    {/if}
  {/if}
</form>
