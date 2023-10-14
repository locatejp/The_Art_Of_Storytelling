<script lang="ts">
  import type { PageData } from './$types'
  import { page } from '$app/stores'
  import { user } from '$lib/firebase'
  import StoryItem from '$lib/components/StoryItem.svelte'

  const storyId = $page.params.storyId

  export let data: PageData
  console.log(`client`)
  console.log({ data })
</script>

<main class="card w-4/6 bg-base-200 mx-auto shadow-xl">
  <div class="card-body items-center text-center">
    <h1 class="card-title text-5xl font-bold p-5">
      {data.storyTitle}
    </h1>
    <figure>
      <img
        class="rounded-t-3xl w-3/5"
        src={data.storyImgURL}
        alt="StoryImage"
        width="800"
        height="800"
      />
    </figure>
    <div class="flex">
      {#if $user}
        <img
          src="/heart_filled.png"
          alt="heart_filled"
          height="20"
          width="20"
        />
      {:else}
        <img
          src="/heart_outline.png"
          alt="heart_outline"
          height="20"
          width="20"
        />
      {/if}
      <span class="text mx-2">{data.likes}</span>
    </div>
    <ul class="list-none p-0 flex flex-col w-full">
      {#each data.story as entry}
        <StoryItem {entry} />
      {/each}
    </ul>
    <!-- <input
      type="text"
      name="storyTitle"
      bind:value={storyTitle}
      placeholder={randomTitle}
      class="input text-3xl font-bold w-full bg-inherit"
      class:input-success={titlePasses}
    />
    <textarea
      name="storyBody"
      bind:value={storyBody}
      placeholder="It was a dark and stormy night..."
      class="textarea font-bold w-full bg-inherit"
      class:textarea-success={storyBodyPasses}
    />
    <div class="card-actions w-full justify-end">
      {#if submitDisabled}
        <div class="tooltip" data-tip="Image, title, & sentence required">
          <button disabled={submitDisabled} class="btn btn-primary m-1"
            >Submit</button
          >
        </div>
      {:else}
        <button
          on:click={createStory}
          disabled={submitDisabled}
          class="btn btn-primary m-1">Submit</button
        >
      {/if}
    </div> -->
  </div>
</main>
