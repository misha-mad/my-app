<script lang="ts">
  import {page, navigating} from '$app/stores'
  import styles from './header.module.css'
</script>

<header class="sticky top-0 z-30 backdrop-blur-sm h-[var(--header-height)]">
  <div
    class="grid h-full grid-flow-col grid-cols-[auto/1fr/auto] items-center z-10 row-span-full col-start-2 px-6 py-4 gap-x-4"
  >
    <a href="/">
      <span data-text="MISHA-DEV" class={`h-full ${styles.glitch}`}>MISHA-DEV</span>
    </a>

    <div class="grid grid-flow-col justify-end gap-x-4">
      <a
        data-text="about"
        class={`i-heroicons-bars-3-20-solid ${styles.glitch}`}
        href="/about"
        aria-current={$page.url.pathname === '/about'}
      >
        about
      </a>

      <a
        data-text="experiments"
        class={`i-heroicons-bars-3-20-solid ${styles.glitch}`}
        href="/experiments"
        aria-current={$page.url.pathname === '/experiments'}
      >
        experiments
      </a>
    </div>
  </div>

  {#if $navigating}
    <p>...navigating to {$navigating.to?.url.pathname}</p>
  {/if}
</header>
