<script lang="ts">
  import type { PageData } from './$types'
  import MyStoryLink from '$lib/components/MyStoryLink.svelte'
  import Pagination from '$lib/components/Pagination.svelte'
  import SearchBar from '$lib/components/SearchBar.svelte'
  import { page } from '$app/stores'

  export let data: PageData
  let { topStoriesSnapshot, topStoriesDataArr } = data
  console.log({ topStoriesDataArr })
  // let allItemsArr = topStoriesSnapshot?.docs.map((item: { id: any }) => item.id)

  const itemsPerPage = 2
  const endpoint = `/topstories`
  $: totalPages = Math.ceil(topStoriesDataArr?.length / itemsPerPage)
  $: activePage = Number($page.url?.searchParams?.get(`pageId`)) || 1
  $: setItemsArray(activePage)

  $: searchValue = ``
  function handleSearchChange(e: any) {
    const { data } = e
    console.log({ data })
  }
  $: showPrimaryBorder = Boolean(searchValue)

  let activeArr: any[] = []
  function setItemsArray(activePage: number) {
    const start = (activePage - 1) * itemsPerPage
    const end = start + itemsPerPage
    activeArr = topStoriesDataArr.slice(start, end).map((item) => item?.storyId)
    console.log({ activeArr })
  }
</script>

<main class="card w-5/6 bg-base-200 mx-auto shadow-xl">
  <div class="card-body items-center text-center">
    <h1 class="card-title text-5xl font-bold p-5">Top Stories</h1>
    <SearchBar bind:searchValue {handleSearchChange} {showPrimaryBorder} />
    {#each activeArr as storyId}
      <MyStoryLink {storyId} />
    {/each}
  </div>
  <Pagination {totalPages} {activePage} {endpoint} />
</main>
