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
  Timestamp,
} from 'firebase/firestore'
import { db } from '$lib/firebase'
import { adminDB } from '$lib/admin'
import { error } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'

export let load = (async ({ params, locals }) => {
  const dbUID = locals.userId
  if (!dbUID) {
    throw error(401, 'Unauthorized request!')
  }
  const userDoc = await adminDB.collection('users').doc(dbUID!).get()
  const { username, bio } = userDoc.data()!
  if (username !== params.username) {
    throw error(401, `The username ${params.username} does not belong to you`)
  }

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
    return {}
  }

  type sentenceItem = {
    storyBody: string
    timestamp: Timestamp
    uid: string
  }

  const storiesDataArr = myStoriesQueryDocs?.docs?.map((story) => {
    const storyData = story.data()
    const storyId = story?.id
    const storyFullBody = storyData.story.reduce(
      (fullBodyString: string, sentenceItem: sentenceItem) =>
        (fullBodyString += `${sentenceItem.storyBody} `),
      ``
    )
    return {
      storyId,
      storyTitle: storyData.storyTitle,
      storyFullBody,
    }
  })

  return {
    storiesDataArr,
  }
}) satisfies PageServerLoad
