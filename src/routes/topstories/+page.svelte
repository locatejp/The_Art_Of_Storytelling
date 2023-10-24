<script lang="ts">
  import type { PageData } from './$types'
  import { user } from '$lib/firebase'
  import MyStoryLink from '$lib/components/MyStoryLink.svelte'

  export let data: PageData
  const { topStoriesQSnapshot } = data
  console.log({ $topStoriesQSnapshot })
  const uid = $user?.uid
</script>

<main class="card w-5/6 bg-base-200 mx-auto shadow-xl">
  <div class="card-body items-center text-center">
    <h1 class="card-title text-5xl font-bold p-5">Top Stories</h1>
    {#each $topStoriesQSnapshot?.docs as storySnapshot}
      <MyStoryLink {uid} {storySnapshot} />
    {/each}
  </div>
</main>
