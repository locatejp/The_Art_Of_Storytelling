<script lang="ts">
  import { page } from '$app/stores'
  import AnimatedRoute from '$lib/components/AnimatedRoute.svelte'
</script>

<nav class="flex justify-center my-6">
  <ul class="steps">
    <a href="/signup" class="step step-primary">Create Account</a>
    <a
      href="/signup/username"
      class="step"
      class:step-primary={$page.route.id?.match(/username|photo/g)}
    >
      Choose Username
    </a>
    <a
      href="/signup/photo"
      class="step"
      class:step-primary={$page.route.id?.includes('photo')}
    >
      Upload Photo
    </a>
  </ul>
</nav>

<AnimatedRoute>
  <main class="card w-4/6 bg-base-200 mx-auto">
    <div class="card-body items-center text-center">
      <slot />
    </div>
  </main>
</AnimatedRoute>
