<script lang="ts">
  export let searchValue: string
  export let handleSearchChange: (e: any) => void
  export let showPrimaryBorder: boolean
</script>

<form class="relative flex mb-2">
  <div
    class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
  >
    <svg
      class="w-4 h-4 text-gray-500 dark:text-gray-400"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 20 20"
    >
      <path
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
      />
    </svg>
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
