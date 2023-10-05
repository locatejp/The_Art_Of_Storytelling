<script lang="ts">
  import type { PageData } from './$types'
  import AuthCheck from '$lib/components/AuthCheck.svelte'
  import { db, user, userData } from '$lib/firebase'
  import { doc, getDoc, writeBatch } from 'firebase/firestore'
  let username = ''
  let loading = false
  let isAvailable = false
  let debounceTimer: NodeJS.Timeout

  async function checkAvailability() {
    isAvailable = false
    clearTimeout(debounceTimer)
    loading = true

    debounceTimer = setTimeout(async () => {
      console.log({ username })
      if (!username) {
        return
      }
      const ref = doc(db, 'usernames', username)
      console.log({ ref })
      const exists = await getDoc(ref).then((doc) => doc.exists())
      console.log({ exists })

      isAvailable = !exists
      loading = false
    }, 500)
  }

  export async function confirmUsername() {
    console.log(`confirming username ${username}`)
    const batch = writeBatch(db)
    batch.set(doc(db, `usernames`, username), { uid: $user?.uid })
    batch.set(doc(db, `users`, $user!.uid), {
      username,
      installDate: new Date(),
      public: true,
    })
    await batch.commit()
  }

  const re = /^(?=[a-zA-Z0-9._]{3,16}$)(?!.*[_.]{2})[^_.].*[^_.]$/

  $: isValid =
    username?.length > 2 && username?.length < 16 && re.test(username)
  $: isTouched = username?.length > 0
  $: isTaken = !loading && !isAvailable && isValid
</script>

<AuthCheck>
  {#if $userData?.username}
    <p class="text-lg w-3/5">
      Your username is <span class="text-success">@{$userData.username}</span>
    </p>
    <p class="w-3/5">(Usernames cannot be changed)</p>
    <!-- <p>Your bio is <span class="text-warning">{$userData.bio}</span></p> -->
    <a href="/signup/photo"
      ><button class="btn btn-primary">Upload Photo</button></a
    >
  {:else}
    <h2>Username</h2>
    <form class="w-3/5" on:submit|preventDefault={confirmUsername}>
      <input
        type="text"
        placeholder="Choose a username"
        class="input w-full"
        bind:value={username}
        on:input={checkAvailability}
        class:input-error={!isValid && isTouched}
        class:input-warning={isTaken}
        class:input-success={isAvailable && isValid && !loading}
      />

      <div class="my-4 min-h-16 px-8 w-full">
        {#if loading}
          <p class="text-secondary">Checking availability of {username}...</p>
        {/if}

        {#if !isValid && isTouched}
          <p class="text-error text-sm">
            Username must be between 3 - 15 characters long, alphanumeric only
          </p>
        {/if}

        {#if isTaken}
          <p class="text-warning text-sm">Username already taken</p>
        {/if}

        {#if isAvailable && isValid}
          <button class="btn btn-success">Confirm username @{username}</button>
        {/if}
      </div>
    </form>
  {/if}
</AuthCheck>
