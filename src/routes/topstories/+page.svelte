<script lang="ts">
  import type { PageData } from './$types'
  import { userData } from '$lib/firebase'
  import MyStoryLink from '$lib/components/MyStoryLink.svelte'

  export let data: PageData
  const { topStoriesQSnapshot } = data
  console.log({ $topStoriesQSnapshot })
</script>

<main class="card w-5/6 bg-base-200 mx-auto shadow-xl">
  <div class="card-body items-center text-center">
    <h1 class="card-title text-5xl font-bold p-5">Top Stories</h1>
    {#each $topStoriesQSnapshot?.docs as storySnapshot}
      <MyStoryLink {storySnapshot} />
    {/each}
  </div>
</main>
