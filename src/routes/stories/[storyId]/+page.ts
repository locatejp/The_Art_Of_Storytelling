import { doc, getDoc, onSnapshot } from 'firebase/firestore'
import { db } from '$lib/firebase'
import { error } from '@sveltejs/kit'
import { writable } from 'svelte/store'
import type { PageLoad } from './$types'

export let load = (async ({ params }) => {
  const docRef = doc(db, `stories/${params.storyId}`)
  const snapshot = await getDoc(docRef)
  const exists = snapshot.exists()
  console.log({ exists })

  if (!exists) {
    throw error(404, 'Page does not exist')
  }
  // const storyData = snapshot?.data()
  // console.log({ storyData })

  const storyData = writable<any>(null)
  onSnapshot(docRef, (snapshot) => {
    storyData.set(snapshot.data())
  })
  console.log({ storyData })

  return {
    storyData,
  }
}) satisfies PageLoad
