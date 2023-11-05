<script lang="ts">
  export let handleSwapClick: (e: any) => void
  export let swapOnLabel = ``
  export let swapOffLabel = ``
</script>

<label class="swap swap-flip text-2xl">
  <input on:click={handleSwapClick} type="checkbox" />
  <div class="swap-on">{swapOnLabel}</div>
  <div class="swap-off">{swapOffLabel}</div>
</label>
