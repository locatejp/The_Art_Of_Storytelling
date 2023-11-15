<script lang="ts">
  import type { ActionData, PageData } from './$types'
  import { validEmailRe } from '$lib/JS Helpers/re'
  import { enhance } from '$app/forms'
  import CircleWithCheck from '$lib/svgs/CircleWithCheck.svelte'
  import CircleWithX from '$lib/svgs/CircleWithX.svelte'
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
          <CircleWithCheck />
          <span
            >Password reset sent<br /> (only if account exists with that email)</span
          >
        </div>
      {:else if form?.errorMessage}
        <div class="alert alert-error">
          <CircleWithX />
          <span>Error! {form.errorMessage}</span>
        </div>
      {/if}
    </form>
  </div>
</main>
