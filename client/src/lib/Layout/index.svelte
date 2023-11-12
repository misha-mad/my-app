<script lang="ts">
  import './styles.css'
  import Header from './Header/index.svelte'
</script>

<div class="relative h-full [--header-height:_theme(spacing.20)] lg:[--header-height:_theme(spacing.28)]">
  <Header />
  <slot />
</div>
