import { collection, getDocs, limit, query, orderBy } from 'firebase/firestore'
import { db } from '$lib/firebase'
import { error } from '@sveltejs/kit'
import type { PageLoad } from './$types'

export let load = (async () => {
  console.log(`Preloading data`)
  const collectionRef = collection(db, 'stories')
  const q = query(collectionRef, orderBy('likedCount', 'desc'), limit(10))
  const snapshot = await getDocs(q)
  console.log({ snapshot })
  const { empty } = snapshot
  console.log({ empty })

  const topStoriesQueryDocs = snapshot?.docs

  if (empty) {
    throw error(404, 'Page does not exist')
  }

  return {
    topStoriesQueryDocs,
  }
}) satisfies PageLoad
