<script lang="ts">
  import type { PageData } from './$types'
  import { user, userData } from '$lib/firebase'
  import MyStoryLink from '$lib/components/MyStoryLink.svelte'

  export let data: PageData
  const { userStoriesQueryDocs, pageUsername } = data
  const uid = $user?.uid
  $: handle = `@${pageUsername}'s `
  $: validID = pageUsername === $userData?.username
</script>

<main class="card w-5/6 bg-base-200 mx-auto shadow-xl">
  {#if validID}
    <div class="card-body items-center text-center">
      {#if $userData}
        <div class="tooltip" data-tip="Started & Liked Stories">
          <h1 class="card-title text-5xl font-bold p-2">
            {handle}
            Stories
          </h1>
        </div>
      {/if}
      {#each userStoriesQueryDocs as storySnapshot}
        <MyStoryLink {uid} {storySnapshot} />
      {/each}
    </div>
  {:else}
    <h2>You are not authorized to view this page!</h2>
  {/if}
</main>
