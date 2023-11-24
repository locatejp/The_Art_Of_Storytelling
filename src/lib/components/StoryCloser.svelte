<script lang="ts">
  import { sentenceRe } from '$lib/JS Helpers/re'
  import { user, userData, db } from '$lib/firebase'
  import { arrayUnion, doc, updateDoc, getDoc } from 'firebase/firestore'
  import TopStoriesBtn from './TopStoriesBtn.svelte'
  export let photoURL = '/default_profile_img.png'
  export let storyBody = ``
  export let lastPostUID: string
  export let storyId: string
  export let rerenderStory: boolean
  export let nextStoryLink: string

  $: uid = $user?.uid
  $: storyBodyPasses = sentenceRe.test(storyBody)
  $: eligibleToPost = $user && lastPostUID && lastPostUID !== uid
  console.log({ $user })

  async function addSentence() {
    const timestamp = new Date()
    const storiesRef = doc(db, `stories`, storyId)
    await updateDoc(storiesRef, {
      story: arrayUnion({
        timestamp,
        storyBody,
        uid,
      }),
    })
    rerenderStory = !rerenderStory
    storyBody = ``
  }
</script>

<div
  class="w-full bg-base-300 flex justify-center p-2 rounded-lg not-prose no-underline my-1"
>
  {#if eligibleToPost}
    <form
      class="flex w-full not-prose no-underline"
      on:submit|preventDefault={addSentence}
    >
      <img src={photoURL} alt="profileImg" class="rounded-full h-10 w-10 m-2" />
      <input
        type="text"
        name="storyBody"
        placeholder="Add your sentence here..."
        class="input text-base w-full bg-inherit p-2 m-1"
        bind:value={storyBody}
        class:input-success={storyBodyPasses}
      />
      <button
        class="btn btn-primary btn-outline border-4 m-1"
        type="submit"
        class:hidden={!storyBodyPasses}
      >
        <img src="/green_check.png" alt="green_check" height="20" width="20" />
      </button>
    </form>
  {:else if $user}
    <div class="flex flex-col w-full">
      Someone else needs to post before you can add to this story!
      <div
        class="join join-vertical space-y-4 lg:space-y-0 lg:join-horizontal lg:space-x-4 justify-center m-5"
      >
        <a class="btn btn-primary btn-outline" href={nextStoryLink}
          >Add To Another Story</a
        >
        <TopStoriesBtn />
      </div>
    </div>
  {:else}
    <TopStoriesBtn />
  {/if}
</div>
