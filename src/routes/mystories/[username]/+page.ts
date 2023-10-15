import {
  collection,
  getDocs,
  limit,
  query,
  where,
  orderBy,
} from 'firebase/firestore'
import { db } from '$lib/firebase'
import { error } from '@sveltejs/kit'
import { writable } from 'svelte/store'
import type { PageLoad } from './$types'

export let load = (async ({ params }) => {
  console.log(`Preloading data`)
  const collectionRef = collection(db, 'stories')
  const q = query(
    collectionRef,
    where('username', '==', params.username),
    orderBy('likedCount', 'desc'),
    limit(10)
  )
  const snapshot = await getDocs(q)
  console.log({ snapshot })
  const { empty, docs } = snapshot
  console.log({ empty })
  const length = docs?.length
  console.log({ length })
  const data = docs[0]?.id
  console.log({ data })

  const myStoriesQSnapshot = writable<any>(null)
  myStoriesQSnapshot.set(
    docs.map((doc) => {
      return {
        id: doc?.id,
        ...doc?.data(),
      }
    })
  )
  console.log({ myStoriesQSnapshot })

  if (empty) {
    throw error(404, 'Page does not exist')
  }

  return {
    myStoriesQSnapshot,
    // username: data.username,
    // photoURL: data.photoURL,
    // bio: data.bio,
    // links: data.links || [],
  }
}) satisfies PageLoad
