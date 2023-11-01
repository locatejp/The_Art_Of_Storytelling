import {
  collection,
  getDocs,
  getDoc,
  limit,
  query,
  where,
  orderBy,
  or,
  doc,
} from 'firebase/firestore'
import { db } from '$lib/firebase'
import { error } from '@sveltejs/kit'
import { writable } from 'svelte/store'
import type { PageLoad } from './$types'

export let load = (async ({ params }) => {
  const { username } = params
  const usernameRef = doc(db, `usernames/${username}`)
  const usernameDoc = await getDoc(usernameRef).then((doc) => doc.data())
  console.log({ usernameDoc })
  const uid = usernameDoc?.uid
  const collectionRef = collection(db, 'stories')

  if (!uid || !username) {
    throw error(404, 'Page does not exist')
  }

  const q = query(
    collectionRef,
    or(
      where('username', '==', username),
      where('likes', 'array-contains', uid)
    ),
    orderBy('likedCount', 'desc'),
    limit(10)
  )
  const snapshot = await getDocs(q)
  console.log({ snapshot })
  const { empty } = snapshot
  console.log({ empty })
  if (empty) {
    throw error(404, 'Page does not exist')
  }
  const userStoriesQueryDocs = snapshot?.docs

  return {
    pageUsername: username,
    userStoriesQueryDocs,
  }
}) satisfies PageLoad
