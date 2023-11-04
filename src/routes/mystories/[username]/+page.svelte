<script lang="ts">
  import type { PageData } from './$types'
  import { userData } from '$lib/firebase'
  import MyStoryLink from '$lib/components/MyStoryLink.svelte'
  import Pagination from '$lib/components/Pagination.svelte'
  import { page } from '$app/stores'

  export let data: PageData
  const { myStoriesQueryDocs } = data
  const username = $userData?.username
  let allItemsArr = myStoriesQueryDocs?.docs.map((item: { id: any }) => item.id)
  const handle = `@${username}'s `

  const itemsPerPage = 2
  const endpoint = `/mystories/${username}`
  $: totalPages = Math.ceil(allItemsArr?.length / itemsPerPage)
  $: activePage = Number($page.url?.searchParams?.get(`pageId`)) || 1
  $: setItemsArray(activePage)

  let activeArr: any[] = []
  function setItemsArray(activePage: number) {
    const start = (activePage - 1) * itemsPerPage
    const end = start + itemsPerPage
    activeArr = allItemsArr.slice(start, end)
  }
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
    {#each activeArr as storyId}
      <MyStoryLink {storyId} />
    {/each}
    <Pagination
      {totalPages}
      {allItemsArr}
      {itemsPerPage}
      {activePage}
      {endpoint}
    />
  </div>
</main>
