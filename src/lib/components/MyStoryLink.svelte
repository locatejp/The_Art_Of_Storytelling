<script lang="ts">
  import type { QueryDocumentSnapshot } from 'firebase/firestore'
  import Likes from './Likes.svelte'
  export let storySnapshot: QueryDocumentSnapshot
  export let uid: string | undefined

  const storyData = storySnapshot.data()
  $: likesArr = storyData?.likes
  $: storyId = storySnapshot?.id
  $: pageLink = `/stories/${storyId}`
  $: sentence = storyData?.story?.[0]?.storyBody ?? ``
  $: title = storyData?.storyTitle
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
    <div class="flex flex-col w-full">
      <div
        class="w-full text text-left text-primary-focus text-2xl font-mono font-extrabold tracking-wider"
      >
        {title}
      </div>
      <div class="flex">
        <div class="text text-left text-base flex items-center">
          {sentence}
        </div>
        <div class="text text-base italic ps-2">{otherEntries}</div>
      </div>
    </div>
  </a>
</div>
