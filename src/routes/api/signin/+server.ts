import { adminAuth } from '$lib/admin'
import { error, json } from '@sveltejs/kit'
import type { RequestHandler } from './$types'

export const POST: RequestHandler = async ({ request, cookies }) => {
  console.log({ request })
  const { idToken } = await request.json()
  const expiresIn = 1000 * 60 * 60 * 24 * 7 // 7 DAYS

  const decodedIdToken = await adminAuth.verifyIdToken(idToken)
  console.log({ decodedIdToken })
  if (new Date().getTime() / 1000 - decodedIdToken.auth_time < 5 * 60) {
    const cookie = await adminAuth.createSessionCookie(idToken, { expiresIn })
    console.log({ cookie })
    const options = {
      maxAge: expiresIn,
      httpOnly: true,
      secure: true,
      path: '/',
    }

    cookies.set('__session', cookie, options)

    return json({ status: 'signedIn' })
  }
  throw error(401, 'Recent sign in required!')
}
export const DELETE: RequestHandler = async ({ cookies }) => {
  cookies.delete('__session', { path: '/' })
  return json({ status: 'signedOut' })
}
