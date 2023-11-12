<script lang="ts">
  import Todo from '$lib/Todo/index.svelte'

  let examples = [{id: 0, name: 'ToDo'}]
  let currentExample: number | undefined = undefined
</script>

<div class="grid min-h-[calc(100vh-var(--header-height))] place-items-center">
  {#if currentExample === undefined}
    {#each examples as example, i}
      <button on:click={() => (currentExample = i)}>{example.name}</button>
    {/each}
  {/if}

  {#if currentExample === 0}
    <Todo />
  {/if}
</div>
