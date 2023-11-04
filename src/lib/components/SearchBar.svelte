<script lang="ts">
  export let searchValue: string
  export let handleSearchChange: (e: any) => void
  export let showPrimaryBorder: boolean
</script>

<input
  name="search"
  type="search"
  bind:value={searchValue}
  placeholder="Search…"
  autocomplete="off"
  spellcheck="true"
  id="search"
  class="input input-bordered w-full max-w-xs"
  class:input-primary={showPrimaryBorder}
  on:input={handleSearchChange}
/>
