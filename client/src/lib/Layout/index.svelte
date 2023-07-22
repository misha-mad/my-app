<script lang="ts">
  import Header from './Header/index.svelte'
</script>

<div class="relative min-h-100vh bg-black text-white">
  <Header />

  <div class="mt-18 lg:mt-26">
    <slot />
  </div>
</div>
