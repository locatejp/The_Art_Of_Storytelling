<script lang="ts">
  import { onMount } from 'svelte'
  import { themeChange } from 'theme-change'
  import { browser } from '$app/environment'

  function handleSwitchDarkMode() {
    darkMode = !darkMode
    const theme = darkMode ? `dark` : `light`
    document.documentElement.dataset.theme = theme
    localStorage.setItem(`theme`, theme)
  }

  let darkMode = true
  if (browser) {
    localStorage.theme === 'light' && (darkMode = false)
  }

  onMount(() => {
    themeChange(false)
  })
</script>

<button class="btn btn-square btn-ghost">
  <label class="swap swap-rotate w-12 h-12">
    <input type="checkbox" checked={darkMode} on:click={handleSwitchDarkMode} />
    <img src="/moon.svg" alt="dark" class="w-8 h-8 swap-on" />
    <img src="/sun.svg" alt="light" class="w-8 h-8 swap-off" />
  </label>
</button>
