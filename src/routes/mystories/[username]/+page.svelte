<script lang="ts">
  import type { PageData } from './$types'
  import { userData } from '$lib/firebase'
  import MyStoryLink from '$lib/components/MyStoryLink.svelte'

  export let data: PageData
  const { myStoriesQueryDocs } = data
  let idArr = myStoriesQueryDocs?.docs.map((item: { id: any }) => item.id)
  const handle = `@${$userData?.username}'s `
</script>

<main class="card w-5/6 bg-base-200 mx-auto shadow-xl">
  <div class="card-body items-center text-center">
    {#if $userData}
      <div class="tooltip" data-tip="Created & Liked Stories">
        <h1 class="card-title text-5xl font-bold p-2">
          {handle}
          Stories
        </h1>
      </div>
    {/if}
    {#each idArr as storyId}
      <MyStoryLink {storyId} />
    {/each}
  </div>
</main>
