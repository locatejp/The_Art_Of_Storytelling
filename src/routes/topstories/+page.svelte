<script lang="ts">
  import type { PageData } from './$types'
  import MyStoryLink from '$lib/components/MyStoryLink.svelte'

  export let data: PageData
  const { topStoriesSnapshot } = data
  let idArr = topStoriesSnapshot?.docs.map((item: { id: any }) => item.id)
  $: activeArr = idArr
</script>

<main class="card w-5/6 bg-base-200 mx-auto shadow-xl">
  <div class="card-body items-center text-center">
    <h1 class="card-title text-5xl font-bold p-5">Top Stories</h1>
    {#each activeArr as storyId}
      <MyStoryLink {storyId} />
    {/each}
  </div>
</main>
