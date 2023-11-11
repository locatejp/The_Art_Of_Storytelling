<script lang="ts">
  import type { PageData } from './$types'
  import { db, user, userData, storage } from '$lib/firebase'
  import { ref, getDownloadURL, uploadBytes } from 'firebase/storage'
  import { updateDoc, doc, writeBatch, deleteDoc } from 'firebase/firestore'
  import { deleteUser } from 'firebase/auth'
  import Tooltip from '$lib/components/Tooltip.svelte'
  import Divider from '$lib/components/Divider.svelte'
  import { signOutSSR } from '$lib/JS Helpers/functions'

  const tooltipText = `Registered email cannot be changed`
  let submitting = false
  let file: File | null
  let fileInput: HTMLInputElement
  let previewURL: string
  let uploading = false
  let showDangerZone = false
  let showModal = false
  let errorMsg = ``
  export let data: PageData
  let { firstName, lastName, photoURL, username } = data

  $: userEmail = $user?.email || ``
  $: firstNameNotValid = firstName?.length < 1
  $: lastNameNotValid = lastName?.length < 1

  function createPreviewURL(e: any) {
    const files: FileList = e.target.files
    file = files[0]
    previewURL = URL.createObjectURL(file)
  }

  async function uploadProfileImg(file: File) {
    uploading = true
    const storageRef = ref(storage, `users/${$user!.uid}/profile.png`)
    const metadata = {
      cacheControl: 'public,max-age=86400',
    }
    const result = await uploadBytes(storageRef, file, metadata)
    const photoURL = await getDownloadURL(result.ref)
    await updateDoc(doc(db, 'users', $user!.uid), { photoURL })
    fileInput.value = ``
    uploading = false
  }

  async function updateProfile() {
    submitting = true
    if (file) {
      await uploadProfileImg(file)
    }
    const data = {
      firstName,
      lastName,
    }
    await updateUserData(data)
    // await new Promise((r) => setTimeout(r, 3000))
    submitting = false
    file = null
  }

  type ProfileData = {
    firstName: string
    lastName: string
  }

  async function updateUserData(data: ProfileData) {
    const ref = doc(db, `users/${$user?.uid}`)
    await updateDoc(ref, data)
  }

  async function deleteAccount(e: Event) {
    const batch = writeBatch(db)
    batch.delete(doc(db, `usernames`, username))
    batch.delete(doc(db, `users`, $user!.uid))
    await batch.commit()
    console.log(`Firestore documents deleted`)
    try {
      await deleteUser($user!)
    } catch (e: any) {
      const { message } = e
      if (message.includes(`requires-recent-login`)) {
        errorMsg = `Recent sign in required.  Please log out, in, and try again.`
      }
      showModal = false
      return
    }
    console.log(`User Firebase account deleted`)
    showModal = false
    signOutSSR()
  }
</script>

<main class="card w-5/6 bg-base-200 mx-auto">
  <div class="card-body items-center text-center">
    <form class="w-4/5 flex flex-col" on:submit|preventDefault={updateProfile}>
      <label class="label" for="firstname">
        <span class="label-text">First Name</span>
      </label>
      <input
        name="firstname"
        type="text"
        class="input input-bordered w-full"
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
        class="input input-bordered w-full"
        bind:value={lastName}
        class:input-error={lastNameNotValid}
      />

      <label class="label" for="email">
        <span class="label-text">Email</span>
      </label>
      <Tooltip {tooltipText} showTooltip={true}>
        <input
          disabled
          name="email"
          type="text"
          placeholder="Email"
          class="input w-full"
          value={userEmail}
        />
      </Tooltip>

      <img
        src={previewURL ?? photoURL ?? '/default_profile_img.png'}
        alt="photoURL"
        width="256"
        height="256"
        class="mx-auto mt-2"
      />
      <input
        type="file"
        class="file-input file-input-bordered w-full max-w-xs mx-auto mt-2"
        on:change={createPreviewURL}
        bind:this={fileInput}
        name="photoURL"
        accept="image/png, image/jpeg, image/gif, image/webp"
      />
      {#if uploading}
        <p>Uploading...</p>
        <progress class="progress progress-info w-full mt-6" />
      {/if}

      <button
        class="btn btn-outline btn-accent m-3 mx-auto"
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
    <button class="w-full" on:click={() => (showDangerZone = !showDangerZone)}>
      <Divider dividerText={`Danger Zone`} />
    </button>
    {#if showDangerZone}
      <!-- <button on:click={deleteAccount} class="btn btn-error btn-outline mx-auto"
        >Delete Account</button
      > -->
      <!-- Open the modal using ID.showModal() method -->
      <button
        class="btn btn-error btn-outline mx-auto"
        on:click={() => (showModal = true)}>Delete Account</button
      >
      {#if errorMsg !== ``}
        <div class="alert alert-error">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            ><path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            /></svg
          >
          <span>{errorMsg}</span>
        </div>
      {/if}
      {#if showModal}
        <div class:modal-open={showModal} class="modal">
          <div class="modal-box">
            <h3 class="font-bold text-lg">Really? Delete Your Account?</h3>
            <p class="py-4">This cannot be undone. Choose wisely.</p>
            <div class="modal-action">
              <button class="btn" on:click={() => (showModal = false)}
                >Cancel</button
              >
              <button class="btn btn-error btn-outline" on:click={deleteAccount}
                >Delete Account</button
              >
            </div>
          </div>
        </div>
      {/if}
    {/if}
  </div>
</main>
