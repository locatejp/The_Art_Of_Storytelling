import { adminDB } from '$lib/admin'
import { error } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'

export let load = (async ({ params, locals }) => {
  const dbUID = locals.userId
  console.log({ dbUID })
  if (!dbUID) {
    throw error(401, 'Unauthorized request!')
  }
  const userDoc = await adminDB.collection('users').doc(dbUID!).get()
  const { username, firstName, lastName, photoURL } = userDoc.data()!
  if (username !== params.username) {
    throw error(401, `The username ${params.username} does not belong to you`)
  }

  return {
    username,
    firstName,
    lastName,
    photoURL,
  }
}) satisfies PageServerLoad
