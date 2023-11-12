<script lang="ts">
  import {page, navigating} from '$app/stores'
  import logo from './assets/logo.svg'
</script>

<header class="sticky top-0 z-30 backdrop-blur-sm h-[var(--header-height)]">
  <div
    class="grid grid-flow-col grid-cols-[auto/1fr/auto] z-10 row-span-full col-start-2 items-center px-6 py-4 gap-x-4"
  >
    <a href="/">
      <img alt="misha_dev" class="h-6 text-white lg:h-10" src={logo} />
    </a>

    <div class="grid grid-flow-col justify-end gap-x-4">
      <a class="i-heroicons-bars-3-20-solid" href="/about" aria-current={$page.url.pathname === '/about'}> about </a>

      <a class="i-heroicons-bars-3-20-solid" href="/experiments" aria-current={$page.url.pathname === '/experiments'}>
        experiments
      </a>
    </div>
  </div>

  {#if $navigating}
    <p>...navigating to {$navigating.to?.url.pathname}</p>
  {/if}
</header>
