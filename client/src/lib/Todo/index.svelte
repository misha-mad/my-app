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

<div class="grid grid-rows-[auto_auto_1fr] gap-y-3 text-center w-4/6 lg:w-2/6 h-96 content-start">
  <h2 class="text-2xl font-bold">Todoer</h2>

  <form class="grid gap-y-3" on:submit|preventDefault={addTodo}>
    <input class="text-black p-1" placeholder="new todo" bind:value={name} />
    <button class="border rounded-md" type="submit">Add</button>
  </form>

  <div class="grid rounded-md border min-h-full">
    {#if !$todos}
      <p class="place-self-center">...loading</p>
    {:else}
      <div class="place-items-start overflow-y-scroll p-2">
        {#each $todos?.data?.todos ?? [] as todo, i}
          <div class="grid grid-flow-col justify-start gap-x-2">
            <span>{($todos?.data?.todos.length ?? 0) - i}.</span>
            <p class="text-ellipsis overflow-hidden" class:done={todo.isDone}>{todo.name}</p>
          </div>
        {/each}
      </div>
    {/if}
  </div>
</div>
