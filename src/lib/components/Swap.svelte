<script lang="ts">
  import BoopAction from './BoopAction.svelte'

  export let handleSwapClick: (e: any) => void
  export let swapOnLabel = ``
  export let swapOffLabel = ``
</script>

<div class="absolute left-full m-2">
  <BoopAction boopParams={{ scale: 1.1, timing: 200 }}>
    <label class="swap swap-flip text-xl">
      <input checked={true} on:click={handleSwapClick} type="checkbox" />
      <div class="swap-on">{swapOnLabel}</div>
      <div class="swap-off">{swapOffLabel}</div>
    </label>
  </BoopAction>
</div>
