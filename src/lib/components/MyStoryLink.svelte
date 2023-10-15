<script lang="ts">
  import { stringify } from 'postcss'

  export let storySnapshot: {
    id: string
  }
</script>

<a href="/stories/{storySnapshot?.id}">StoryLink</a>
