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

  const validEmailRe =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ // https://emailregex.com/index.html
  const passwordRe =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[a-zA-Z\d!@#$%^&*()_+]{8,16}$/
  // Contains at least one lowercase letter
  // Contains at least one uppercase letter
  // Contains at least one digit
  // Contains at least one special character
  // Is at least 8 characters long and no more than 16 characters long
  const passwordRequirments =
    `Password must contain at least one lowercase letter, ` +
    `one uppercase letter, one digit, one special character, and ` +
    `be 8 - 16 characters long.`
  $: emailIsBlank = email === ``
  $: isValidEmail = validEmailRe.test(email)
  $: passwordIsBlank = password === ``
  $: isValidPassword = passwordRe.test(password)
</script>

<form class="flex flex-col max-w-screen-md w-full">
  <label class="text text-left font-bold mt-2" for="email">Email</label>
  <input
    bind:value={email}
    name="email"
    class="input input-bordered w-full max-w-xs"
    type="email"
    class:input-error={!isValidEmail && !emailIsBlank}
    class:input-success={isValidEmail}
    autocomplete="username"
  />
  <label class="text text-left font-bold mt-2" for="password">Password</label>
  <input
    bind:value={password}
    name="password"
    class="input input-bordered w-full max-w-xs"
    type="password"
    class:input-error={!isValidPassword && !passwordIsBlank}
    class:input-success={isValidPassword}
    autocomplete="new-password"
  />
  <label for="password" class="text text-left text-sm max-w-xs"
    >{passwordRequirments}</label
  >
  <!-- <button on:click={signUpWithPassword} type="submit">Submit</button> -->
</form>
