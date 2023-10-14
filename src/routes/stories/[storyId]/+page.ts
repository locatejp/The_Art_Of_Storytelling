import { doc, getDoc } from 'firebase/firestore'
import { db } from '$lib/firebase'
import { error } from '@sveltejs/kit'
import type { PageLoad } from './$types'

export let load = (async ({ params }) => {
  const snapshot = await getDoc(doc(db, `stories/${params.storyId}`))
  const exists = snapshot.exists
  const data = snapshot?.data()
  console.log({ data })

  if (!exists) {
    throw error(404, 'Page does not exist')
  }

  return {
    ...data,
  }
}) satisfies PageLoad
