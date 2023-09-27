<script lang="ts">
  import { browser } from '$app/environment'

  function handleSwitchDarkMode() {
    darkMode = !darkMode
    const theme = setTheme(darkMode)
    localStorage.setItem(`theme`, theme)
  }

  let darkMode: boolean = true
  if (browser) {
    localStorage.theme === 'light' && (darkMode = false)
    setTheme(darkMode)
  }

  function setTheme(darkMode: boolean) {
    const theme = darkMode ? `dark` : `light`
    document.documentElement.dataset.theme = theme
    return theme
  }
</script>

<button class="btn btn-square btn-ghost">
  <label class="swap swap-rotate w-12 h-12">
    <input type="checkbox" checked={darkMode} on:click={handleSwitchDarkMode} />
    <img src="/moon.svg" alt="dark" class="w-8 h-8 swap-on" />
    <img src="/sun.svg" alt="light" class="w-8 h-8 swap-off" />
  </label>
</button>
