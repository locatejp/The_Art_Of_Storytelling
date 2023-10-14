<script lang="ts">
  export let profileImg = `default_profile_img`
  export let entry: {
    storyBody: String
    timestamp: Date
  }
</script>

<div
  class="class=stack w-full bg-base-300 flex justify-start p-4 rounded-lg not-prose no-underline"
>
  <img
    src={`/${profileImg}.png`}
    alt={profileImg}
    width="32"
    height="32"
    class="w-8"
  />
  <span class="text text-base text-white">{entry?.storyBody}</span>
</div>
