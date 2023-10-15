<script lang="ts">
  import type { PageData } from './$types'
  import { onMount } from 'svelte'
  import { goto } from '$app/navigation'
  import { ref, getDownloadURL, uploadBytes } from 'firebase/storage'
  import { user, userData, storage, db } from '$lib/firebase'
  import { collection, doc, setDoc } from 'firebase/firestore'
  import AuthCheck from '$lib/components/AuthCheck.svelte'
  export let data: PageData
  import { sentenceRe, titleRe } from '$lib/JS Helpers/re'

  const { campfireTaleTitles } = data
  let randomTitle = ``
  let previewURL: string
  let file: File
  let storyTitle: string
  let storyBody: string

  // const sentenceRe = /^(?:[A-Z'"].{8,98}[.!?])(['"])?$/
  // const titleRe = /^[A-Z'"'].{3,24}/
  $: imagePasses = Boolean(file)
  $: titlePasses = titleRe.test(storyTitle)
  $: storyBodyPasses = sentenceRe.test(storyBody)
  $: submitDisabled = !imagePasses || !titlePasses || !storyBodyPasses

  function createPreviewURL(e: any) {
    const files = e.target.files
    file = files[0]
    previewURL = URL.createObjectURL(file)
  }

  async function createStory() {
    const timestamp = new Date()
    const uid = $user?.uid
    const username = $userData?.username

    const newStoryRef = doc(collection(db, `stories`))
    const { id } = newStoryRef
    const storyImgURL = await uploadStoryImg(id)
    await setDoc(newStoryRef, {
      uid,
      likes: [],
      username,
      storyTitle,
      timestamp,
      story: [
        {
          timestamp,
          storyBody,
          uid,
        },
      ],
      storyImgURL,
    })
    goto(`/stories/${id}`, {
      invalidateAll: true,
    })
  }

  async function uploadStoryImg(id: String) {
    const storageRef = ref(storage, `stories/${id}/storyImg.png`)
    const result = await uploadBytes(storageRef, file)
    return await getDownloadURL(result.ref)
  }

  onMount(() => {
    randomTitle =
      campfireTaleTitles[Math.floor(Math.random() * campfireTaleTitles.length)]
  })
</script>

<AuthCheck>
  <main class="card w-4/6 bg-base-200 mx-auto shadow-xl">
    <div class="card-body items-center text-center">
      <h1 class="card-title text-5xl font-bold p-5">
        Start Telling A New Story
      </h1>
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
        class="file-input file-input-sm w-full max-w-xs"
        on:change={createPreviewURL}
        name="storyImg"
        accept="image/png, image/jpeg, image/gif, image/webp"
        class:file-input-success={imagePasses}
      />
      <input
        type="text"
        name="storyTitle"
        bind:value={storyTitle}
        placeholder={randomTitle}
        class="input text-3xl font-bold w-full bg-inherit"
        class:input-success={titlePasses}
      />
      <textarea
        name="storyBody"
        bind:value={storyBody}
        placeholder="It was a dark and stormy night..."
        class="textarea font-bold w-full bg-inherit"
        class:textarea-success={storyBodyPasses}
      />
      <div class="card-actions w-full justify-end">
        {#if submitDisabled}
          <div class="tooltip" data-tip="Image, title, & sentence required">
            <button disabled={submitDisabled} class="btn btn-primary m-1"
              >Submit</button
            >
          </div>
        {:else}
          <button
            on:click={createStory}
            disabled={submitDisabled}
            class="btn btn-primary m-1">Submit</button
          >
        {/if}
      </div>
    </div>
  </main>
</AuthCheck>
