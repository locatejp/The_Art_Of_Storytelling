<script lang="ts">
  import type {
    DocumentData,
    QueryDocumentSnapshot,
  } from 'firebase-admin/firestore'
  import { onSnapshot, doc } from 'firebase/firestore'
  import { db } from '$lib/firebase'
  import Likes from './Likes.svelte'
  export let storySnapshot: QueryDocumentSnapshot

  const docRef = doc(db, `stories/${storySnapshot?.id}`)
  let storyData: DocumentData | undefined
  onSnapshot(docRef, (snapshot) => {
    storyData = snapshot.data()
  })
  console.log({ storyData })
  $: likes = storyData?.likes
  $: uid = storyData?.uid
  $: storyId = storySnapshot?.id
  $: pageLink = `/stories/${storyId}`
  $: sentence = storyData?.story?.[0]?.storyBody ?? ``
  $: storyImgURL = storyData?.storyImgURL ?? `/default_profile_img.png`
  $: storyLength = storyData?.story?.length - 1
  $: ending = storyData?.story?.length > 1 ? `other entries` : `other entry`
  $: otherEntries = Boolean(storyLength && ending)
    ? `+ ${storyLength} ${ending}`
    : ``
</script>

<a class="w-full" href={pageLink}>
  <div
    class="w-full bg-base-300 flex justify-start items-center p-2 rounded-lg not-prose no-underline my-1"
  >
    <img
      src={storyImgURL}
      alt="storyImage"
      class="rounded-lg h-14 aspect-square m-1"
    />
    <Likes {likes} {uid} {storyId} />
    <div class="text text-left text-base flex items-center">
      {sentence}
    </div>
    <div class="text text-base italic ps-2">{otherEntries}</div>
  </div>
</a>
