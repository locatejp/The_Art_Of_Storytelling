<script lang="ts">
  export let handleSwapClick: (e: any) => void
  export let swapOnLabel = ``
  export let swapOffLabel = ``
</script>

<label class="absolute m-2 swap swap-flip text-xl">
  <input checked={true} on:click={handleSwapClick} type="checkbox" />
  <div class="swap-on">{swapOnLabel}</div>
  <div class="swap-off">{swapOffLabel}</div>
</label>
