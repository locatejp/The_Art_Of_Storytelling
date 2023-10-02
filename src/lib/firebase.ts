// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore, doc, onSnapshot } from 'firebase/firestore'
import { getAuth, onAuthStateChanged, type User } from 'firebase/auth'
import { getStorage } from 'firebase/storage'
import { getAnalytics } from 'firebase/analytics'
import { writable } from 'svelte/store'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBeTMJGTT3nA6P3Dt8EFoMkGoh863CSE28',
  authDomain: 'art-of-storytelling.firebaseapp.com',
  projectId: 'art-of-storytelling',
  storageBucket: 'art-of-storytelling.appspot.com',
  messagingSenderId: '218244674972',
  appId: '1:218244674972:web:296e0053171a53871f8459',
  measurementId: 'G-J3XBREZRNY',
  //   allowMultipleEmails: true,
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
export const db = getFirestore()
export const auth = getAuth()
export const storage = getStorage()
// export const analytics = getAnalytics(app)

// export const user = writable<User | null>(null)

// onAuthStateChanged(auth, (currentUser) => {
//   user.set(currentUser)
// })

/**
 * @returns a store with the current firebase user
 */
function userStore() {
  let unsubscribe: () => void

  if (!auth || !globalThis.window) {
    console.warn('Auth is not initialized or not in browser')
    const { subscribe } = writable<User | null>(null)
    return {
      subscribe,
    }
  }

  const { subscribe } = writable(auth?.currentUser ?? null, (set) => {
    unsubscribe = onAuthStateChanged(auth, (user) => {
      set(user)
    })

    return () => unsubscribe()
  })

  return {
    subscribe,
  }
}

export const user = userStore()
export const userData = writable<any>(null)

user.subscribe((user) => {
  if (user) {
    const docRef = doc(db, `users/${user.uid}`)
    onSnapshot(docRef, (snapshot) => {
      userData.set(snapshot.data())
    })
  }
})
