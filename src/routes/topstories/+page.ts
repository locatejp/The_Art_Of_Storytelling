import {
  collection,
  getDocs,
  limit,
  query,
  orderBy,
  Timestamp,
} from 'firebase/firestore'
import { db } from '$lib/firebase'
import { error } from '@sveltejs/kit'
import type { PageLoad } from './$types'

export let load = (async () => {
  const collectionRef = collection(db, 'stories')
  const q = query(collectionRef, orderBy('likedCount', 'desc'), limit(100))
  const topStoriesSnapshot = await getDocs(q)
  const { empty } = topStoriesSnapshot

  if (empty) {
    throw error(404, 'Page does not exist')
  }

  type sentenceItem = {
    storyBody: string
    timestamp: Timestamp
    uid: string
  }

  const storiesDataArr = topStoriesSnapshot?.docs?.map((story) => {
    const storyData = story.data()
    const storyId = story?.id
    const storyFullBody = storyData.story.reduce(
      (fullBodyString: string, sentenceItem: sentenceItem) =>
        (fullBodyString += `${sentenceItem.storyBody} `),
      ``
    )
    // console.log({ storyFullBody })
    // const storyFullBody = storyData.story.reduce(
    //   (sentenceItem: sentenceItem) => sentenceItem.storyBody
    // )
    return {
      storyId,
      ...storyData,
      storyTitle: storyData.storyTitle,
      storyFullBody,
    }
  })

  return {
    storiesDataArr,
  }
}) satisfies PageLoad
