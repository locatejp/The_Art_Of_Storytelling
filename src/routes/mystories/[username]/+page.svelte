<script lang="ts">
  import type { PageData } from './$types'
  import { userData } from '$lib/firebase'
  import MyStoryLink from '$lib/components/MyStoryLink.svelte'
  import Pagination from '$lib/components/Pagination.svelte'
  import SearchBar from '$lib/components/SearchBar.svelte'
  import Swap from '$lib/components/Swap.svelte'
  import { page } from '$app/stores'

  export let data: PageData
  const { storiesDataArr } = data
  let filteredStoriesArr = storiesDataArr
  let filteredIdArr = storiesDataArr.map((item) => item?.storyId)
  let searchValue = ``
  let searchContent = `storyTitle`
  const swapOnLabel = `Titles`
  const swapOffLabel = `Stories`
  const itemsPerPage = 2
  const username = $userData?.username
  const handle = `@${username}'s `
  const endpoint = `/mystories/${username}`

  $: totalPages = Math.ceil(filteredStoriesArr?.length / itemsPerPage)
  $: activePage = Number($page.url?.searchParams?.get(`pageId`)) || 1
  $: setItemsArray(activePage, filteredStoriesArr)
  $: showPrimaryBorder = Boolean(searchValue)

  function handleSwapClick(e: any) {
    const { checked } = e.target
    searchContent = checked ? `storyTitle` : `storyFullBody`
    searchValue = ``
    handleSearchChange()
    console.log({ searchContent })
  }

  type story = {
    storyTitle: any
    storyFullBody: any
    storyId: string
  }

  function handleSearchChange() {
    filteredStoriesArr = storiesDataArr.filter((story) =>
      story[searchContent as keyof story]
        ?.toLowerCase()
        ?.includes(searchValue?.toLowerCase())
    )
    filteredIdArr = filteredStoriesArr
      ?.slice(0, itemsPerPage)
      ?.map((item) => item?.storyId)
  }

  function setItemsArray(activePage: number, filteredStoriesArr: any[]) {
    const start = (activePage - 1) * itemsPerPage
    const end = start + itemsPerPage
    filteredIdArr = filteredStoriesArr
      .slice(start, end)
      .map((item) => item?.storyId)
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
    <SearchBar bind:searchValue {handleSearchChange} {showPrimaryBorder}>
      <Swap {handleSwapClick} {swapOnLabel} {swapOffLabel} />
    </SearchBar>
    {#each filteredIdArr as storyId}
      <MyStoryLink {storyId} />
    {/each}
    <Pagination {totalPages} {activePage} {endpoint} />
  </div>
</main>
