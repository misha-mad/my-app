<script lang="ts">
  import logo from './assets/logo.svg'
  let com = 5
</script>

<header class="sticky top-0 z-30 backdrop-blur-sm h-[var(--header-height)]">
  <div
    class="2lg:gap-x-30 2lg:px-20 theme('grid-cols-auto/1fr/auto') bg-color-verycool relative z-10 grid row-span-full col-start-2 items-center px-6 py-4"
  >
    <a href="/">
      <img alt="misha_dev" class="h-6 text-white lg:h-10 {com === 0 ? 'mr-1' : 'mr-2'}" src={logo} />
    </a>

    <div>MishaDev</div>

    <button class="i-heroicons-bars-3-20-solid h-6 w-6" />
  </div>
</header>
