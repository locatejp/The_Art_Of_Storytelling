<script lang="ts">
</script>

<div class="hero h-[calc(100vh-64px)] bg-base-100">
  <div class="hero-content text-center">
    <div class="max-w-md">
      <h1 class="text-5xl font-bold p-5">It's Storytelling Time</h1>
      <img
        src="/storytellerPainting.png"
        alt="storyteller"
        class="max-w-sm mx-auto rounded-lg shadow-2xl"
        height="300"
        width="300"
      />
      <p class="py-6">
        Crafting the tallest tales<br />
        One sentence at a time
      </p>
      {#if false}
        <a class="btn btn-primary" href="/edit">Edit Profile</a>
      {:else}
        <div
          class="join join-vertical space-y-4 lg:space-y-0 lg:join-horizontal lg:space-x-4"
        >
          <a class="btn btn-primary" href="/signup">Become a StoryTeller</a>
          <a class="btn btn-primary m-3" href="/">Read Top Stories</a>
        </div>
      {/if}
    </div>
  </div>
</div>
