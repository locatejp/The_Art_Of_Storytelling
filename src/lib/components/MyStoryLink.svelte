<script lang="ts">
  import type {
    DocumentData,
    QueryDocumentSnapshot,
  } from 'firebase-admin/firestore'
  import { onSnapshot, doc } from 'firebase/firestore'
  import { db } from '$lib/firebase'
  import Likes from './Likes.svelte'
  export let storySnapshot: QueryDocumentSnapshot
  export let uid: string | undefined

  const docRef = doc(db, `stories/${storySnapshot?.id}`)
  let storyData: DocumentData | undefined
  onSnapshot(docRef, (snapshot) => {
    storyData = snapshot.data()
  })
  $: likesArr = storyData?.likes
  $: storyId = storySnapshot?.id
  $: pageLink = `/stories/${storyId}`
  $: sentence = storyData?.story?.[0]?.storyBody ?? ``
  $: storyImgURL = storyData?.storyImgURL ?? `/default_profile_img.png`
  $: storyLength = storyData?.story?.length - 1
  $: ending = storyLength > 1 ? `other entries` : `other entry`
  $: otherEntries = Boolean(storyLength && ending)
    ? `+ ${storyLength} ${ending}`
    : ``
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
  <a class="w-full flex justify-start" href={pageLink}>
    <div class="text text-left text-base flex items-center">
      {sentence}
    </div>
    <div class="text text-base italic ps-2">{otherEntries}</div>
  </a>
</div>
