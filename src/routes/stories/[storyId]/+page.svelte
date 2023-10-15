<script lang="ts">
  import type { PageData } from './$types'
  import { page } from '$app/stores'
  import { user, userData } from '$lib/firebase'
  import StoryItem from '$lib/components/StoryItem.svelte'
  import Likes from '$lib/components/Likes.svelte'
  import StoryCloser from '$lib/components/StoryCloser.svelte'

  export let data: PageData
  const { storyData } = data
  console.log({ storyData })
  console.log({ $storyData })
  $: photoURL = $userData?.photoURL
  const storyId = $page.params.storyId
  // let likes: string[] = data.likes
  $: likes = $storyData?.likes
  $: uid = $user?.uid
  $: lastPostUID = $storyData?.story?.at(-1)?.uid
  let rerenderStory = false
</script>

<main class="card w-5/6 bg-base-200 mx-auto shadow-xl">
  <div class="card-body items-center text-center">
    <h1 class="card-title text-5xl font-bold p-5">
      {$storyData?.storyTitle}
    </h1>
    <figure>
      <img
        class="rounded-t-3xl w-3/5"
        src={$storyData?.storyImgURL}
        alt="StoryImage"
        width="800"
        height="800"
      />
    </figure>
    <Likes {likes} {uid} {storyId} />
    {#if $storyData}
      <ul class="list-none p-0 flex flex-col w-full">
        {#each $storyData?.story as entry}
          <StoryItem {entry} />
        {/each}
        <StoryCloser {lastPostUID} {photoURL} {storyId} {rerenderStory} />
      </ul>
    {/if}
  </div>
</main>
