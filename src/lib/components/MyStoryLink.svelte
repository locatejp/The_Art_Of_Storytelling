<script lang="ts">
  import Likes from './Likes.svelte'
  export let storySnapshot: {
    id: string
    likes: string[]
    uid: string
    storyId: string
    storyImgURL: string
    story: [
      {
        storyBody: string
      }
    ]
  }
  $: likes = storySnapshot?.likes
  $: uid = storySnapshot?.uid
  $: storyId = storySnapshot?.storyId
  $: id = storySnapshot?.id
  $: story = storySnapshot?.story
  $: storyImgURL = storySnapshot?.storyImgURL
  // const { likes, uid, storyId, id, story, storyImgURL } = storySnapshot
  $: otherEntries = story?.length > 1 ? `other entries` : `other entry`
</script>

<a class="w-full" href="/stories/{id}">
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
      {story?.[0]?.storyBody}
    </div>
    <div class="text text-base italic ps-2">
      + {`${story?.length} ${otherEntries}`}
    </div>
  </div>
</a>
