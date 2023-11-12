<script lang="ts">
  import {TodosSubscription, AddTodo} from '$lib/graphql/generated'
  $: todos = TodosSubscription({})
  let name = ''

  function addTodo() {
    AddTodo({variables: {name}})
      .then(() => (name = ''))
      .catch((error) => {
        console.error(error)
      })
  }
</script>

<div class="text-center max-w-xs">
  <h2 class="text-2xl font-bold mb-5">Todoer</h2>

  <form class="grid gap-y-3 mb-3" on:submit|preventDefault={addTodo}>
    <input class="text-black p-1" placeholder="new todo" bind:value={name} />
    <button class="border rounded-md" type="submit">Submit</button>
  </form>

  <div class="max-h-60 overflow-y-scroll">
    {#if !$todos}
      <p>...loading</p>
    {:else}
      {#each $todos?.data?.todos ?? [] as todo, i}
        <div class="grid grid-flow-col justify-start gap-x-2n">
          <span>{($todos?.data?.todos.length ?? 0) - i}.</span>
          <p class="text-ellipsis overflow-hidden" class:done={todo.isDone}>{todo.name}</p>
        </div>
      {/each}
    {/if}
  </div>
</div>
