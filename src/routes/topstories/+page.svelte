<script lang="ts">
  import type { PageData } from './$types'
  import { user } from '$lib/firebase'
  import MyStoryLink from '$lib/components/MyStoryLink.svelte'

  export let data: PageData

  const { topStoriesQSnapshot } = data
  console.log({ $topStoriesQSnapshot })
  const topStoriesDocs = $topStoriesQSnapshot?.docs
  console.log(topStoriesDocs.length)
  const itemsPerPage = 2
  const totalPages = Math.ceil(topStoriesDocs.length / itemsPerPage)
  let currentPage = 1
  $: lowerBound = (currentPage - 1) * itemsPerPage
  $: upperBound = lowerBound + itemsPerPage
  $: filteredTopStories = topStoriesDocs.filter(
    (_: any, index: number) => index >= lowerBound && index < upperBound
  )
  const uid = $user?.uid

  function pageChange(e: any) {
    const pageNumClicked = Number(e.target?.innerText)
    console.log({ pageNumClicked })
    currentPage = pageNumClicked
    console.log({ lowerBound, upperBound })
    console.log({ filteredTopStories })
  }
</script>

<main class="card w-5/6 bg-base-200 mx-auto shadow-xl">
  <div class="card-body items-center text-center">
    <h1 class="card-title text-5xl font-bold p-5">Top Stories</h1>
    {#each filteredTopStories as storySnapshot}
      <MyStoryLink {uid} {storySnapshot} />
    {/each}
  </div>
  <div class="join justify-center">
    {#each Array(totalPages) as _, index}
      <button
        on:click={pageChange}
        class:btn-active={index + 1 === currentPage}
        class="join-item btn">{index + 1}</button
      >
    {/each}
  </div>
</main>
