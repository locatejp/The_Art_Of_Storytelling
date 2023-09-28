<script lang="ts">
  import SignInWithGoogle from '$lib/components/SignInWithGoogle.svelte'
  import SignUpWithPassword from '$lib/components/SignUpWithPassword.svelte'
  import Divider from '$lib/components/Divider.svelte'
  import CreateAccount from '$lib/components/CreateAccount.svelte'
</script>

<div class="flex flex-col">
  <SignUpWithPassword />
  <Divider />
  <SignInWithGoogle />
</div>
