<script lang="ts">
  import { db } from '$lib/firebase'
  import { doc, getDoc } from 'firebase/firestore'
  export let profileImg = `/default_profile_img.png`
  export let entry: {
    storyBody: string
    timestamp: Date
    uid: string
  }

  async function getProfileImg(uid: string) {
    const snapshot = await getDoc(doc(db, `users/${uid}`))
    const exists = snapshot.exists()
    if (!exists) {
      return
    }
    const data = snapshot?.data() || {}
    const { photoURL } = data
    if (photoURL) {
      profileImg = photoURL
    }
  }
  getProfileImg(entry?.uid)
</script>

<div
  class="w-full bg-base-300 flex justify-start p-2 rounded-lg not-prose no-underline my-1"
>
  <img src={profileImg} alt={profileImg} class="rounded-full h-10 w-10 m-2" />
  <span class="text text-base flex items-center">{entry?.storyBody}</span>
</div>
