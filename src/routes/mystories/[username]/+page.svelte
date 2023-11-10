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
  console.log({ storiesDataArr })
  let filteredStoriesArr = storiesDataArr
  let filteredIdArr = storiesDataArr?.map((item) => item?.storyId)
  let searchValue = ``
  let searchContent = `storyTitle`
  const swapOnLabel = `Titles`
  const swapOffLabel = `Stories`
  const itemsPerPage = 2
  $: username = $userData?.username
  $: endpoint = `/mystories/${username}`
  $: paramPage = Number($page.url?.searchParams?.get(`pageId`)) || 1
  $: totalPages =
    (filteredStoriesArr &&
      Math.ceil(filteredStoriesArr?.length / itemsPerPage)) ||
    1
  $: activePage = Boolean(searchValue) ? 1 : paramPage
  $: setItemsArray(activePage, filteredStoriesArr)
  $: showPrimaryBorder = Boolean(searchValue)
  $: handle = `@${username}'s `

  function handleSwapClick(e: any) {
    const { checked } = e.target
    searchContent = checked ? `storyTitle` : `storyFullBody`
    searchValue = ``
    handleSearchChange()
  }

  type story = {
    storyTitle: any
    storyFullBody: any
    storyId: string
  }

  function handleSearchChange() {
    console.log({ storiesDataArr, searchContent, searchValue })
    filteredStoriesArr = storiesDataArr?.filter((story) => {
      console.log(story[searchContent as keyof story])
      return story[searchContent as keyof story]
        ?.toLowerCase()
        ?.includes(searchValue?.toLowerCase())
    })
    console.log({ filteredStoriesArr })
    filteredIdArr = filteredStoriesArr
      ?.slice(0, itemsPerPage)
      ?.map((item) => item?.storyId)
    console.log({ filteredIdArr })
  }

  function setItemsArray(
    activePage: number,
    filteredStoriesArr: any[] | undefined
  ) {
    const start = (activePage - 1) * itemsPerPage
    const end = start + itemsPerPage
    filteredIdArr = filteredStoriesArr
      ?.slice(start, end)
      ?.map((item) => item?.storyId)
  }
</script>

<main class="card w-5/6 bg-base-200 mx-auto shadow-xl">
  <div class="card-body items-center text-center">
    {#if !filteredIdArr}
      <h2 class="card-title text-5xl font-bold p-2">
        You Haven't Started<br />
        or Liked Any Stories Yet!
      </h2>
      <div
        class="join join-vertical space-y-4 lg:space-y-0 lg:join-horizontal lg:space-x-4"
      >
        <a href="/stories" class="btn btn-primary btn-outline">Start A Story</a>
        <a href="/topstories" class="btn btn-primary btn-outline"
          >Browse Top Stories</a
        >
      </div>
    {:else if $userData}
      <div class="tooltip" data-tip="Created & Liked Stories">
        <h1 class="card-title text-5xl font-bold p-2">
          {handle}
          Stories
        </h1>
      </div>
      <SearchBar bind:searchValue {handleSearchChange} {showPrimaryBorder}>
        <Swap {handleSwapClick} {swapOnLabel} {swapOffLabel} />
      </SearchBar>
      {#each filteredIdArr as storyId}
        <MyStoryLink {storyId} />
      {/each}
      <Pagination {totalPages} {activePage} {endpoint} />
    {/if}
  </div>
</main>
