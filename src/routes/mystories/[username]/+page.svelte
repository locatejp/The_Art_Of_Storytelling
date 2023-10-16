<script lang="ts">
  import type { PageData } from './$types'
  import { userData } from '$lib/firebase'
  import MyStoryLink from '$lib/components/MyStoryLink.svelte'

  export let data: PageData
  $: myStoriesQSnapshot = data.myStoriesQSnapshot
  console.log({ $myStoriesQSnapshot })
  $: handle = `@${$userData?.username}'s `
</script>

<main class="card w-5/6 bg-base-200 mx-auto shadow-xl">
  <div class="card-body items-center text-center">
    <h1 class="card-title text-5xl font-bold p-5">
      {#if $userData}
        {handle}
      {/if}
      Stories
    </h1>
    {#each $myStoriesQSnapshot as storySnapshot}
      <MyStoryLink {storySnapshot} />
    {/each}
  </div>
</main>
