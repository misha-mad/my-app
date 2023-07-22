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

<div style="text-align:center">
  <h2>Todoer</h2>

  <form on:submit|preventDefault={addTodo}>
    <input placeholder="new todo" bind:value={name} />
    <button type="submit">Submit</button>
  </form>

  {#if !$todos}
    <p>.. loading</p>
  {:else}
    {#each $todos?.data?.todo ?? [] as todo}
      <p class:done={todo.isDone}>{todo.name}</p>
    {/each}
  {/if}
</div>
