import { adminAuth } from '$lib/admin'
import { getLoginRedirectUrl } from '$lib/JS Helpers/functions'
import { redirect, type Handle } from '@sveltejs/kit'

export const handle = (async ({ event, resolve }) => {
  const { cookies, url } = event
  const sessionCookie = cookies.get('__session')
  try {
    const decodedClaims = await adminAuth.verifySessionCookie(sessionCookie!)
    event.locals.userId = decodedClaims.uid
  } catch (error) {
    event.locals.userId = null

    if (url.pathname.startsWith(`/mystories`)) {
      const loginRedirectUrl = getLoginRedirectUrl(url)
      throw redirect(302, loginRedirectUrl)
    }

    return resolve(event)
  }
  return resolve(event)
}) satisfies Handle
