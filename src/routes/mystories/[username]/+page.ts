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
import type { PageLoad } from './$types'

export let load = (async ({ params }) => {
  const { username } = params
  const usernameRef = doc(db, `usernames/${username}`)
  const usernameDoc = await getDoc(usernameRef).then((doc) => doc.data())
  const uid = usernameDoc?.uid
  const collectionRef = collection(db, 'stories')
  const q = query(
    collectionRef,
    or(
      where('username', '==', username),
      where('likes', 'array-contains', uid)
    ),
    orderBy('likedCount', 'desc'),
    limit(100)
  )
  const myStoriesQueryDocs = await getDocs(q)
  const { empty } = myStoriesQueryDocs

  if (empty) {
    throw error(404, 'Page does not exist')
  }

  const storiesDataArr = myStoriesQueryDocs?.docs?.map((story) => {
    const storyData = story.data()
    const storyId = story?.id
    return {
      storyId,
      ...storyData,
      storyTitle: storyData.storyTitle,
    }
  })

  return {
    storiesDataArr,
  }
}) satisfies PageLoad
