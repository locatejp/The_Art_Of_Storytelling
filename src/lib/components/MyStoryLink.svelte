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
  const { likes, uid, storyId, id, story, storyImgURL } = storySnapshot
  const otherEntries = story?.length > 1 ? `other entries` : `other entry`
</script>

<a class="w-full" href="/stories/{id}">
  <div
    class="w-full bg-base-300 flex justify-start p-2 rounded-lg not-prose no-underline my-1"
  >
    <img src={storyImgURL} alt="storyImage" class="rounded-lg h-10 w-10 m-2" />
    <Likes {likes} {uid} {storyId} />
    <span class="text text-left text-base flex items-center"
      >{story?.[0]?.storyBody}</span
    >
    <span class="text text-base italic flex items-center ps-2">
      + {`${story?.length} ${otherEntries}`}
    </span>
  </div>
</a>
