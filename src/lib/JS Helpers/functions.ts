import { signOut } from 'firebase/auth'
import { auth } from '$lib/firebase'
import { goto } from '$app/navigation'

export async function signOutSSR() {
  const res = await fetch('/api/signin', { method: 'DELETE' })
  await signOut(auth)
  goto('/login', {
    invalidateAll: true,
  })
}
