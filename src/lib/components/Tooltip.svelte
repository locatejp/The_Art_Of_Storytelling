<script lang="ts">
  export let showTooltip = false
  export let tooltipText = ``
</script>

{#if showTooltip}
  <div class="tooltip w-full" data-tip={tooltipText}>
    <slot />
  </div>
{:else}
  <slot />
{/if}
