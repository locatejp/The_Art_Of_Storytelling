<script lang="ts">
  import ThemeSwitcher from './ThemeSwitcher.svelte'
  import { user, userData } from '$lib/firebase'
  import { signOutSSR } from '$lib/JS Helpers/functions'
  import Hamburger from '$lib/svgs/Hamburger.svelte'
  import CloseX from '$lib/svgs/CloseX.svelte'
  let isDrawerOpen = false

  function closeDrawer() {
    isDrawerOpen = false
  }
</script>

<div class="navbar">
  <div class="navbar-start">
    <div class="w-full navbar gap-2">
      <div class="flex-none">
        <label
          for="my-drawer-3"
          class:swap-active={isDrawerOpen}
          class="btn btn-circle swap swap-rotate"
        >
          <Hamburger />
          <CloseX />
        </label>
      </div>
    </div>
  </div>
  <div class="navbar-center">
    <a href="/" class="btn btn-ghost normal-case text-xl"
      >The Art of Storytelling</a
    >
  </div>
  <div class="navbar-end">
    <div class="flex-none gap-2 dropdown dropdown-end">
      <label for="" tabindex="-1" class="btn btn-ghost btn-circle avatar">
        <div class="w-10 rounded-full bg-base-300">
          {#if $user}
            <img
              src={$userData?.photoURL ??
                $user?.photoURL ??
                `/default_profile_img.png`}
              alt="photoURL"
            />
          {/if}
        </div>
      </label>
      <ul
        tabindex="-1"
        class="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-25"
      >
        {#if $user && $userData}
          <li>
            <a href="/profile/{$userData.username}"> Profile </a>
          </li>
          <li><button on:click={signOutSSR}>Logout</button></li>
        {:else}
          <li><a href="/login" on:click={signOutSSR}>Login</a></li>
        {/if}
      </ul>
    </div>
    <ThemeSwitcher />
  </div>
</div>
<div class="drawer">
  <input
    id="my-drawer-3"
    type="checkbox"
    bind:checked={isDrawerOpen}
    class="drawer-toggle"
  />
  <div class="drawer-content">
    <slot />
  </div>
  <div style="top: unset;" class="drawer-side">
    <label for="my-drawer-3" class="drawer-overlay" />
    <ul class="p-4 overflow-y-auto menu w-80 min-h-full bg-base-200">
      <li><a on:click={closeDrawer} href="/topstories">Top Stories</a></li>
      {#if $user}
        <li>
          <a on:click={closeDrawer} href={`/mystories/${$userData?.username}`}
            >My Stories</a
          >
        </li>
        <li>
          <a on:click={closeDrawer} href="/stories">Start A Story</a>
        </li>
      {/if}
    </ul>
  </div>
</div>
