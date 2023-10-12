<script lang="ts">
  import type { PageData } from './$types'
  import { onMount } from 'svelte'
  import { ref, getDownloadURL, uploadBytes } from 'firebase/storage'
  import { user, userData, storage, db } from '$lib/firebase'
  import { updateDoc, doc } from 'firebase/firestore'
  import AuthCheck from '$lib/components/AuthCheck.svelte'
  export let data: PageData

  const { campfireTaleTitles } = data
  let randomTitle = ``
  campfireTaleTitles[Math.floor(Math.random() * campfireTaleTitles.length)]

  let previewURL: string
  let uploading = false

  function createPreviewURL(e: any) {
    const file = e.target.files[0]
    previewURL = URL.createObjectURL(file)
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
    <input
      type="file"
      class="file-input file-input-bordered w-full max-w-xs"
      on:change={createPreviewURL}
      name="photoURL"
      accept="image/png, image/jpeg, image/gif, image/webp"
    />
    <input
      type="text"
      placeholder={randomTitle}
      class="input text-3xl font-bold w-full bg-inherit"
    />
    <textarea
      placeholder="It was a dark and stormy night..."
      class="textarea font-bold w-full bg-inherit"
    />
    <div class="card-actions justify-end">
      <button class="btn btn-primary">Submit</button>
    </div>
  </div>
</main>
<!-- </AuthCheck> -->
