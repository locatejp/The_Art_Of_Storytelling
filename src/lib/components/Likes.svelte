<script lang="ts">
  import { db, user } from '$lib/firebase'
  import {
    arrayRemove,
    arrayUnion,
    doc,
    updateDoc,
    getDoc,
  } from 'firebase/firestore'
  export let likesArr: string[]
  export let storyId: string

  const uid = $user?.uid
  $: liked = uid && likesArr?.includes(uid)
  $: likedCount = likesArr?.length ?? `-`

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
        likedCount,
      })
    }
    liked = true
    likedCount++
    await updateDoc(storiesRef, {
      likes: arrayUnion(uid),
      likedCount,
    })
  }
</script>

<button on:click={toggleLike} class="btn btn-sm m-1">
  {#if liked}
    <img src="/heart_filled.png" alt="heart_filled" height="20" width="20" />
  {:else}
    <img src="/heart_outline.png" alt="heart_outline" height="20" width="20" />
  {/if}
  <span class="text">{likedCount}</span>
</button>
