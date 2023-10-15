<script lang="ts">
  import { sentenceRe } from '$lib/JS Helpers/re'
  import { user, db } from '$lib/firebase'
  import { arrayUnion, doc, updateDoc, getDoc } from 'firebase/firestore'
  export let photoURL = '/default_profile_img.png'
  export let storyBody = ``
  export let lastPostUID: string
  export let storyId: string
  export let rerenderStory: boolean

  $: uid = $user?.uid
  $: storyBodyPasses = sentenceRe.test(storyBody)
  $: eligibleToPost = $user && lastPostUID && lastPostUID !== uid
  //   console.log(Boolean($user))
  //   console.log({ lastPostUID })
  //   console.log($user?.uid)
  //   console.log(lastPostUID !== $user?.uid)
  //   console.log({ eligibleToPost })

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
  }
</script>

<div
  class="w-full bg-base-300 flex justify-center p-2 rounded-lg not-prose no-underline my-1"
>
  <!-- {#if eligibleToPost} -->
  {#if true}
    <div class="flex w-full not-prose no-underline">
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
        class="btn m-1"
        class:hidden={!storyBodyPasses}
        on:click={addSentence}
      >
        <img src="/green_check.png" alt="green_check" height="20" width="20" />
      </button>
    </div>
  {:else}
    Someone else needs to post before you can add to this story!
  {/if}
</div>
