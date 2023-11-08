<script lang="ts">
  import type { ActionData, PageData } from './$types'
  import { validEmailRe } from '$lib/JS Helpers/re'
  import { enhance } from '$app/forms'
  let email = ``
  let submitting = false
  $: isValidEmail = validEmailRe.test(email)
  export let form: ActionData

  function submitClicked() {
    submitting = true
    return async ({ update }: { update: () => void }) => {
      update()
      email = ``
      submitting = false
    }
  }
</script>

<main class="card w-4/6 bg-base-200 mx-auto">
  <div class="card-body flex flex-col items-center text-center">
    <h1 class="card-title text-5xl font-bold p-5">Password Reset</h1>
    <h3>
      Enter your email below and we will send you a link to reset your password.
    </h3>
    <form
      class="flex-col max-w-screen-md w-3/5"
      method="POST"
      use:enhance={submitClicked}
    >
      <div class="form-control w-full max-w-md mx-auto">
        <label for="email" class="label">
          <span class="label-text text-l font-bold">Email</span>
        </label>
        <input
          bind:value={email}
          name="email"
          class="input input-bordered w-full mb-3"
          type="email"
          autocomplete="username"
        />
      </div>
      {#if submitting}
        <button disabled={true} class="btn btn-outline btn-primary m-3">
          <span class="loading loading-spinner" />
          Submit</button
        >
      {:else}
        <button
          type="submit"
          class="btn btn-outline btn-primary m-3"
          name="submitBtn"
          disabled={!isValidEmail}>Submit</button
        >
      {/if}
      {#if form?.success}
        <div class="alert alert-success">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            ><path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            /></svg
          >
          <span>Password reset sent!</span>
        </div>
      {:else if form?.errorMessage}
        <div class="alert alert-error">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            ><path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            /></svg
          >
          <span>Error! {form.errorMessage}</span>
        </div>
      {/if}
    </form>
  </div>
</main>
