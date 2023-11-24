import { getAuth, sendPasswordResetEmail } from 'firebase/auth'

export const actions = {
  default: async ({ request }) => {
    const formData = await request.formData()
    const email = formData.get(`email`)?.toString()!
    console.log({ email })

    let success = false
    let errorMessage: string | undefined
    const auth = getAuth()
    try {
      await sendPasswordResetEmail(auth, email).then(() => {
        success = true
      })
    } catch (e) {
      console.log({ e })
      errorMessage = `The was a problem resetting your password. Please try again.`
    }
    return { success, errorMessage }
  },
}
