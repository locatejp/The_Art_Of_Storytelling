<script lang="ts">
  import type { PageData } from './$types'
  import { onMount } from 'svelte'
  import { enhance } from '$app/forms'
  import { ref, getDownloadURL, uploadBytes } from 'firebase/storage'
  import { user, userData, storage, db } from '$lib/firebase'
  import { updateDoc, doc } from 'firebase/firestore'
  import AuthCheck from '$lib/components/AuthCheck.svelte'
  export let data: PageData

  const { campfireTaleTitles } = data
  let randomTitle = ``
  campfireTaleTitles[Math.floor(Math.random() * campfireTaleTitles.length)]

  let previewURL: string
  let fileInput: string | ArrayBuffer | null | undefined
  let files: FileList
  let uploading = false
  let storyTitle: string
  let storyBody: string

  function createPreviewURL(e: any) {
    files = e.target.files
    console.log({ files })
    const file = files[0]
    console.log({ file })
    previewURL = URL.createObjectURL(file)
    const reader = new FileReader()
    // reader.readAsDataURL(file)
    reader.onload = (e) => {
      fileInput = e.target?.result
      console.log({ fileInput })
    }
  }

  async function upload(e: any) {
    uploading = true
    const file = e.target.files[0]
    previewURL = URL.createObjectURL(file)
    const storageRef = ref(storage, `users/${$user!.uid}/stories/uuid.png`)
    console.log({ storageRef })
    const result = await uploadBytes(storageRef, file)
    console.log({ result })
    const photoURL = await getDownloadURL(result.ref)
    console.log({ photoURL })

    await updateDoc(doc(db, 'users', $user!.uid), { photoURL })
    uploading = false
  }

  $: enableSubmit = !Boolean(storyTitle && storyBody)

  onMount(() => {
    randomTitle = `${
      campfireTaleTitles[Math.floor(Math.random() * campfireTaleTitles.length)]
    }...`
  })
</script>

<!-- <AuthCheck> -->
<main class="card w-4/6 bg-base-200 mx-auto shadow-xl">
  <div class="card-body items-center text-center">
    <h1 class="card-title text-5xl font-bold p-5">Start Telling A New Story</h1>
    <figure>
      <img
        class="rounded-t-3xl w-3/5"
        src={previewURL ?? '/default_story_img.png'}
        alt="StoryImage"
        width="800"
        height="800"
      />
    </figure>
    <form method="POST" use:enhance>
      <input
        type="file"
        class="file-input file-input-sm w-full max-w-xs"
        on:change={createPreviewURL}
        bind:value={fileInput}
        bind:files
        name="storyImg"
        accept="image/png, image/jpeg, image/gif, image/webp"
      />
      <input
        type="text"
        name="storyTitle"
        bind:value={storyTitle}
        placeholder={randomTitle}
        class="input text-3xl font-bold w-full bg-inherit"
      />
      <textarea
        name="storyBody"
        bind:value={storyBody}
        placeholder="It was a dark and stormy night..."
        class="textarea font-bold w-full bg-inherit"
      />
      <div class="card-actions w-full justify-end">
        <button disabled={enableSubmit} class="btn btn-primary m-1"
          >Submit</button
        >
      </div>
    </form>
  </div>
</main>
<!-- </AuthCheck> -->
