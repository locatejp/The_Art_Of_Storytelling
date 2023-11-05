import { collection, getDocs, limit, query, orderBy } from 'firebase/firestore'
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

  const storiesDataArr = topStoriesSnapshot?.docs?.map((story) => {
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
