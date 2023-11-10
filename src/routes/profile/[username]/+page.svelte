<script lang="ts">
  import type { PageData } from './$types'
  import { db, user, userData, storage } from '$lib/firebase'
  import { ref, getDownloadURL, uploadBytes } from 'firebase/storage'
  import { updateDoc, doc } from 'firebase/firestore'
  import { onMount } from 'svelte'

  let firstName = ``
  let lastName = ``
  let submitting = false
  let file: File

  $: firstNameNotValid = firstName?.length < 1
  $: lastNameNotValid = lastName?.length < 1

  let previewURL: string
  let uploading = false

  // async function upload(e: any) {
  //   uploading = true
  //   const file = e.target.files[0]
  //   previewURL = URL.createObjectURL(file)
  //   const storageRef = ref(storage, `users/${$user!.uid}/profile.png`)
  //   console.log({ storageRef })
  //   const metadata = {
  //     cacheControl: 'public,max-age=300',
  //   }
  //   const result = await uploadBytes(storageRef, file, metadata)
  //   const photoURL = await getDownloadURL(result.ref)
  //   await updateDoc(doc(db, 'users', $user!.uid), { photoURL })
  //   uploading = false
  // }
  function createPreviewURL(e: any) {
    const files = e.target.files
    file = files[0]
    previewURL = URL.createObjectURL(file)
  }

  async function uploadProfileImg() {
    uploading = true
    const storageRef = ref(storage, `users/${$user!.uid}/profile.png`)
    const metadata = {
      cacheControl: 'public,max-age=86400',
    }
    const result = await uploadBytes(storageRef, file, metadata)
    const photoURL = await getDownloadURL(result.ref)
    await updateDoc(doc(db, 'users', $user!.uid), { photoURL })
    uploading = false
  }

  async function updateProfile() {
    submitting = true
    console.log({ file })
    if (file) {
      await uploadProfileImg()
    }
    await new Promise((r) => setTimeout(r, 3000))
    submitting = false
  }

  export let data: PageData
  onMount(() => {
    firstName = $userData?.firstName
    lastName = $userData?.lastName
  })
</script>

<main class="card w-4/6 bg-base-200 mx-auto">
  <div class="card-body items-center text-center">
    <form class="w-3/5 flex-col" on:submit|preventDefault={updateProfile}>
      <label class="label" for="firstname">
        <span class="label-text">First Name</span>
      </label>
      <input
        name="firstname"
        type="text"
        class="input w-full"
        bind:value={firstName}
        class:input-error={firstNameNotValid}
      />

      <label class="label" for="lastName">
        <span class="label-text">Last Name</span>
      </label>
      <input
        name="lastName"
        type="text"
        placeholder="Last name"
        class="input w-full"
        bind:value={lastName}
        class:input-error={lastNameNotValid}
      />

      <img
        src={previewURL ?? $userData?.photoURL ?? '/default_profile_img.png'}
        alt="photoURL"
        width="256"
        height="256"
        class="mx-auto mt-2"
      />
      <input
        type="file"
        class="file-input file-input-bordered w-256 mx-auto"
        on:change={createPreviewURL}
        name="photoURL"
        accept="image/png, image/jpeg, image/gif, image/webp"
      />
      {#if uploading}
        <p>Uploading...</p>
        <progress class="progress progress-info w-full mt-6" />
      {/if}

      <button
        class="btn btn-outline btn-accent m-3"
        class:btn-disabled={submitting}
      >
        {#if submitting}
          <span class="loading loading-spinner" />
          Update
        {:else}
          Update
        {/if}
      </button>
    </form>
  </div>
</main>
