<script lang="ts">
  import { user } from '$lib/firebase'
  export let uid: string | undefined
  export let likes: string[]
  export let storyId: string
  import { db } from '$lib/firebase'
  import {
    arrayRemove,
    arrayUnion,
    doc,
    updateDoc,
    getDoc,
  } from 'firebase/firestore'

  async function toggleLike() {
    if (!$user) {
      return
    }

    const storiesRef = doc(db, `stories`, storyId)
    const storiesSnapshot = await getDoc(storiesRef)
    const storiesData = storiesSnapshot.data()
    const liveLikes = storiesData?.likes

    if (liveLikes?.includes(uid)) {
      liked = false
      likedCount--
      return await updateDoc(storiesRef, {
        likes: arrayRemove(uid),
      })
    }
    liked = true
    likedCount++
    await updateDoc(storiesRef, {
      likes: arrayUnion(uid),
    })
  }

  $: liked = uid && likes?.includes(uid)
  $: likedCount = likes?.length
</script>

<button on:click={toggleLike} class="btn">
  {#if liked}
    <img src="/heart_filled.png" alt="heart_filled" height="20" width="20" />
  {:else}
    <img src="/heart_outline.png" alt="heart_outline" height="20" width="20" />
  {/if}
  <span class="text">{likedCount}</span>
</button>
