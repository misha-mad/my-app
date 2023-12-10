<script lang="ts">
  import './styles.css'
  import Header from './Header/index.svelte'
</script>

<div
  class="relative min-h-[100vh] [--header-height:_theme(spacing.20)] lg:[--header-height:_theme(spacing.28)] font-logo font-bold"
>
  <Header />
  <slot />
</div>
