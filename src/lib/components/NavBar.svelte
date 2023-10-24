<script lang="ts">
  import ThemeSwitcher from './ThemeSwitcher.svelte'
  import { user, userData } from '$lib/firebase'
  import { signOutSSR } from '$lib/JS Helpers/functions'
</script>

<div class="navbar bg-base-100">
  <div class="navbar-start">
    <div class="dropdown">
      <button class="btn btn-ghost btn-circle">
        <svg
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          viewBox="0 0 24 24"
          class="w-8 h-8"
        >
          <path d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
      <ul
        class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-32"
      >
        <li><a href="/topstories">Top Stories</a></li>
        {#if $user}
          <li><a href={`/mystories/${$userData?.username}`}>My Stories</a></li>
          <li><a href="/stories">Start A Story</a></li>
        {/if}
      </ul>
    </div>
    <a href="/">
      <img class="h-10 w-10" src="/favicon.png" alt="logo" />
    </a>
  </div>
  <div class="navbar-center">
    <a href="/" class="btn btn-ghost normal-case text-xl"
      >The Art of Storytelling</a
    >
  </div>
  <div class="navbar-end">
    <div class="flex-none gap-2">
      <div class="dropdown dropdown-end">
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
          {#if $userData}
            <li>
              <a href="/profile/{$userData.username}"> Profile </a>
            </li>
            <li><a>Settings</a></li>
            <li><button on:click={signOutSSR}>Logout</button></li>
          {:else}
            <li><a href="/login" on:click={signOutSSR}>Login</a></li>
          {/if}
        </ul>
      </div>
    </div>
    <ThemeSwitcher />
  </div>
</div>
