<script lang="ts">
  import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
  let email = ''
  let password = ''
  async function signUpWithPassword() {
    const auth = getAuth()
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user
        // ...
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        // ..
      })
  }
</script>

<form class="flex flex-col max-w-screen-md w-full">
  <label class="text text-left font-bold mt-2" for="email">Email</label>
  <input
    bind:value={email}
    name="email"
    class="input input-bordered w-full max-w-xs"
    type="text"
  />
  <label class="text text-left font-bold mt-2" for="password">Password</label>
  <input
    bind:value={password}
    name="password"
    class="input input-bordered w-full max-w-xs"
    type="text"
  />
  <!-- <button on:click={signUpWithPassword} type="submit">Submit</button> -->
</form>
