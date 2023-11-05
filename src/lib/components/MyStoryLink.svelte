<script lang="ts">
  import type { DocumentData, Unsubscribe } from 'firebase/firestore'
  import { onSnapshot, doc } from 'firebase/firestore'
  import { db } from '$lib/firebase'
  import Likes from './Likes.svelte'
  import { onDestroy } from 'svelte'
  export let storyId: string

  let storyData: DocumentData | undefined, unsubscribe: Unsubscribe
  $: setStory(storyId)
  $: likesArr = storyData?.likes
  $: storyData = storyData
  $: pageLink = `/stories/${storyId}`
  $: sentence = storyData?.story?.[0]?.storyBody ?? ``
  $: storyTitle = storyData?.storyTitle || `...`
  $: storyImgURL = storyData?.storyImgURL ?? `/default_profile_img.png`
  $: storyLength = storyData?.story?.length - 1
  $: ending = storyLength > 1 ? `other entries` : `other entry`
  $: otherEntries = Boolean(storyLength && ending)
    ? `+ ${storyLength} ${ending}`
    : ``

  function setStory(storyId: string) {
    const docRef = doc(db, `stories/${storyId}`)
    unsubscribe = onSnapshot(docRef, (snapshot) => {
      storyData = snapshot.data()
    })
  }

  onDestroy(() => {
    unsubscribe()
  })
</script>

<div
  class="w-full bg-base-300 flex justify-start items-center p-2 rounded-lg not-prose no-underline my-1"
>
  <a href={pageLink}>
    <img
      src={storyImgURL}
      alt="storyImage"
      class="rounded-lg h-14 aspect-square m-1"
    />
  </a>
  <Likes {likesArr} {storyId} />
  <a class="w-full" href={pageLink}>
    <div class="flex flex-col text-start">
      <div class="text-primary text-2xl tracking-widest font-bold">
        {storyTitle}
      </div>
      <div class="flex justify-start">
        <div class="text text-left text-base flex items-center">
          {sentence}
        </div>
        <div class="text text-base italic ps-2">{otherEntries}</div>
      </div>
    </div>
  </a>
</div>
