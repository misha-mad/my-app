<script>
  import {mutation, subscribe} from 'svelte-apollo'
  import {gql} from '@apollo/client/core'

  const GetTodos = gql`
    subscription GetTodos {
      todo {
        id
        name
        isDone
      }
    }
  `

  const AddTodo = gql`
    mutation ($name: String!) {
      insert_todo(objects: {name: $name}) {
        returning {
          id
          name
          isDone
        }
      }
    }
  `

  const todoOp = subscribe(GetTodos)
  const todoAdd = mutation(AddTodo)

  let name = ''
  function addTodo() {
    todoAdd({variables: {name}})
      .then((data) => {
        console.log(data)
        name = ''
      })
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

  {#await $todoOp}
    <p>.. loading</p>
  {:then data}
    {#each data.data?.todo ?? [] as todo}
      <p class:done={todo.isDone}>{todo.name}</p>
    {/each}
  {:catch error}
    {error}
  {/await}
</div>
