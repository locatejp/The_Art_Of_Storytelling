import { writable, type Stores } from 'svelte/store'
import { onSnapshot, doc } from 'firebase/firestore'
import { db } from '$lib/firebase'

export function createSnapshotStore(docId: string) {
  const docRef = doc(db, `stories/${docId}`)
  onSnapshot(docRef, (snapshot) => {
    const docSnapshot = snapshot.data()
  })
  const { subscribe, set, update } = writable({})
}

export function createSearchStore(data: any) {
  const { subscribe, set, update } = writable({
    data,
    filtered: data,
    search: ``,
  })
  return { subscribe, set, update }
}
export function createPageStore(
  data: any,
  page: number = 1,
  itemsPerPage: number = 10
) {
  const { subscribe, set, update } = writable({
    data,
    page,
    itemsPerPage,
    filtered: data,
  })
  return { subscribe, set, update }
}

export function pageFilterHandler(store: any) {
  console.log({ store })
  const { data, page, itemsPerPage } = store
  const start = (page - 1) * itemsPerPage
  const end = start + itemsPerPage
  const filteredStoryIds = data.slice(start, end)
  store.filtered = []
  filteredStoryIds.forEach((id: string) => {
    const docRef = doc(db, `stories/${id}`)
    const unsubscribe = onSnapshot(docRef, (snapshot) => {
      store.filtered.push({
        id,
        snapshot,
        unsubscribe,
      })
    })
  })
  console.log({ data, page, itemsPerPage, start, end })
  console.log(store.filtered)
}
