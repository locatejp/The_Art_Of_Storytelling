<script lang="ts">
  import { ref, getDownloadURL, uploadBytes } from 'firebase/storage'
  import { user, userData, storage, db } from '$lib/firebase'
  import { updateDoc, doc } from 'firebase/firestore'
  import AuthCheck from '$lib/components/AuthCheck.svelte'

  let previewURL: string
  let uploading = false

  async function upload(e: any) {
    uploading = true
    const file = e.target.files[0]
    previewURL = URL.createObjectURL(file)
    const storageRef = ref(storage, `users/${$user!.uid}/profile.png`)
    console.log({ storageRef })
    const metadata = {
      cacheControl: 'public,max-age=300',
    }
    const result = await uploadBytes(storageRef, file, metadata)
    console.log({ result })
    console.log(result.metadata)
    console.log(result.metadata.cacheControl)
    const photoURL = await getDownloadURL(result.ref)
    console.log({ photoURL })

    await updateDoc(doc(db, 'users', $user!.uid), { photoURL })
    uploading = false
  }
</script>

<AuthCheck>
  <main class="card w-full bg-base-200 mx-auto">
    <div class="card-body items-center text-center">
      <h2 class="card-title">Upload a profile photo</h2>
      <form class="max-w-screen-md w-full">
        <div class="form-control w-full max-w-xs my-10 mx-auto text-center">
          <img
            src={$userData?.photoURL ??
              previewURL ??
              $user?.photoURL ??
              '/default_profile_img.png'}
            alt="photoURL"
            width="256"
            height="256"
            class="mx-auto"
          />
          <label for="photoURL" class="label"
            ><span class="label-text">Pick a file</span></label
          >
          <input
            type="file"
            class="file-input file-input-bordered w-full max-w-xs"
            on:change={upload}
            name="photoURL"
            accept="image/png, image/jpeg, image/gif, image/webp"
          />
          {#if uploading}
            <p>Uploading...</p>
            <progress class="progress progress-info w-56 mt-6" />
          {/if}
        </div>
        <a class="btn btn-primary" href="/stories">Finish</a>
      </form>
    </div>
  </main>
</AuthCheck>
