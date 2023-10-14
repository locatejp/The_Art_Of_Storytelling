<script lang="ts">
  import type { PageData } from './$types'
  import { page } from '$app/stores'
  import { user } from '$lib/firebase'
  import StoryItem from '$lib/components/StoryItem.svelte'
  import Likes from '$lib/components/Likes.svelte'

  const storyId = $page.params.storyId
  export let data: PageData
  let likes: string[] = data.likes
  let uid = $user?.uid
</script>

<main class="card w-4/6 bg-base-200 mx-auto shadow-xl">
  <div class="card-body items-center text-center">
    <h1 class="card-title text-5xl font-bold p-5">
      {data.storyTitle}
    </h1>
    <figure>
      <img
        class="rounded-t-3xl w-3/5"
        src={data.storyImgURL}
        alt="StoryImage"
        width="800"
        height="800"
      />
    </figure>
    <Likes {likes} {uid} {storyId} />
    <ul class="list-none p-0 flex flex-col w-full">
      {#each data.story as entry}
        <StoryItem {entry} />
      {/each}
    </ul>
  </div>
</main>
