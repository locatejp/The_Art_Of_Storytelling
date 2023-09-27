<script>
  import ThemeSwitcher from './ThemeSwitcher.svelte'

  function drawer() {
    // NEEDED
  }
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
        class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
      >
        <li><a href="/">Top Stories</a></li>
        <li><a href="/">My Stories</a></li>
        <li><a href="/">Start A Story</a></li>
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
    <button class="btn btn-ghost btn-circle">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        ><path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        /></svg
      >
    </button>
    <ThemeSwitcher />
  </div>
</div>

<!-- <nav class="flex fixed w-full items-center justify-between px-6 h-16 z-10">
  <div class="flex items-center">
    <button class="mr-2" aria-label="Open Menu" on:click={drawer}>
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
    <img src="/favicon.png" alt="Logo" class="h-auto w-20" />
  </div>
  <div class="flex items-center">
    <div class="hidden md:block md:flex md:justify-between md:bg-transparent">
      <button
        title="Wishlist"
        class="flex items-center p-3 font-medium mr-2 text-center bg-gray-300 rounded hover:bg-gray-400 focus:outline-none focus:bg-gray-400"
      >
        <svg
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          stroke="currentColor"
          viewBox="0 0 24 24"
          class="w-6 h-6 mr-2"
        >
          <path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
        </svg>
        <span>Wishlist</span>
      </button>
      <button
        class="flex items-center p-3 font-medium mr-2 text-center bg-gray-300 rounded hover:bg-gray-400 focus:outline-none focus:bg-gray-400"
      >
        <svg
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
          class="h-6 w-6"
        >
          <path
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
          />
        </svg>
      </button>
      <button
        class="flex items-cente p-3 font-medium mr-2 text-center bg-gray-300 rounded hover:bg-gray-400 focus:outline-none focus:bg-gray-400"
      >
        <svg
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </button>
      <ThemeSwitcher />
    </div>
  </div>
</nav> -->
