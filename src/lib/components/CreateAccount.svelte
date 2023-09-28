<script>
  let email = ''
  let password = ''

  function handleSubmit() {
    // Add your account creation logic here
    console.log('Email:', email)
    console.log('Password:', password)
  }
</script>

<main
  class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"
>
  <div class="max-w-md w-full space-y-8">
    <div>
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
        Create an Account
      </h2>
    </div>
    <form class="mt-8 space-y-6" on:submit|preventDefault={handleSubmit}>
      <div class="rounded-md shadow-sm -space-y-px">
        <div>
          <label for="email" class="sr-only">Email address</label>
          <input
            id="email"
            name="email"
            type="email"
            autocomplete="email"
            required
            class="appearance-none rounded-none relative block w-full px-3 py-2 border
              border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none
              focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="Email address"
            bind:value={email}
          />
        </div>
        <div>
          <label for="password" class="sr-only">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            autocomplete="current-password"
            required
            class="appearance-none rounded-none relative block w-full px-3 py-2 border
              border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none
              focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm mt-2"
            placeholder="Password"
            bind:value={password}
          />
        </div>
      </div>

      <div>
        <button
          type="submit"
          class="group relative w-full flex justify-center py-2 px-4 border border-transparent
            text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none
            focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Create Account
        </button>
      </div>
    </form>
  </div>
</main>
