<script lang="ts">
  import type { PageData } from './$types'
  import { page } from '$app/stores'
  import { user, userData } from '$lib/firebase'
  import StoryItem from '$lib/components/StoryItem.svelte'
  import Likes from '$lib/components/Likes.svelte'
  import StoryCloser from '$lib/components/StoryCloser.svelte'

  export let data: PageData
  $: ({ storyData, topStoriesSnapshot } = data)

  const userUid = $user?.uid
  $: storyId = $page.params.storyId
  $: nextEligibleStory = topStoriesSnapshot?.docs.find((doc) => {
    const evalStoryId = doc.id
    const lastAuthorId = doc.data()?.story?.at(-1).uid
    console.log({ lastAuthorId, userUid, evalStoryId, storyId })
    return lastAuthorId !== userUid && evalStoryId !== storyId
  })
  $: nextEligibleStoryId = nextEligibleStory?.id
  $: nextStoryLink = `/stories/${nextEligibleStoryId}`

  $: photoURL = $userData?.photoURL
  $: likesArr = $storyData?.likes
  $: lastPostUID = $storyData?.story?.at(-1)?.uid
  let rerenderStory = false
</script>

<main class="card w-5/6 bg-base-200 mx-auto shadow-xl">
  <div class="card-body items-center text-center">
    {#if $storyData}
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
      <Likes {likesArr} {storyId} />
      <ul class="list-none p-0 flex flex-col w-full">
        {#each $storyData?.story as entry}
          <StoryItem {entry} />
        {/each}
        <StoryCloser
          {lastPostUID}
          {photoURL}
          {storyId}
          {rerenderStory}
          {nextStoryLink}
        />
      </ul>
    {/if}
  </div>
</main>
