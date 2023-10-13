import type { PageServerLoad, Actions } from './$types'
import { adminDB } from '$lib/admin'
import { storage, user } from '$lib/firebase'
import { ref, getDownloadURL, uploadBytes } from 'firebase/storage'

import { redirect, error, fail } from '@sveltejs/kit'
import { getDoc } from 'firebase/firestore'

export const load = (async ({ locals, params }) => {
  const uid = locals.userId
  if (!uid) {
    throw error(401, 'Unauthorized request!')
  }
  // const userDoc = await adminDB.collection('users').doc(uid!).get()
  // const { username, bio } = userDoc.data()!
  // if (username !== params.username) {
  //   throw error(401, `The username ${params.username} does not belong to you`)
  // }
  return {}
}) satisfies PageServerLoad

export const actions = {
  default: async ({ locals, request, params }) => {
    const timestamp = new Date()
    const uid = locals.userId!
    const data = await request.formData()
    const storyImg = data.get('storyImg')
    const storyTitle = data.get('storyTitle')
    const storyBody = data.get('storyBody')
    console.log({ storyImg, storyTitle, storyBody })

    const userRef = adminDB.collection('users').doc(uid!)
    const { username } = (await userRef.get()).data()!
    console.log({ username })

    const storiesRef = adminDB.collection('stories')
    const docRef = await storiesRef.add({
      username,
      uid: locals.userId,
      storyTitle,
      timestamp,
      story: [
        {
          timestamp,
          storyBody,
        },
      ],
    })
    const { id } = docRef
    console.log({ id })
    const storyImgURL = uploadStoryImg(storyImg, id, uid)
    const updated = await docRef.update({ storyImgURL })
    console.log({ updated })

    // if (username !== params.username) {
    //   throw error(401, `That username does not belong to you`)
    // }

    // if (bio!.length >= 260) {
    //   return fail(400, {
    //     problem: `Bio must be less than 260 characters`,
    //   })
    // }

    // await userRef.update({ bio })
  },
} satisfies Actions

async function uploadStoryImg(file: any, docId: string, uid: string) {
  console.log({ file })
  const bytes = new Uint8Array(await file.arrayBuffer())
  const storageRef = ref(storage, `stories/${uid}/${docId}.png`)
  console.log({ storageRef })
  const result = await uploadBytes(storageRef, bytes)
  // const result = await uploadBytes(storageRef, file)
  console.log({ result })
  const photoURL = await getDownloadURL(result.ref)
  console.log({ photoURL })
}
