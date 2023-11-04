<script lang="ts">
  export let totalPages: number
  export let activePage: number
  export let endpoint: string
</script>

<div class="join justify-center">
  {#each Array(totalPages) as _, i}
    <a
      href="{endpoint}?pageId={i + 1}"
      class:btn-active={i + 1 === activePage}
      class="join-item btn">{i + 1}</a
    >
  {/each}
</div>
