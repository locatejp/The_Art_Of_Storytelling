<script lang="ts">
  import MagnifyingGlass from '$lib/svgs/MagnifyingGlass.svelte'

  export let searchValue: string
  export let handleSearchChange: (e: any) => void
  export let showPrimaryBorder: boolean
</script>

<form class="relative flex mb-2">
  <div
    class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
  >
    <MagnifyingGlass />
  </div>
  <input
    name="q"
    type="search"
    bind:value={searchValue}
    placeholder="Search…"
    autocomplete="off"
    spellcheck="true"
    id="search"
    class="input input-bordered w-full p-4 pl-10 max-w-xs"
    class:input-primary={showPrimaryBorder}
    on:input={handleSearchChange}
  />
  <slot />
</form>
