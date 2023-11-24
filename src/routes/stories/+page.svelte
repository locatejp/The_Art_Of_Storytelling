<script lang="ts">
  import { goto } from '$app/navigation'
  import { ref, getDownloadURL, uploadBytes } from 'firebase/storage'
  import { user, userData, storage, db } from '$lib/firebase'
  import { collection, doc, setDoc } from 'firebase/firestore'
  import AuthCheck from '$lib/components/AuthCheck.svelte'
  import Tooltip from '$lib/components/Tooltip.svelte'
  import { sentenceRe, titleRe } from '$lib/JS Helpers/re'

  let previewURL: string
  let file: File
  let storyTitle: string
  let storyBody: string
  const tooltipText = `Image, title, & sentence required`

  $: imagePasses = Boolean(file)
  $: titlePasses = titleRe.test(storyTitle?.trim())
  $: storyBodyPasses = sentenceRe.test(storyBody?.trim())
  $: titleTooLong = storyTitle?.length > 50
  $: bodyTooLong = storyBody?.length > 200
  $: submitDisabled =
    submitting || !imagePasses || !titlePasses || !storyBodyPasses
  $: submitting = false

  function createPreviewURL(e: any) {
    const files = e.target.files
    file = files[0]
    previewURL = URL.createObjectURL(file)
  }

  async function createStory() {
    submitting = true
    const timestamp = new Date()
    const uid = $user?.uid
    const username = $userData?.username
    const newStoryRef = doc(collection(db, `stories`))
    const { id } = newStoryRef
    const storyImgURL = await uploadStoryImg(id)
    storyTitle = storyTitle.trim()
    storyBody = storyBody.trim()
    await setDoc(newStoryRef, {
      uid,
      likes: [],
      likedCount: 0,
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
      storyLength: 1,
      storyImgURL,
    })
    submitting = false
    goto(`/stories/${id}`, {
      invalidateAll: true,
    })
  }

  async function uploadStoryImg(id: String) {
    const storageRef = ref(storage, `stories/${id}/storyImg.png`)
    const metadata = {
      cacheControl: 'public,max-age=86400',
    }
    const result = await uploadBytes(storageRef, file, metadata)
    return await getDownloadURL(result.ref)
  }
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
      <form on:submit|preventDefault={createStory}>
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
          placeholder="Story Title"
          class="input text-3xl font-bold w-full bg-inherit mb-2 mt-2"
          class:input-success={titlePasses}
          class:input-error={titleTooLong}
        />
        <textarea
          name="storyBody"
          bind:value={storyBody}
          placeholder="Opening sentence for your story"
          class="textarea font-bold w-full bg-inherit"
          class:textarea-success={storyBodyPasses}
          class:textarea-error={bodyTooLong}
        />
        <div class="card-actions w-full justify-end">
          <Tooltip showTooltip={submitDisabled} {tooltipText}>
            <button
              type="submit"
              disabled={submitDisabled}
              class="btn btn-primary btn-outline m-1"
              >{#if submitting}
                <span class="loading loading-spinner" />
              {/if}
              Submit
            </button>
          </Tooltip>
        </div>
      </form>
    </div>
  </main>
</AuthCheck>
